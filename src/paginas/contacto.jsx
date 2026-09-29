import React, { useState } from "react";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });

  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });
    setTimeout(() => setEnviado(false), 5000);
  };

  return (
    <main className="container py-5 text-white">
      <div className="row justify-content-center mb-4 text-center">
        <div className="col-12 col-md-8">
          <span className="badge bg-danger text-uppercase mb-2">Atención al cliente</span>
          <h1 className="fw-bold">Ponte en contacto con nosotros</h1>
          <p className="text-secondary small">
            ¿Tienes dudas sobre la compatibilidad de algún componente o necesitas soporte con tu compra? Escríbenos y te responderemos a la brevedad.
          </p>
        </div>
      </div>

      <div className="row g-4 justify-content-center">
        {/* Información de contacto */}
        <div className="col-12 col-md-4">
          <div className="card bg-dark text-white border-secondary h-100 p-3 shadow">
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title fw-bold text-danger mb-4">Información de Contacto</h5>
                
                <div className="mb-3">
                  <h6 className="fw-bold mb-1">📍 Ubicación</h6>
                  <p className="small text-secondary mb-0">Santiago, Chile (Envíos a todo el país)</p>
                </div>

                <div className="mb-3">
                  <h6 className="fw-bold mb-1">✉️ Correo Electrónico</h6>
                  <p className="small text-secondary mb-0">soporte@levelupgamer.cl</p>
                </div>

                <div className="mb-3">
                  <h6 className="fw-bold mb-1">📞 Teléfono / WhatsApp</h6>
                  <p className="small text-secondary mb-0">+56 9 1234 5678</p>
                </div>

                <div className="mb-3">
                  <h6 className="fw-bold mb-1">⏰ Horario de Atención</h6>
                  <p className="small text-secondary mb-0">Lunes a Viernes: 09:00 - 18:00 hrs</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formulario de contacto */}
        <div className="col-12 col-md-6">
          <div className="card bg-dark text-white border-secondary p-3 shadow">
            <div className="card-body">
              <h5 className="card-title fw-bold mb-3">Envíanos un mensaje</h5>

              {enviado && (
                <div className="alert alert-success alert-dismissible fade show text-center" role="alert">
                  <strong>¡Mensaje enviado con éxito!</strong> Nos pondremos en contacto contigo pronto.
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary">Nombre Completo</label>
                  <input
                    type="text"
                    name="nombre"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Ej. Juan Pérez"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary">Correo Electrónico</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="nombre@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary">Asunto</label>
                  <input
                    type="text"
                    name="asunto"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Consulta sobre producto, garantía, etc."
                    value={formData.asunto}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold text-secondary">Mensaje</label>
                  <textarea
                    name="mensaje"
                    rows="4"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Escribe tu mensaje aquí..."
                    value={formData.mensaje}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-danger w-100 fw-bold uppercase">
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}