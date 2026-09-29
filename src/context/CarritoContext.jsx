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

export const CarritoProvider = ({ children }) => {
  // Obtención segura del usuario
  const auth = useAuth();
  const usuario = auth?.usuario;

  // Cargar carrito desde localStorage de manera segura con try/catch
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

  const vaciarCarrito = () => setCarrito([]);

  // Control del Modal
  const abrirCarrito = () => setMostrarModal(true);
  const cerrarCarrito = () => setMostrarModal(false);
  const toggleCarrito = () => setMostrarModal((prev) => !prev);

  // CÁLCULOS AUTOMÁTICOS
  const totalItemsHeader = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  // Subtotal en pesos ($)
  const subtotal = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  // Puntos ganados con la compra
  const totalPuntosGanados = carrito.reduce(
    (acc, item) => acc + (item.puntos || Math.floor(item.precio / 1000)) * item.cantidad,
    0
  );

  // Verificar si aplica el 20% OFF por ser de Duoc UC
  const esEstudianteDuoc =
    Boolean(usuario?.email?.toLowerCase().endsWith("@duocuc.cl")) || Boolean(usuario?.esDuoc);

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
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

// Exportación por defecto para mantener compatibilidad total
export default CarritoContext;