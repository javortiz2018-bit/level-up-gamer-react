import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

// Exportamos el contexto para permitir importación nombrada { CarritoContext }
export const CarritoContext = createContext();

// Hook personalizado para consumir el carrito fácilmente
export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarrito debe usarse dentro de un CarritoProvider");
  }
  return context;
};

// Función auxiliar para limpiar precios o puntos en formato string (ej: "$15.990" -> 15990)
const limpiarNumero = (val) => {
  if (typeof val === "number") return isNaN(val) ? 0 : val;
  if (!val) return 0;
  const numeroLimpio = String(val).replace(/[^0-9]/g, "");
  return parseInt(numeroLimpio, 10) || 0;
};

export const CarritoProvider = ({ children }) => {
  // Obtención segura del usuario
  const auth = useAuth();
  const usuario = auth?.usuario;

  // Estado opcional para evaluar descuento si el usuario escribe su correo en Checkout sin estar logueado
  const [emailCheckout, setEmailCheckout] = useState("");

  // Cargar carrito desde localStorage de manera segura
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem("carrito_gamer");
      return guardado ? JSON.parse(guardado) : [];
    } catch (error) {
      console.error("Error al leer el carrito desde localStorage:", error);
      return [];
    }
  });

  const [mostrarModal, setMostrarModal] = useState(false);

  // Guardar en localStorage ante cualquier cambio
  useEffect(() => {
    try {
      localStorage.setItem("carrito_gamer", JSON.stringify(carrito));
    } catch (error) {
      console.error("Error al guardar el carrito en localStorage:", error);
    }
  }, [carrito]);

  // Agregar producto al carrito
  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  // Eliminar un producto
  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  // Cambiar cantidad (+1 / -1)
  const cambiarCantidad = (id, delta) => {
    setCarrito((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nuevaCantidad = item.cantidad + delta;
            return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  // Vaciar carrito por completo
  const vaciarCarrito = () => {
    setCarrito([]);
    try {
      localStorage.removeItem("carrito_gamer");
    } catch (error) {
      console.error("Error al limpiar localStorage:", error);
    }
  };

  // Control del Modal
  const abrirCarrito = () => setMostrarModal(true);
  const cerrarCarrito = () => setMostrarModal(false);
  const toggleCarrito = () => setMostrarModal((prev) => !prev);

  // CÁLCULOS AUTOMÁTICOS
  const totalItemsHeader = carrito.reduce((acc, item) => acc + (item.cantidad || 0), 0);

  // Subtotal en pesos ($) asegurando conversión limpia de precio
  const subtotal = carrito.reduce((acc, item) => {
    const precioLimpio = limpiarNumero(item.precio);
    const cantidad = item.cantidad || 1;
    return acc + precioLimpio * cantidad;
  }, 0);

  // Puntos ganados con la compra (Garantiza cálculo si el precio viene como texto)
  const totalPuntosGanados = carrito.reduce((acc, item) => {
    const cantidad = item.cantidad || 1;
    const puntosDirectos = limpiarNumero(item.puntos);
    const precioLimpio = limpiarNumero(item.precio);

    // Si el producto trae puntos explícitos (> 0), los usa; de lo contrario calcula 1 punto cada $1.000
    const puntosUnidad = puntosDirectos > 0 
      ? puntosDirectos 
      : Math.floor(precioLimpio / 1000);

    return acc + puntosUnidad * cantidad;
  }, 0);

  // Verificar si aplica el 20% OFF por ser de Duoc UC (por Login o por Input en Checkout)
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
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

export default CarritoContext;