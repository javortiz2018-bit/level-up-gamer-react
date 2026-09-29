import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // 1. Cargar usuarios guardados
  const [usuariosBD, setUsuariosBD] = useState(() => {
    try {
      const guardados = localStorage.getItem("usuarios");
      return guardados ? JSON.parse(guardados) : [];
    } catch (error) {
      console.error("Error al leer 'usuarios' de localStorage:", error);
      return [];
    }
  });

  // 2. Cargar la sesión actual
  const [usuario, setUsuario] = useState(() => {
    try {
      const sesion = localStorage.getItem("usuarioSesion");
      return sesion ? JSON.parse(sesion) : null;
    } catch (error) {
      console.error("Error al leer 'usuarioSesion' de localStorage:", error);
      return null;
    }
  });

  // Estado para controlar modal si decides usarlo en el futuro
  const [mostrarModalSalir, setMostrarModalSalir] = useState(false);

  // Sincronizar Base de Datos local
  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuariosBD));
  }, [usuariosBD]);

  // Sincronizar Sesión activa con localStorage
  useEffect(() => {
    if (usuario) {
      localStorage.setItem("usuarioSesion", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("usuarioSesion");
    }
  }, [usuario]);

  // Registrar usuario
  const registrarUsuario = ({ nombre, email, edad, password }) => {
    const emailLimpio = email.trim().toLowerCase();

    const existe = usuariosBD.some(
      (u) => u.email.toLowerCase() === emailLimpio
    );

    if (existe) {
      return { ok: false, msj: "El correo electrónico ya está registrado." };
    }

    const esDuoc = emailLimpio.endsWith("@duocuc.cl") || emailLimpio.endsWith("@profesor.duoc.cl");

    const nuevoUsuario = {
      nombre: nombre.trim(),
      email: emailLimpio,
      edad: Number(edad),
      password,
      puntos: 0,
      esDuoc,
    };

    setUsuariosBD((prev) => [...prev, nuevoUsuario]);
    return { ok: true, msj: "¡Cuenta creada con éxito!" };
  };

  // Iniciar sesión
  const iniciarSesion = (email, password) => {
    const emailLimpio = email.trim().toLowerCase();

    const usuarioValido = usuariosBD.find(
      (u) => u.email.toLowerCase() === emailLimpio && u.password === password
    );

    if (usuarioValido) {
      setUsuario(usuarioValido);
      return { ok: true, msj: `¡Bienvenido ${usuarioValido.nombre}!` };
    } else {
      return { ok: false, msj: "Correo o contraseña incorrectos." };
    }
  };

  // CERRAR SESIÓN DIRECTO (Limpia el estado y elimina de localStorage)
  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem("usuarioSesion");
    setMostrarModalSalir(false);
  };

  // Modal (Opcional, por si prefieres pedir confirmación)
  const solicitarCerrarSesion = () => setMostrarModalSalir(true);
  const cancelarCerrarSesion = () => setMostrarModalSalir(false);

  // Sumar puntos y actualizar sincronizadamente
  const agregarPuntos = (cantidadPuntos) => {
    if (!usuario) return;

    setUsuario((prevUsuario) => {
      if (!prevUsuario) return null;
      
      const nuevosPuntos = (prevUsuario.puntos || 0) + cantidadPuntos;
      const usuarioActualizado = { ...prevUsuario, puntos: nuevosPuntos };

      setUsuariosBD((prevBD) =>
        prevBD.map((u) =>
          u.email.toLowerCase() === usuarioActualizado.email.toLowerCase()
            ? usuarioActualizado
            : u
        )
      );

      return usuarioActualizado;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        usuariosBD,
        registrarUsuario,
        iniciarSesion,
        cerrarSesion, // Ahora cierra sesión directamente
        solicitarCerrarSesion,
        confirmarCerrarSesion: cerrarSesion,
        cancelarCerrarSesion,
        mostrarModalSalir,
        agregarPuntos,
        sumarPuntos: agregarPuntos,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }
  return context;
};