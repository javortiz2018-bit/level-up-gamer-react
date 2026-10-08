import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Index from './Index';

// 1. Datos mock para la API
const mockProductos = [
  {
    id: 101,
    nombre: 'Teclado Mecánico RGB Red Switch',
    categoria: 'Periféricos',
    precio: 49990,
    puntos: 50,
    imagen: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop',
    descripcion: 'Switches red lineales súper rápidos y chasis de aluminio.',
  },
  {
    id: 102,
    nombre: 'Mouse Gamer Pro 16000 DPI',
    categoria: 'Periféricos',
    precio: 29990,
    puntos: 30,
    imagen: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop',
    descripcion: 'Mouse ergonómico para eSports.',
  },
  {
    id: 103,
    nombre: 'Tarjeta de Video RTX 4060 8GB',
    categoria: 'Componentes',
    precio: 350000,
    puntos: 350,
    imagen: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop',
    descripcion: 'Potencia gráfica para tus juegos favoritos.',
  },
];

// 2. Mock del servicio API
vi.mock('../services/api', () => ({
  obtenerProductos: vi.fn(() => Promise.resolve(mockProductos)),
}));

// 3. Mock del contexto AuthContext (soluciona el error useAuth)
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    usuario: null,
  }),
}));

// 4. Mock del contexto CarritoContext
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

  it('debe renderizar la lista de productos destacados', async () => {
    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    // Esperamos a que los datos asíncronos de la API se carguen
    expect(await screen.findByText('Teclado Mecánico RGB Red Switch')).toBeInTheDocument();
    expect(await screen.findByText('Mouse Gamer Pro 16000 DPI')).toBeInTheDocument();
    expect(await screen.findByText('Tarjeta de Video RTX 4060 8GB')).toBeInTheDocument();
  });

  it('debe llamar a agregarAlCarrito al hacer clic en un botón de compra', async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Index />
      </MemoryRouter>
    );

    // Esperamos a que aparezcan los botones tras cargar la API
    const botonesAgregar = await screen.findAllByRole('button', { name: /🛒 agregar al carrito/i });
    expect(botonesAgregar).toHaveLength(3);

    await user.click(botonesAgregar[0]);

    expect(mockAgregarAlCarrito).toHaveBeenCalledTimes(1);
    expect(mockAgregarAlCarrito).toHaveBeenCalledWith(mockProductos[0]);
  });
});