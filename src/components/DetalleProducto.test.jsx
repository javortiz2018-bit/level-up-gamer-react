import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { vi, describe, test, expect } from 'vitest';
import DetalleProducto from './DetalleProducto';

// 1. Mock de los datos de productos para asegurar que el ID 1 siempre exista en el test
vi.mock('../data', () => ({
  productosData: [
    {
      id: 1,
      nombre: 'Silla Gamer RGB Pro',
      descripcion: 'Silla ergonómica reclinable con luces LED.',
      precio: 120000,
      imagen: 'silla.jpg',
      categoria: 'Gamer',
      puntos: 120,
    },
  ],
}));

// 2. Mock de useCarrito
vi.mock('../context/CarritoContext', () => ({
  useCarrito: () => ({
    agregarAlCarrito: vi.fn(),
  }),
}));

// 3. Mock de useAuth
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    usuario: { nombre: 'Gamer Test', puntos: 100 },
  }),
}));

describe('Componente DetalleProducto', () => {
  test('7. Renderiza correctamente el nombre, precio y descripción del producto', () => {
    render(
      <MemoryRouter initialEntries={['/producto/1']}>
        <Routes>
          <Route path="/producto/:id" element={<DetalleProducto />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Silla Gamer RGB Pro/i)).toBeInTheDocument();
    expect(screen.getByText(/120\.000/i)).toBeInTheDocument();
  });

  test('7.2 Muestra mensaje de "Producto no encontrado" si el ID no existe', () => {
    render(
      <MemoryRouter initialEntries={['/producto/999999']}>
        <Routes>
          <Route path="/producto/:id" element={<DetalleProducto />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Producto no encontrado/i)).toBeInTheDocument();
  });
});