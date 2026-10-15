const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const STORAGE_KEY = "productos_gamer";

// Función auxiliar para inicializar productos locales si localStorage está vacío
const cargarProductosLocales = async () => {
  const guardados = localStorage.getItem(STORAGE_KEY);
  if (guardados) {
    return JSON.parse(guardados);
  }

  // Si no hay datos guardados, leemos el JSON inicial y lo guardamos
  try {
    const respuesta = await fetch('/data/productos.json');
    if (respuesta.ok) {
      const productosIniciales = await respuesta.json();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(productosIniciales));
      return productosIniciales;
    }
  } catch (error) {
    console.error("Error al cargar JSON inicial:", error);
  }
  return [];
};

// 1. OBTENER TODOS LOS PRODUCTOS
export const obtenerProductos = async () => {
  try {
    if (BASE_URL) {
      const respuesta = await fetch(`${BASE_URL}/productos`);
      if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);
      return await respuesta.json();
    } else {
      return await cargarProductosLocales();
    }
  } catch (error) {
    console.error("Error en obtenerProductos:", error);
    return [];
  }
};

// 2. OBTENER PRODUCTO POR ID
export const obtenerProductoPorId = async (id) => {
  try {
    if (BASE_URL) {
      const respuesta = await fetch(`${BASE_URL}/productos/${id}`);
      if (!respuesta.ok) return null;
      return await respuesta.json();
    } else {
      const productos = await obtenerProductos();
      return productos.find((p) => String(p.id) === String(id)) || null;
    }
  } catch (error) {
    console.error("Error en obtenerProductoPorId:", error);
    return null;
  }
};

// 3. AGREGAR PRODUCTO (CREATE)
export const agregarProducto = async (nuevoProducto) => {
  try {
    if (BASE_URL) {
      const respuesta = await fetch(`${BASE_URL}/productos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProducto),
      });
      return await respuesta.json();
    } else {
      const productos = await obtenerProductos();
      const productoConId = {
        ...nuevoProducto,
        id: Date.now(), // ID único basado en timestamp
        precio: Number(nuevoProducto.precio),
        stock: Number(nuevoProducto.stock)
      };
      const actualizados = [...productos, productoConId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizados));
      return actualizados;
    }
  } catch (error) {
    console.error("Error en agregarProducto:", error);
    throw error;
  }
};

// 4. ACTUALIZAR PRODUCTO (UPDATE)
export const actualizarProducto = async (id, productoActualizado) => {
  try {
    if (BASE_URL) {
      const respuesta = await fetch(`${BASE_URL}/productos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productoActualizado),
      });
      return await respuesta.json();
    } else {
      const productos = await obtenerProductos();
      const actualizados = productos.map((p) =>
        String(p.id) === String(id)
          ? {
              ...productoActualizado,
              id: p.id,
              precio: Number(productoActualizado.precio),
              stock: Number(productoActualizado.stock)
            }
          : p
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizados));
      return actualizados;
    }
  } catch (error) {
    console.error("Error en actualizarProducto:", error);
    throw error;
  }
};

// 5. ELIMINAR PRODUCTO (DELETE)
export const eliminarProducto = async (id) => {
  try {
    if (BASE_URL) {
      await fetch(`${BASE_URL}/productos/${id}`, { method: "DELETE" });
      return true;
    } else {
      const productos = await obtenerProductos();
      const actualizados = productos.filter((p) => String(p.id) !== String(id));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizados));
      return actualizados;
    }
  } catch (error) {
    console.error("Error en eliminarProducto:", error);
    throw error;
  }
};