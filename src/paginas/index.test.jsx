import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Index from './Index';

const mockAgregarAlCarrito = vi.fn();
vi.mock('../context/CarritoContext', () => ({
  useCarrito: () => ({
    agregarAlCarrito: mockAgregarAlCarrito,
  }),
}));

describe('<Index />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe renderizar la sección hero y sus botones de navegación', () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /eleva tu nivel con level-up gamer/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ver catálogo/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /gaming blog/i })).toBeInTheDocument();
  });

  it('debe renderizar la lista de productos destacados', () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    expect(screen.getByText('Teclado Mecánico RGB Red Switch')).toBeInTheDocument();
    expect(screen.getByText('Mouse Gamer Pro 16000 DPI')).toBeInTheDocument();
    expect(screen.getByText('Tarjeta de Video RTX 4060 8GB')).toBeInTheDocument();
  });

  it('debe llamar a agregarAlCarrito al hacer clic en un botón de compra', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    const botonesAgregar = screen.getAllByRole('button', { name: /🛒 agregar al carrito/i });
    expect(botonesAgregar).toHaveLength(3);

    await user.click(botonesAgregar[0]);

    expect(mockAgregarAlCarrito).toHaveBeenCalledTimes(1);
    expect(mockAgregarAlCarrito).toHaveBeenCalledWith({
      id: 101,
      nombre: 'Teclado Mecánico RGB Red Switch',
      categoria: 'Periféricos',
      precio: 49990,
      puntos: 50,
      imagen: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop',
      descripcion: 'Switches red lineales súper rápidos y chasis de aluminio.',
    });
  });
});