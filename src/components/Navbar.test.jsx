import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, test, expect } from 'vitest';
import Navbar from './Navbar';

// Mockear el hook useAuth
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    usuario: { nombre: 'Gamer Test', puntos: 100 },
    cerrarSesion: vi.fn(),
  }),
}));

// Mockear el hook useCarrito
vi.mock('../context/CarritoContext', () => ({
  useCarrito: () => ({
    carrito: [
      { id: 1, cantidad: 1 },
      { id: 2, cantidad: 1 },
    ],
    abrirCarrito: vi.fn(),
  }),
}));

describe('Componente Navbar', () => {
  // TEST 1: Verificar enlaces de navegación
  test('1. Renderiza correctamente los enlaces de navegación principales', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText(/Inicio/i)).toBeInTheDocument();
    expect(screen.getByText(/Catálogo/i)).toBeInTheDocument();
    expect(screen.getByText(/Contacto/i)).toBeInTheDocument();
  });

  // TEST 2: Verificar badge con el total de productos del carrito
  test('2. Muestra la cantidad correcta de productos en la insignia del carrito', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const badge = screen.getByText('2');
    expect(badge).toBeInTheDocument();
  });
});