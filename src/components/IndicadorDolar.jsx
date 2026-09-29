import React from 'react';

export default function IndicadorDolar({ dolar, cargando }) {
  if (cargando) {
    return <div className="p-2 text-center text-muted small">💵 Cargando dólar desde API...</div>;
  }

  if (!dolar) {
    return <div className="p-2 text-center text-danger small">💵 Indicador de dólar no disponible</div>;
  }

  return (
    <div className="p-3 bg-black bg-opacity-25 border border-success rounded my-3 text-center">
      <span className="small text-muted d-block mb-1">💵 Valor Dólar Hoy (API mindicador.cl):</span>
      <span className="fw-bold text-success">$1 USD = ${dolar.toLocaleString('es-CL')} CLP</span>
    </div>
  );
}