// Obtiene la URL de la API desde las variables de entorno o usa la ruta local como respaldo
const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const obtenerProductos = async () => {
  try {
    // Si hay backend configurado usará http://localhost:8080/api/productos,
    // de lo contrario consumirá el JSON local de desarrollo.
    const url = BASE_URL ? `${BASE_URL}/productos` : '/data/productos.json';
    const respuesta = await fetch(url);

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const productos = await respuesta.json();
    return productos;
  } catch (error) {
    console.error("Error en obtenerProductos:", error);
    return [];
  }
};

export const obtenerProductoPorId = async (id) => {
  try {
    if (BASE_URL) {
      // Petición directa al endpoint del backend (Ej: http://localhost:8080/api/productos/101)
      const respuesta = await fetch(`${BASE_URL}/productos/${id}`);
      if (!respuesta.ok) return null;
      return await respuesta.json();
    } else {
      // Búsqueda en el archivo local JSON
      const productos = await obtenerProductos();
      return productos.find((p) => String(p.id) === String(id)) || null;
    }
  } catch (error) {
    console.error("Error en obtenerProductoPorId:", error);
    return null;
  }
};