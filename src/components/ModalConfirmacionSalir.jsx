import React from "react";

export default function ModalConfirmacionSalir({ abierto, onConfirmar, onCancelar }) {
  if (!abierto) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: "rgba(3, 7, 18, 0.85)",
        backdropFilter: "blur(8px)",
        zIndex: 1060,
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-sm">
        <div
          className="modal-content text-white rounded-4 p-4 text-center shadow-2xl"
          style={{
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            border: "1px solid rgba(244, 63, 94, 0.4)",
            boxShadow: "0 0 30px rgba(244, 63, 94, 0.25)",
          }}
        >
          <div className="fs-1 mb-2">⚠️</div>
          <h5 className="fw-bold text-white mb-2">¿Cerrar Sesión?</h5>
          <p className="text-secondary small mb-4">
            ¿Estás seguro de que deseas salir? Perderás el acceso rápido a tus puntos acumulados.
          </p>

          <div className="d-flex gap-2 justify-content-center">
            <button
              onClick={onCancelar}
              className="btn btn-sm btn-outline-secondary fw-bold px-3"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirmar}
              className="btn btn-sm btn-danger fw-bold px-3"
              style={{
                backgroundColor: "#f43f5e",
                borderColor: "#f43f5e",
                boxShadow: "0 0 12px rgba(244, 63, 94, 0.4)",
              }}
            >
              Sí, Salir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}