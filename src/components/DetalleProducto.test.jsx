import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import DetalleProducto from './DetalleProducto';
import { CarritoProvider } from '../context/CarritoContext';
import { AuthProvider } from '../context/AuthContext';
import * as api from '../services/api';

// 1. Simular la capa de servicios API
vi.mock('../services/api', () => ({
  obtenerProductoPorId: vi.fn(),
  obtenerProductos: vi.fn(),
}));

const mockProducto = {
  id: "1",
  nombre: 'Silla Gamer RGB Pro',
  categoria: 'Sillas',
  precio: 120000,
  puntos: 120,
  imagen: '/images/silla.jpg',
  descripcion: 'Silla ergonómica de alta gama con luces RGB.'
};

const renderConProviders = (id = "1") => {
  return render(
    <MemoryRouter initialEntries={[`/producto/${id}`]}>
      <AuthProvider>
        <CarritoProvider>
          <Routes>
            <Route path="/producto/:id" element={<DetalleProducto />} />
          </Routes>
        </CarritoProvider>
      </AuthProvider>
    </MemoryRouter>
  );
};

describe('Componente DetalleProducto', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('7. Renderiza correctamente el nombre, precio y descripción del producto', async () => {
    // Simular que la API responde exitosamente con el producto
    api.obtenerProductoPorId.mockResolvedValue(mockProducto);

    renderConProviders("1");

    // Esperar a que el componente salga del estado "Cargando"
    await waitFor(() => {
      expect(screen.getByText(/Silla Gamer RGB Pro/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/120\.000/i)).toBeInTheDocument();
  });

  test('7.2 Muestra mensaje de "Producto no encontrado" si el ID no existe', async () => {
    // Simular que la API no encuentra el producto (retorna null)
    api.obtenerProductoPorId.mockResolvedValue(null);

    renderConProviders("999");

    // Esperar a que el componente muestre el mensaje de producto no encontrado
    await waitFor(() => {
      expect(screen.getByText(/Producto no encontrado/i)).toBeInTheDocument();
    });
  });
});