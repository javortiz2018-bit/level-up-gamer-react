import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // 1. Cargar usuarios guardados en localStorage
  const [usuariosBD, setUsuariosBD] = useState(() => {
    try {
      const guardados = localStorage.getItem("usuarios");
      return guardados ? JSON.parse(guardados) : [];
    } catch (error) {
      console.error("Error al leer 'usuarios' de localStorage:", error);
      return [];
    }
  });

  // 2. Cargar la sesión actual desde localStorage
  const [usuario, setUsuario] = useState(() => {
    try {
      const sesion = localStorage.getItem("usuarioSesion");
      return sesion ? JSON.parse(sesion) : null;
    } catch (error) {
      console.error("Error al leer 'usuarioSesion' de localStorage:", error);
      return null;
    }
  });

  const [mostrarModalSalir, setMostrarModalSalir] = useState(false);

  // Sincronizar Base de Datos local con localStorage
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

  // Registrar usuario (Incluye regla de edad mínima de 18 años)
  const registrarUsuario = ({ nombre, email, edad, password }) => {
    const emailLimpio = email.trim().toLowerCase();

    // Requerimiento: Registro solo para mayores de 18 años
    if (Number(edad) < 18) {
      return {
        ok: false,
        msj: "Debes ser mayor de 18 años para registrarte en Level-Up Gamer.",
      };
    }

    const existe = usuariosBD.some(
      (u) => u.email.toLowerCase() === emailLimpio
    );

    if (existe) {
      return { ok: false, msj: "El correo electrónico ya está registrado." };
    }

    // Requerimiento: Identificación de correos Duoc para el 20% OFF de por vida
    const esDuoc =
      emailLimpio.endsWith("@duocuc.cl") ||
      emailLimpio.endsWith("@profesor.duoc.cl") ||
      emailLimpio.endsWith("@duoc.cl");

    const nuevoUsuario = {
      nombre: nombre.trim(),
      email: emailLimpio,
      edad: Number(edad),
      password,
      puntos: 0,
      esDuoc,
    };

    setUsuariosBD((prev) => [...prev, nuevoUsuario]);
    return {
      ok: true,
      msj: "¡Cuenta creada con éxito! Redirigiendo a Iniciar Sesión...",
    };
  };

  // Iniciar sesión
  const iniciarSesion = (email, password) => {
    const emailLimpio = email.trim().toLowerCase();

    const usuarioExiste = usuariosBD.find(
      (u) => u.email.toLowerCase() === emailLimpio
    );

    if (!usuarioExiste) {
      return {
        ok: false,
        msj: "El correo electrónico no está registrado. Por favor regístrate.",
      };
    }

    if (usuarioExiste.password !== password) {
      return {
        ok: false,
        msj: "La contraseña es incorrecta.",
      };
    }

    setUsuario(usuarioExiste);
    return { ok: true, msj: `¡Bienvenido ${usuarioExiste.nombre}!` };
  };

  // Cerrar sesión
  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem("usuarioSesion");
    setMostrarModalSalir(false);
  };

  const solicitarCerrarSesion = () => setMostrarModalSalir(true);
  const cancelarCerrarSesion = () => setMostrarModalSalir(false);

  // Sumar puntos LevelUp (Habilitado para TODOS los usuarios autenticados)[cite: 4]
  const agregarPuntos = (cantidadPuntos) => {
    if (!usuario) {
      return { ok: false, msj: "Debes iniciar sesión para acumular puntos." };
    }

    const puntosASumar = Number(cantidadPuntos) || 0;
    if (puntosASumar <= 0) {
      return { ok: false, msj: "La cantidad de puntos debe ser mayor a 0." };
    }

    setUsuario((prevUsuario) => {
      if (!prevUsuario) return null;

      const puntosActuales = Number(prevUsuario.puntos) || 0;
      const nuevosPuntos = puntosActuales + puntosASumar;
      const usuarioActualizado = { ...prevUsuario, puntos: nuevosPuntos };

      // Sincronizar actualización en la lista general de usuarios
      setUsuariosBD((prevBD) =>
        prevBD.map((u) =>
          u.email.toLowerCase() === usuarioActualizado.email.toLowerCase()
            ? usuarioActualizado
            : u
        )
      );

      return usuarioActualizado;
    });

    return { ok: true, msj: `¡Has acumulado ${puntosASumar} puntos LevelUp!` };
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        usuariosBD,
        registrarUsuario,
        iniciarSesion,
        cerrarSesion,
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