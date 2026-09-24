import React from "react";
import { Link } from "react-router-dom";

export default function Nosotros() {
  return (
    <main className="container py-5 text-white">
      {/* Encabezado */}
      <div className="row justify-content-center text-center mb-5">
        <div className="col-12 col-md-8">
          <span className="badge bg-danger text-uppercase mb-2">Conócenos</span>
          <h1 className="fw-bold display-5">Sobre Level-Up Gamer</h1>
          <p className="text-secondary">
            Pasión por la tecnología, los videojuegos y la cultura geek en Chile desde 2024.
          </p>
        </div>
      </div>

      {/* Sección Historia / Misión */}
      <div className="row g-4 align-items-center mb-5">
        <div className="col-12 col-md-6">
          <div className="bg-dark p-4 rounded border border-secondary shadow">
            <h3 className="fw-bold text-danger mb-3">Nuestra Historia</h3>
            <p className="text-secondary small leading-relaxed">
              Level-Up Gamer nació de un grupo de entusiastas de los videojuegos que buscaban traer productos de alta calidad, periféricos de rendimiento profesional y armado personalizado de PC al mercado local.
            </p>
            <p className="text-secondary small leading-relaxed mb-0">
              Queremos que cada gamer, desde el principiante hasta el jugador competitivo, tenga acceso a los mejores componentes con la garantía y el soporte técnico que se merece.
            </p>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="bg-dark p-4 rounded border border-secondary shadow">
            <h3 className="fw-bold text-danger mb-3">¿Por qué elegirnos?</h3>
            <ul className="list-unstyled text-secondary small mb-0">
              <li className="mb-2">⚡ <strong>Envíos Rápidos:</strong> Despachos garantizados a todo Chile.</li>
              <li className="mb-2">🎓 <strong>Comunidad Duoc UC:</strong> 20% de descuento automático con tu correo institucional.</li>
              <li className="mb-2">⭐ <strong>Sistema de Puntos:</strong> Acumula puntos en cada compra y canjéalos por descuentos.</li>
              <li className="mb-0">🛡️ <strong>Garantía Real:</strong> Soporte directo y asesoría técnica personalizada.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Estadísticas / Logros */}
      <div className="row text-center g-4 mb-5">
        <div className="col-6 col-md-3">
          <div className="bg-dark p-3 rounded border border-secondary">
            <h2 className="fw-bold text-warning mb-0">+5.000</h2>
            <small className="text-secondary">Clientes Felices</small>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="bg-dark p-3 rounded border border-secondary">
            <h2 className="fw-bold text-warning mb-0">+1.200</h2>
            <small className="text-secondary">PC Armados</small>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="bg-dark p-3 rounded border border-secondary">
            <h2 className="fw-bold text-warning mb-0">100%</h2>
            <small className="text-secondary">Garantía Directa</small>
          </div>
        </div>
        <div className="col-6 col-md-3">
          <div className="bg-dark p-3 rounded border border-secondary">
            <h2 className="fw-bold text-warning mb-0">24/7</h2>
            <small className="text-secondary">Soporte Online</small>
          </div>
        </div>
      </div>

      {/* Llamado a la acción */}
      <div className="bg-dark p-5 rounded border border-secondary text-center shadow">
        <h3 className="fw-bold mb-2">¿Listo para armar tu Setup Soñado?</h3>
        <p className="text-secondary small mb-4">Explora nuestro catálogo y descubre las mejores ofertas que tenemos hoy.</p>
        <Link to="/catalogo" className="btn btn-danger btn-lg fw-bold text-uppercase px-4">
          Ver Catálogo Completo
        </Link>
      </div>
    </main>
  );
}