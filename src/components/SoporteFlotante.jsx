import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SoporteFlotante() {
  const [abierto, setAbierto] = useState(false);
  const navigate = useNavigate();

  const toggleWidget = () => setAbierto(!abierto);

  const irAContacto = () => {
    setAbierto(false);
    navigate("/contacto");
  };

  const abrirWhatsApp = () => {
    // Puedes reemplazar este número por el número oficial de la tienda
    window.open(
      "https://wa.me/56912345678?text=Hola,%20tengo%20una%20consulta%20sobre%20Level-Up%20Gamer",
      "_blank"
    );
  };

  return (
    <div style={{ position: "fixed", bottom: "25px", right: "25px", zIndex: 1050 }}>
      {/* Pop-up de Soporte en línea */}
      {abierto && (
        <div
          className="card shadow-lg p-3 text-white mb-3"
          style={{
            width: "310px",
            backgroundColor: "#0d111d",
            border: "1px solid #232942",
            borderRadius: "18px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.6)"
          }}
        >
          {/* Encabezado */}
          <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2 border-secondary border-opacity-25">
            <div className="d-flex align-items-center gap-2">
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  backgroundColor: "#00e676",
                  borderRadius: "50%",
                  display: "inline-block",
                  boxShadow: "0 0 8px #00e676"
                }}
              />
              <strong className="m-0" style={{ fontSize: "0.95rem" }}>
                Soporte en línea
              </strong>
            </div>
            <small className="text-secondary" style={{ fontSize: "0.8rem" }}>
              Responde en &lt; 5m
            </small>
          </div>

          {/* Subtítulo */}
          <p className="text-light text-opacity-75 mb-3" style={{ fontSize: "0.85rem" }}>
            ¿Tienes problemas con alguna compra o evento? ¡Escríbenos!
          </p>

          {/* Opción 1: WhatsApp */}
          <button
            type="button"
            onClick={abrirWhatsApp}
            className="btn w-100 text-start p-2 mb-2 d-flex align-items-center gap-3 rounded-3"
            style={{
              backgroundColor: "#161b2e",
              border: "1px solid #28304d",
              color: "#fff",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#202742";
              e.currentTarget.style.borderColor = "#00e676";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#161b2e";
              e.currentTarget.style.borderColor = "#28304d";
            }}
          >
            <div
              className="rounded-3 d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#25d366",
                color: "#fff",
                fontSize: "1.2rem",
                flexShrink: 0
              }}
            >
              💬
            </div>
            <div>
              <div className="fw-bold" style={{ fontSize: "0.9rem" }}>
                Chat por WhatsApp
              </div>
              <div className="text-secondary" style={{ fontSize: "0.75rem" }}>
                Atención rápida
              </div>
            </div>
          </button>

          {/* Opción 2: Ticket de Asistencia */}
          <button
            type="button"
            onClick={irAContacto}
            className="btn w-100 text-start p-2 d-flex align-items-center gap-3 rounded-3"
            style={{
              backgroundColor: "#161b2e",
              border: "1px solid #28304d",
              color: "#fff",
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#202742";
              e.currentTarget.style.borderColor = "#e91e63";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#161b2e";
              e.currentTarget.style.borderColor = "#28304d";
            }}
          >
            <div
              className="rounded-3 d-flex align-items-center justify-content-center"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#e91e63",
                color: "#fff",
                fontSize: "1.2rem",
                flexShrink: 0
              }}
            >
              📩
            </div>
            <div>
              <div className="fw-bold" style={{ fontSize: "0.9rem" }}>
                Ticket de Asistencia
              </div>
              <div className="text-secondary" style={{ fontSize: "0.75rem" }}>
                Formulario web
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Botón Flotante Gradient Rosa/Morado */}
      <button
        onClick={toggleWidget}
        className="btn rounded-circle d-flex align-items-center justify-content-center p-0"
        style={{
          width: "60px",
          height: "60px",
          background: "linear-gradient(135deg, #f05286 0%, #b83280 100%)",
          border: "2px solid rgba(255, 255, 255, 0.6)",
          color: "#fff",
          fontSize: "24px",
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(240, 82, 134, 0.5)",
          transition: "transform 0.2s"
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {abierto ? "✕" : "🎧"}
      </button>
    </div>
  );
}