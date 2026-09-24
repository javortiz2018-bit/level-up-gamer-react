import React, { useState } from "react";
import { Link } from "react-router-dom";
import { articulosData } from "../data";

export default function Blog() {
  const [busqueda, setBusqueda] = useState("");

  const articulosFiltrados = articulosData.filter(
    (item) =>
      item.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      item.categoria.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container py-4 text-white">
      {/* Buscador */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-dark text-white border-secondary"
              placeholder="Buscar en el blog..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <span className="input-group-text bg-dark border-secondary text-white">🔍</span>
          </div>
        </div>
      </div>

      {/* Grid de Artículos con tarjetas de Bootstrap */}
      <div className="row g-4">
        {articulosFiltrados.map((articulo) => (
          <div key={articulo.id} className="col-12 col-md-4">
            <div className="card h-100 bg-dark text-white border-secondary shadow">
              <img
                src={articulo.imagen}
                className="card-img-top"
                alt={articulo.titulo}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <span className="badge bg-danger mb-2 text-uppercase">
                    {articulo.categoria}
                  </span>
                  <h5 className="card-title fw-bold">{articulo.titulo}</h5>
                  <p className="card-text text-secondary small">
                    {articulo.resumen}
                  </p>
                </div>
                <div className="mt-3">
                  <Link
                    to={`/blog/${articulo.id}`}
                    className="btn btn-outline-danger btn-sm w-100 fw-bold"
                  >
                    Leer más →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}