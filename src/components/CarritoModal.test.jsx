import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, test, expect } from 'vitest';
import CarritoModal from './CarritoModal';

const mockVaciarCarrito = vi.fn();

vi.mock('../context/CarritoContext', () => ({
  useCarrito: () => ({
    carrito: [
      { id: 1, nombre: 'Mouse Gamer RGB', precio: 25000, cantidad: 2, imagen: 'mouse.jpg' },
    ],
    mostrarModal: true,
    cerrarCarrito: vi.fn(),
    cambiarCantidad: vi.fn(),
    eliminarDelCarrito: vi.fn(),
    vaciarCarrito: mockVaciarCarrito,
    subtotal: 50000,
    descuento: 0,
    esEstudianteDuoc: false,
    total: 50000,
    totalPuntosGanados: 50,
  }),
}));

vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    usuario: { nombre: 'Gamer Test', puntos: 100 },
  }),
}));

describe('Componente CarritoModal', () => {
  test('1. Muestra los productos presentes en el carrito y sus detalles', () => {
    render(
      <MemoryRouter>
        <CarritoModal />
      </MemoryRouter>
    );

    expect(screen.getByText(/Mouse Gamer RGB/i)).toBeInTheDocument();
    expect(screen.getByText(/\$25\.000/i)).toBeInTheDocument();
  });

  test('2. Ejecuta la función vaciarCarrito al hacer clic en el botón Vaciar', () => {
    render(
      <MemoryRouter>
        <CarritoModal />
      </MemoryRouter>
    );

    const botonVaciar = screen.getByRole('button', { name: /vaciar/i });
    fireEvent.click(botonVaciar);

    expect(mockVaciarCarrito).toHaveBeenCalledTimes(1);
  });
});