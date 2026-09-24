import React from "react";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CarritoModal() {
  const {
    carrito,
    mostrarModal,
    cerrarCarrito,
    cambiarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    subtotal,
    descuento,
    esEstudianteDuoc,
    total,
    totalPuntosGanados,
  } = useCarrito();

  const { usuario } = useAuth();
  const navigate = useNavigate();

  if (!mostrarModal) return null;

  // Modificado: Ahora redirige al usuario a la vista de checkout / simulación de pago
  const handlePagar = () => {
    if (carrito.length === 0) return;
    cerrarCarrito();
    navigate("/checkout");
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.75)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div
          className="modal-content text-white border-0 rounded-4"
          style={{ backgroundColor: "#111827", border: "1px solid #1f2937" }}
        >
          <div className="modal-header border-bottom border-secondary">
            <h5 className="modal-title fw-bold">🛒 Carrito de Compras</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={cerrarCarrito}
            ></button>
          </div>

          <div className="modal-body">
            {carrito.length === 0 ? (
              <p className="text-center text-muted py-4">
                El carrito está vacío. ¡Agrega algunos productos!
              </p>
            ) : (
              <div className="table-responsive">
                <table className="table table-dark align-middle">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Cantidad</th>
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {carrito.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={item.imagen}
                              alt={item.nombre}
                              width="40"
                              height="40"
                              className="rounded object-fit-cover"
                            />
                            <span className="small fw-bold">{item.nombre}</span>
                          </div>
                        </td>
                        <td>${item.precio.toLocaleString("es-CL")}</td>
                        <td>
                          <div className="d-flex align-items-center gap-1">
                            <button
                              onClick={() => cambiarCantidad(item.id, -1)}
                              className="btn btn-sm btn-outline-secondary py-0 px-2"
                            >
                              -
                            </button>
                            <span className="px-2">{item.cantidad}</span>
                            <button
                              onClick={() => cambiarCantidad(item.id, 1)}
                              className="btn btn-sm btn-outline-secondary py-0 px-2"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="fw-bold">
                          ${(item.precio * item.cantidad).toLocaleString("es-CL")}
                        </td>
                        <td>
                          <button
                            onClick={() => eliminarDelCarrito(item.id)}
                            className="btn btn-sm btn-outline-danger"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {carrito.length > 0 && (
              <div
                className="p-3 rounded-3 mt-3"
                style={{ backgroundColor: "#1f2937" }}
              >
                <div className="d-flex justify-content-between mb-1">
                  <span>Subtotal:</span>
                  <span>${subtotal.toLocaleString("es-CL")}</span>
                </div>

                {esEstudianteDuoc && (
                  <div className="d-flex justify-content-between text-success mb-1">
                    <span>Descuento Duoc UC (20% OFF):</span>
                    <span>-${descuento.toLocaleString("es-CL")}</span>
                  </div>
                )}

                <div className="d-flex justify-content-between fw-bold fs-5 border-top border-secondary pt-2 text-white">
                  <span>Total a Pagar:</span>
                  <span style={{ color: "#a855f7" }}>
                    ${total.toLocaleString("es-CL")}
                  </span>
                </div>

                {usuario && (
                  <div className="text-warning small text-end mt-1">
                    ⭐ Acumularás +{totalPuntosGanados} puntos con esta compra
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="modal-footer border-top border-secondary d-flex justify-content-between">
            <button
              onClick={vaciarCarrito}
              className="btn btn-outline-secondary btn-sm"
              disabled={carrito.length === 0}
            >
              Vaciar
            </button>
            <div className="d-flex gap-2">
              <button onClick={cerrarCarrito} className="btn btn-secondary btn-sm">
                Seguir Comprando
              </button>
              <button
                onClick={handlePagar}
                className="btn btn-sm text-white fw-bold"
                style={{ backgroundColor: "#c026d3" }}
                disabled={carrito.length === 0}
              >
                Ir a Pagar 💳
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}