import React from "react";
import { useParams, Link } from "react-router-dom";
import { articulosData } from "../data";

export default function DetalleBlog() {
  const { id } = useParams();
  const articulo = articulosData.find((item) => item.id === parseInt(id));

  if (!articulo) {
    return (
      <div className="container py-5 text-center text-white">
        <h2>Artículo no encontrado</h2>
        <Link to="/blog" className="btn btn-primary mt-3">
          ← Volver al Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5 text-white" style={{ maxWidth: "800px" }}>
      <Link to="/blog" className="btn btn-sm btn-outline-light mb-4">
        ← Volver a la lista de noticias
      </Link>

      <div>
        <span className="badge bg-danger text-uppercase mb-2">
          {articulo.categoria}
        </span>
        <h1 className="fw-bold mb-3">{articulo.titulo}</h1>
        
        <div className="d-flex gap-3 text-secondary small border-bottom border-secondary pb-3 mb-4">
          <span>📅 {articulo.fecha}</span>
          <span>✍️ Autor: {articulo.autor}</span>
        </div>

        <img
          src={articulo.imagen}
          alt={articulo.titulo}
          className="img-fluid rounded mb-4 w-100 shadow"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />

        <div className="bg-dark p-4 rounded border border-secondary">
          {articulo.contenido.map((parrafo, idx) => (
            <p key={idx} className="text-light leading-relaxed mb-3">
              {parrafo}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}