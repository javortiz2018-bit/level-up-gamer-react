import React, { useState, useEffect } from "react";
import {
  obtenerProductos,
  agregarProducto,
  actualizarProducto,
  eliminarProducto
} from "../services/api";

export const Dashboard = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [editandoId, setEditandoId] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    categoria: "Periféricos",
    imagen: "",
    descripcion: ""
  });

  const cargarDatos = async () => {
    setCargando(true);
    const data = await obtenerProductos();
    setProductos(data);
    setCargando(false);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.precio) {
      alert("Por favor completa los campos obligatorios.");
      return;
    }

    if (editandoId) {
      await actualizarProducto(editandoId, form);
      setEditandoId(null);
    } else {
      await agregarProducto(form);
    }

    setForm({
      nombre: "",
      precio: "",
      stock: "",
      categoria: "Periféricos",
      imagen: "",
      descripcion: ""
    });
    await cargarDatos();
  };

  const handleEditar = (prod) => {
    setEditandoId(prod.id);
    setForm({
      nombre: prod.nombre || "",
      precio: prod.precio || "",
      stock: prod.stock ?? prod.inventario ?? prod.cantidad ?? 10,
      categoria: prod.categoria || "Periféricos",
      imagen: prod.imagen || "",
      descripcion: prod.descripcion || ""
    });
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este producto?")) {
      await eliminarProducto(id);
      await cargarDatos();
    }
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setForm({
      nombre: "",
      precio: "",
      stock: "",
      categoria: "Periféricos",
      imagen: "",
      descripcion: ""
    });
  };

  // 🔢 CÁLCULOS ROBUSTOS DE STOCK (Cubre stock, inventario o cantidad)
  const obtenerStockValido = (p) => Number(p.stock ?? p.inventario ?? p.cantidad ?? 10);

  const totalProductos = productos.length;
  const stockTotal = productos.reduce((acc, p) => acc + obtenerStockValido(p), 0);
  const stockCritico = productos.filter((p) => obtenerStockValido(p) < 5).length;

  return (
    <div className="container py-5 text-white" style={{ minHeight: "80vh" }}>
      <h2 className="fw-bold mb-4 text-center text-uppercase text-warning">
        🛡️ Panel de Administración LEVEL-UP
      </h2>

      {/* TARJETAS DE MÉTRICAS */}
      <div className="row g-3 mb-5">
        <div className="col-12 col-md-4">
          <div className="p-3 rounded-4 bg-dark border border-primary text-center shadow">
            <h5 className="text-secondary">Total Productos</h5>
            <h2 className="fw-bold text-primary">{totalProductos}</h2>
            <small className="text-muted">En catálogo activo</small>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="p-3 rounded-4 bg-dark border border-success text-center shadow">
            <h5 className="text-secondary">Inventario Total</h5>
            <h2 className="fw-bold text-success">{stockTotal} un.</h2>
            <small className="text-muted">Unidades disponibles</small>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="p-3 rounded-4 bg-dark border border-danger text-center shadow">
            <h5 className="text-secondary">Stock Crítico (&lt;5)</h5>
            <h2 className="fw-bold text-danger">{stockCritico}</h2>
            <small className="text-muted">Requieren reabastecimiento</small>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* FORMULARIO DE NUEVO/EDITAR PRODUCTO CON NOMBRES EN LOS CUADROS */}
        <div className="col-12 col-lg-4">
          <div className="p-4 rounded-4 bg-dark border border-secondary shadow">
            <h4 className="fw-bold mb-3 text-info">
              {editandoId ? "✏️ Editar Producto" : "➕ Nuevo Producto"}
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label small text-light fw-bold">Nombre del Producto *</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control bg-secondary text-white border-0"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Teclado Mecánico RGB"
                  required
                />
              </div>

              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label small text-light fw-bold">Precio ($) *</label>
                  <input
                    type="number"
                    name="precio"
                    className="form-control bg-secondary text-white border-0"
                    value={form.precio}
                    onChange={handleChange}
                    placeholder="49990"
                    required
                  />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label small text-light fw-bold">Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    className="form-control bg-secondary text-white border-0"
                    value={form.stock}
                    onChange={handleChange}
                    placeholder="10"
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label small text-light fw-bold">Categoría</label>
                <select
                  name="categoria"
                  className="form-select bg-secondary text-white border-0"
                  value={form.categoria}
                  onChange={handleChange}
                >
                  <option value="Periféricos">Periféricos</option>
                  <option value="Consolas">Consolas</option>
                  <option value="Componentes">Componentes</option>
                  <option value="Accesorios">Accesorios</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label small text-light fw-bold">URL de la Imagen</label>
                <input
                  type="url"
                  name="imagen"
                  className="form-control bg-secondary text-white border-0"
                  value={form.imagen}
                  onChange={handleChange}
                  placeholder="https://imagen.com/foto.jpg"
                />
              </div>

              <div className="mb-3">
                <label className="form-label small text-light fw-bold">Descripción</label>
                <textarea
                  name="descripcion"
                  rows="2"
                  className="form-control bg-secondary text-white border-0"
                  value={form.descripcion}
                  onChange={handleChange}
                  placeholder="Escribe detalles del producto..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-warning w-100 fw-bold mb-2">
                {editandoId ? "Guardar Cambios" : "Guardar Producto"}
              </button>

              {editandoId && (
                <button
                  type="button"
                  onClick={cancelarEdicion}
                  className="btn btn-outline-light w-100 btn-sm"
                >
                  Cancelar Edición
                </button>
              )}
            </form>
          </div>
        </div>

        {/* TABLA DE PRODUCTOS CON CONEXIÓN DE STOCK */}
        <div className="col-12 col-lg-8">
          <div className="p-4 rounded-4 bg-dark border border-secondary shadow table-responsive">
            <h4 className="fw-bold mb-3 text-info">📦 Gestión de Inventario</h4>
            {cargando ? (
              <p className="text-muted">Cargando productos...</p>
            ) : (
              <table className="table table-dark table-hover align-middle mb-0">
                <thead>
                  <tr className="text-secondary small">
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th className="text-end">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((prod) => {
                    const cantStock = obtenerStockValido(prod);
                    return (
                      <tr key={prod.id}>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <img
                              src={prod.imagen || "https://via.placeholder.com/40"}
                              alt={prod.nombre}
                              style={{ width: "40px", height: "40px", objectFit: "cover" }}
                              className="rounded-2"
                            />
                            <span className="fw-bold text-white small">{prod.nombre}</span>
                          </div>
                        </td>
                        <td className="small text-muted">{prod.categoria || "Gamer"}</td>
                        <td className="fw-bold text-success">${Number(prod.precio).toLocaleString("es-CL")}</td>
                        <td>
                          <span className={`badge ${cantStock < 5 ? "bg-danger" : "bg-success"}`}>
                            {cantStock} un.
                          </span>
                        </td>
                        <td className="text-end">
                          <button
                            onClick={() => handleEditar(prod)}
                            className="btn btn-sm btn-outline-info me-2"
                            title="Editar"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleEliminar(prod.id)}
                            className="btn btn-sm btn-outline-danger"
                            title="Eliminar"
                          >
                            🗑️
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;