import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";
import { useAuth } from "../context/AuthContext";

export default function Checkout() {
  const {
    carrito,
    subtotal,
    descuento,
    esEstudianteDuoc,
    total,
    totalPuntosGanados,
    vaciarCarrito,
  } = useCarrito();

  const { usuario, registrarCompra, agregarPuntos } = useAuth();
  const navigate = useNavigate();

  // Estados del Formulario
  const [nombre, setNombre] = useState(usuario?.nombre || "");
  const [rut, setRut] = useState("");
  const [email, setEmail] = useState(usuario?.email || "");
  const [direccion, setDireccion] = useState("");
  const [metodoPago, setMetodoPago] = useState("tarjeta");

  // Estado de Boleta / Procesamiento
  const [procesando, setProcesando] = useState(false);
  const [boleta, setBoleta] = useState(null);

  // Si el carrito está vacío y no hay boleta generada
  if (carrito.length === 0 && !boleta) {
    return (
      <main className="container py-5 text-center text-white">
        <h2 className="fw-bold mb-3">Tu carrito está vacío 🛒</h2>
        <p className="text-secondary mb-4">
          Agrega productos al carrito antes de proceder al pago.
        </p>
        <Link to="/catalogo" className="btn btn-primary fw-bold">
          Ir al Catálogo
        </Link>
      </main>
    );
  }

  const handleProcesarCompra = (e) => {
    e.preventDefault();
    setProcesando(true);

    // Simulación de respuesta de pasarela según el diagrama
    setTimeout(() => {
      const fechaActual = new Date().toLocaleDateString("es-CL", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const numeroBoleta = "BOL-" + Math.floor(100000 + Math.random() * 900000);

      // Cálculo de IVA (19% incluido en el total)
      const neto = Math.round(total / 1.19);
      const iva = total - neto;

      const nuevaBoleta = {
        numeroBoleta,
        fecha: fechaActual,
        cliente: { nombre, rut, email, direccion },
        items: [...carrito],
        subtotal,
        descuento,
        neto,
        iva,
        total,
        puntosGanados: totalPuntosGanados,
        metodoPago:
          metodoPago === "tarjeta"
            ? "Tarjeta de Crédito / Débito (Webpay)"
            : "Transferencia Bancaria",
      };

      // 1. Guardar boleta para renderizar la vista final
      setBoleta(nuevaBoleta);

      // 2. Guardar en el historial del usuario si existe la función
      if (usuario && registrarCompra) {
        registrarCompra(nuevaBoleta);
      }
      if (usuario && agregarPuntos) {
        agregarPuntos(totalPuntosGanados);
      }

      // 3. Vaciar el carrito
      vaciarCarrito();
      setProcesando(false);
    }, 1500);
  };

  return (
    <main className="container py-5 text-white">
      {boleta ? (
        /* --- VISTA DE BOLETA ELECTRÓNICA SIMULADA --- */
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-7">
            <div
              className="card bg-white text-dark p-4 shadow-lg rounded-4"
              id="boleta-imprimible"
            >
              {/* Encabezado Boleta */}
              <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
                <div>
                  <h3 className="fw-bold m-0 text-primary">LEVEL-UP GAMER</h3>
                  <small className="text-muted">Venta de Tecnología y Periféricos</small>
                  <br />
                  <small className="text-muted">R.U.T.: 76.543.210-K</small>
                </div>
                <div className="text-end border border-danger p-2 rounded text-danger fw-bold small">
                  R.U.T.: 76.543.210-K <br />
                  BOLETA ELECTRÓNICA <br />
                  N° {boleta.numeroBoleta}
                </div>
              </div>

              {/* Datos Cliente */}
              <div className="mb-3 small">
                <p className="mb-1"><strong>Fecha:</strong> {boleta.fecha}</p>
                <p className="mb-1"><strong>Señor(a):</strong> {boleta.cliente.nombre}</p>
                <p className="mb-1"><strong>R.U.T.:</strong> {boleta.cliente.rut || "N/A"}</p>
                <p className="mb-1"><strong>Email:</strong> {boleta.cliente.email}</p>
                <p className="mb-1"><strong>Dirección:</strong> {boleta.cliente.direccion}</p>
                <p className="mb-1"><strong>Forma de Pago:</strong> {boleta.metodoPago}</p>
              </div>

              {/* Detalle Productos */}
              <table className="table table-sm text-dark small mb-3">
                <thead className="table-light">
                  <tr>
                    <th>Cant.</th>
                    <th>Producto</th>
                    <th className="text-end">P. Unitario</th>
                    <th className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {boleta.items.map((prod) => (
                    <tr key={prod.id}>
                      <td>{prod.cantidad}</td>
                      <td>{prod.nombre}</td>
                      <td className="text-end">${prod.precio.toLocaleString("es-CL")}</td>
                      <td className="text-end">
                        ${(prod.precio * prod.cantidad).toLocaleString("es-CL")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totales */}
              <div className="row small border-top pt-2">
                <div className="col-7">
                  {boleta.descuento > 0 && (
                    <p className="text-success fw-bold mb-1">
                      🎓 Descuento Duoc UC (20%) Aplicado
                    </p>
                  )}
                  {boleta.puntosGanados > 0 && (
                    <p className="text-primary mb-1">
                      ⭐ Puntos acumulados: +{boleta.puntosGanados} pts
                    </p>
                  )}
                </div>
                <div className="col-5 text-end">
                  <p className="mb-1">Subtotal: ${boleta.subtotal.toLocaleString("es-CL")}</p>
                  {boleta.descuento > 0 && (
                    <p className="mb-1 text-danger">
                      Descuento: -${boleta.descuento.toLocaleString("es-CL")}
                    </p>
                  )}
                  <p className="mb-1 text-muted">
                    Monto Neto: ${boleta.neto.toLocaleString("es-CL")}
                  </p>
                  <p className="mb-1 text-muted">
                    I.V.A. (19%): ${boleta.iva.toLocaleString("es-CL")}
                  </p>
                  <h5 className="fw-bold mt-2 border-top pt-1">
                    TOTAL: ${boleta.total.toLocaleString("es-CL")}
                  </h5>
                </div>
              </div>

              {/* Botones */}
              <div className="d-print-none d-flex justify-content-between mt-4 pt-3 border-top">
                <button
                  onClick={() => window.print()}
                  className="btn btn-outline-dark fw-bold"
                >
                  🖨️ Imprimir Boleta
                </button>
                <Link to="/catalogo" className="btn btn-primary fw-bold">
                  Volver a la Tienda
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* --- FORMULARIO DE CHECKOUT --- */
        <div className="row g-4">
          <div className="col-12 col-lg-7">
            <div
              className="card text-white border-0 p-4 shadow-lg rounded-4"
              style={{ backgroundColor: "#111827", border: "1px solid #1f2937" }}
            >
              <h4 className="fw-bold mb-4">💳 Datos de Facturación y Pago</h4>

              <form onSubmit={handleProcesarCompra}>
                <div className="row g-3 mb-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label small text-secondary">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      className="form-control text-white border-secondary shadow-none"
                      style={{ backgroundColor: "#1f2937" }}
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small text-secondary">R.U.T.</label>
                    <input
                      type="text"
                      className="form-control text-white border-secondary shadow-none"
                      style={{ backgroundColor: "#1f2937" }}
                      placeholder="12.345.678-9"
                      value={rut}
                      onChange={(e) => setRut(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label small text-secondary">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control text-white border-secondary shadow-none"
                    style={{ backgroundColor: "#1f2937" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label small text-secondary">
                    Dirección de Despacho
                  </label>
                  <input
                    type="text"
                    className="form-control text-white border-secondary shadow-none"
                    style={{ backgroundColor: "#1f2937" }}
                    placeholder="Av. Concha y Toro 1340, Puente Alto"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                  />
                </div>

                <h6 className="text-secondary fw-bold mb-3">Método de Pago</h6>
                <div className="d-flex gap-2 mb-4">
                  <button
                    type="button"
                    className={`btn btn-sm flex-fill ${
                      metodoPago === "tarjeta" ? "btn-primary" : "btn-outline-secondary"
                    }`}
                    onClick={() => setMetodoPago("tarjeta")}
                  >
                    💳 Tarjeta Webpay
                  </button>
                  <button
                    type="button"
                    className={`btn btn-sm flex-fill ${
                      metodoPago === "transferencia" ? "btn-primary" : "btn-outline-secondary"
                    }`}
                    onClick={() => setMetodoPago("transferencia")}
                  >
                    🏦 Transferencia
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={procesando}
                  className="btn btn-primary w-100 fw-bold py-2 text-uppercase"
                >
                  {procesando
                    ? "⏳ Generando Boleta y Procesando..."
                    : `Pagar $${total.toLocaleString("es-CL")}`}
                </button>
              </form>
            </div>
          </div>

          {/* Resumen Lateral */}
          <div className="col-12 col-lg-5">
            <div
              className="card text-white border-0 p-4 shadow-lg rounded-4"
              style={{ backgroundColor: "#111827", border: "1px solid #1f2937" }}
            >
              <h5 className="fw-bold mb-3">Resumen de la Orden</h5>
              <ul className="list-group list-group-flush mb-3">
                {carrito.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item bg-transparent text-white d-flex justify-content-between px-0 border-secondary small"
                  >
                    <span>
                      {item.cantidad}x {item.nombre}
                    </span>
                    <span className="fw-bold">
                      ${(item.precio * item.cantidad).toLocaleString("es-CL")}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="border-top border-secondary pt-2 small">
                {esEstudianteDuoc && (
                  <div className="d-flex justify-content-between text-success fw-bold mb-1">
                    <span>Descuento Duoc UC (20%):</span>
                    <span>-${descuento.toLocaleString("es-CL")}</span>
                  </div>
                )}
                <div className="d-flex justify-content-between fs-5 fw-bold mt-2 pt-2 border-top border-secondary">
                  <span>Total Final:</span>
                  <span className="text-primary">${total.toLocaleString("es-CL")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}