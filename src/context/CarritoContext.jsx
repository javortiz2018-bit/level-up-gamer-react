import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

export const CarritoContext = createContext();

export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de un CarritoProvider");
  }
  return context;
};

const limpiarNumero = (val) => {
  if (typeof val === "number") return isNaN(val) ? 0 : val;
  if (!val) return 0;
  const numeroLimpio = String(val).replace(/[^0-9]/g, "");
  return parseInt(numeroLimpio, 10) || 0;
};

export const CarritoProvider = ({ children }) => {
  const auth = useAuth();
  const usuario = auth?.usuario;

  const [emailCheckout, setEmailCheckout] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  // Estado para la notificación Gamer estilizada
  const [notificacion, setNotificacion] = useState(null);

  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem("carrito_gamer");
      return guardado ? JSON.parse(guardado) : [];
    } catch (error) {
      console.error("Error al leer el carrito desde localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("carrito_gamer", JSON.stringify(carrito));
    } catch (error) {
      console.error("Error al guardar el carrito en localStorage:", error);
    }
  }, [carrito]);

  // Función para lanzar notificaciones estilizadas
  const lanzarNotificacion = (mensaje, tipo = "warning") => {
    setNotificacion({ mensaje, tipo });
    setTimeout(() => {
      setNotificacion(null);
    }, 3200);
  };

  // Agregar producto al carrito con validación de stock estilizada
  const agregarAlCarrito = (producto, cantidadDeseada = 1) => {
    setCarrito((prev) => {
      const idProd = producto.id || producto.idProducto;
      const existe = prev.find((item) => (item.id || item.idProducto) === idProd);

      const cantidadActual = existe ? existe.cantidad : 0;
      const stockDisponible = producto.stock !== undefined ? producto.stock : 10;

      if (cantidadActual + cantidadDeseada > stockDisponible) {
        lanzarNotificacion(
          `⚡ LIMITE DE INVENTARIO: Solo quedan ${stockDisponible} unidades de "${producto.nombre}"`,
          "danger"
        );
        return prev;
      }

      if (existe) {
        return prev.map((item) =>
          (item.id || item.idProducto) === idProd
            ? { ...item, cantidad: item.cantidad + cantidadDeseada }
            : item
        );
      }

      return [...prev, { ...producto, cantidad: cantidadDeseada }];
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => (item.id || item.idProducto) !== id));
  };

  const cambiarCantidad = (id, delta) => {
    setCarrito((prev) =>
      prev
        .map((item) => {
          const idProd = item.id || item.idProducto;
          if (idProd === id) {
            const nuevaCantidad = item.cantidad + delta;

            if (nuevaCantidad <= 0) return null;

            const stockDisponible = item.stock !== undefined ? item.stock : 10;
            if (nuevaCantidad > stockDisponible) {
              lanzarNotificacion(
                `⚡ STOCK MÁXIMO ALCANZADO: Límite de ${stockDisponible} unidades para "${item.nombre}"`,
                "warning"
              );
              return item;
            }

            return { ...item, cantidad: nuevaCantidad };
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    try {
      localStorage.removeItem("carrito_gamer");
    } catch (error) {
      console.error("Error al limpiar localStorage:", error);
    }
  };

  const abrirCarrito = () => setMostrarModal(true);
  const cerrarCarrito = () => setMostrarModal(false);
  const toggleCarrito = () => setMostrarModal((prev) => !prev);

  const totalItemsHeader = carrito.reduce((acc, item) => acc + (item.cantidad || 0), 0);

  const subtotal = carrito.reduce((acc, item) => {
    const precioLimpio = limpiarNumero(item.precio);
    const cantidad = item.cantidad || 1;
    return acc + precioLimpio * cantidad;
  }, 0);

  const totalPuntosGanados = carrito.reduce((acc, item) => {
    const cantidad = item.cantidad || 1;
    const puntosDirectos = limpiarNumero(item.puntos);
    const precioLimpio = limpiarNumero(item.precio);

    const puntosUnidad =
      puntosDirectos > 0 ? puntosDirectos : Math.floor(precioLimpio / 1000);

    return acc + puntosUnidad * cantidad;
  }, 0);

  const correoAfecto = emailCheckout || usuario?.email || "";
  const esEstudianteDuoc =
    Boolean(correoAfecto.toLowerCase().endsWith("@duocuc.cl")) ||
    Boolean(correoAfecto.toLowerCase().endsWith("@duoc.cl")) ||
    Boolean(usuario?.esDuoc);

  const porcentajeDescuento = esEstudianteDuoc ? 0.2 : 0;
  const montoDescuento = Math.round(subtotal * porcentajeDescuento);
  const totalFinal = subtotal - montoDescuento;

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        mostrarModal,
        agregarAlCarrito,
        eliminarDelCarrito,
        cambiarCantidad,
        vaciarCarrito,
        abrirCarrito,
        cerrarCarrito,
        toggleCarrito,
        totalItemsHeader,
        totalItems: totalItemsHeader,
        subtotal,
        descuento: montoDescuento,
        esEstudianteDuoc,
        total: totalFinal,
        totalPuntosGanados,
        setEmailCheckout,
        lanzarNotificacion,
      }}
    >
      {children}

      {/* Banner de Notificación Gamer Flotante */}
      {notificacion && (
        <div
          className="position-fixed top-0 end-0 m-4 p-3 rounded-4 shadow-lg text-white d-flex align-items-center gap-3 animate__animated animate__fadeInDown"
          style={{
            zIndex: 9999,
            backgroundColor: "#0d111d",
            border: `2px solid ${notificacion.tipo === "danger" ? "#f43f5e" : "#f59e0b"}`,
            boxShadow: `0 0 20px ${
              notificacion.tipo === "danger"
                ? "rgba(244, 63, 94, 0.4)"
                : "rgba(245, 158, 11, 0.4)"
            }`,
            maxWidth: "420px",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            className="rounded-circle d-flex align-items-center justify-content-center p-2"
            style={{
              backgroundColor:
                notificacion.tipo === "danger"
                  ? "rgba(244, 63, 94, 0.2)"
                  : "rgba(245, 158, 11, 0.2)",
              fontSize: "1.3rem",
            }}
          >
            {notificacion.tipo === "danger" ? "🚨" : "⚡"}
          </div>
          <div className="flex-grow-1">
            <span
              className="fw-bold d-block text-uppercase"
              style={{
                fontSize: "10px",
                letterSpacing: "1px",
                color: notificacion.tipo === "danger" ? "#f43f5e" : "#f59e0b",
              }}
            >
              Alerta Level-Up
            </span>
            <span style={{ fontSize: "0.85rem", color: "#e2e8f0" }}>
              {notificacion.mensaje}
            </span>
          </div>
          <button
            onClick={() => setNotificacion(null)}
            className="btn-close btn-close-white ms-2 shadow-none"
            style={{ fontSize: "0.7rem" }}
          ></button>
        </div>
      )}
    </CarritoContext.Provider>
  );
};

export default CarritoContext;