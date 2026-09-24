import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Cargar usuarios guardados o inicializar con uno por defecto si está vacío
  const [usuariosBD, setUsuariosBD] = useState(() => {
    const guardados = localStorage.getItem("usuarios");
    return guardados ? JSON.parse(guardados) : [];
  });

  // Cargar la sesión actual
  const [usuario, setUsuario] = useState(() => {
    const sesion = localStorage.getItem("usuarioSesion");
    return sesion ? JSON.parse(sesion) : null;
  });

  // Estado para controlar el modal de confirmación de salida
  const [mostrarModalSalir, setMostrarModalSalir] = useState(false);

  // Sincronizar Base de Datos local
  useEffect(() => {
    localStorage.setItem("usuarios", JSON.stringify(usuariosBD));
  }, [usuariosBD]);

  // Sincronizar Sesión activa
  useEffect(() => {
    if (usuario) {
      localStorage.setItem("usuarioSesion", JSON.stringify(usuario));
    } else {
      localStorage.removeItem("usuarioSesion");
    }
  }, [usuario]);

  // Registrar usuario
  const registrarUsuario = ({ nombre, email, edad, password }) => {
    const existe = usuariosBD.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (existe) {
      return { ok: false, msj: "El correo electrónico ya está registrado." };
    }

    const esDuoc = email.toLowerCase().endsWith("@duocuc.cl");

    const nuevoUsuario = {
      nombre,
      email,
      edad: Number(edad),
      password,
      puntos: 0,
      esDuoc, // Permite identificar si aplica 20% OFF
    };

    setUsuariosBD((prev) => [...prev, nuevoUsuario]);
    return { ok: true, msj: "¡Cuenta creada con éxito!" };
  };

  // Iniciar sesión
  const iniciarSesion = (email, password) => {
    const usuarioValido = usuariosBD.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (usuarioValido) {
      setUsuario(usuarioValido);
      return { ok: true, msj: `¡Bienvenido ${usuarioValido.nombre}!` };
    } else {
      return { ok: false, msj: "Correo o contraseña incorrectos." };
    }
  };

  // Solicitar cierre de sesión (Abre Modal)
  const solicitarCerrarSesion = () => {
    setMostrarModalSalir(true);
  };

  // Confirmar salida
  const confirmarCerrarSesion = () => {
    setUsuario(null);
    setMostrarModalSalir(false);
  };

  // Cancelar salida
  const cancelarCerrarSesion = () => {
    setMostrarModalSalir(false);
  };

  // Sumar puntos y actualizar sincronizadamente la BD
  const agregarPuntos = (cantidadPuntos) => {
    if (!usuario) return;

    const nuevosPuntos = (usuario.puntos || 0) + cantidadPuntos;
    const usuarioActualizado = { ...usuario, puntos: nuevosPuntos };

    // Actualizar sesión actual
    setUsuario(usuarioActualizado);

    // Actualizar base de datos general
    setUsuariosBD((prev) =>
      prev.map((u) =>
        u.email.toLowerCase() === usuario.email.toLowerCase()
          ? usuarioActualizado
          : u
      )
    );
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        usuariosBD,
        registrarUsuario,
        iniciarSesion,
        cerrarSesion: solicitarCerrarSesion,
        confirmarCerrarSesion,
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

export const useAuth = () => useContext(AuthContext);