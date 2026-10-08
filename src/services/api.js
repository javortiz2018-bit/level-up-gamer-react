export const obtenerProductos = async () => {
  try {
    // Si estamos en el navegador usa el origen actual, si no, usa la ruta base
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
    const respuesta = await fetch(`${baseUrl}/data/productos.json`);

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