import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, test, expect, beforeEach } from 'vitest';
import Catalogo from './catalogo';
import { CarritoProvider } from '../context/CarritoContext';
import { AuthProvider } from '../context/AuthContext'; // 👈 1. Importamos AuthProvider
import * as api from '../services/api';

// Simular la capa de servicios API
vi.mock('../services/api', () => ({
  obtenerProductos: vi.fn(),
}));

const mockProductos = [
  {
    id: 101,
    nombre: 'Teclado Mecánico RGB Red Switch',
    categoria: 'Periféricos',
    precio: 49990,
    puntos: 50,
    imagen: '/images/teclado.jpg',
    descripcion: 'Switches red lineales súper rápidos.'
  },
  {
    id: 102,
    nombre: 'Mouse Gamer Pro 16000 DPI',
    categoria: 'Periféricos',
    precio: 29990,
    puntos: 30,
    imagen: '/images/mouse.jpg',
    descripcion: 'Sensor óptico de alta precisión.'
  }
];

const renderConProviders = (ui) => {
  return render(
    <BrowserRouter>
      <AuthProvider> {/* 👈 2. Envolvemos con AuthProvider */}
        <CarritoProvider>
          {ui}
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Componente Catalogo', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('1. Renderiza el catálogo y muestra los productos', async () => {
    api.obtenerProductos.mockResolvedValue(mockProductos);

    renderConProviders(<Catalogo />);

    await waitFor(() => {
      expect(screen.getByText(/Teclado Mecánico RGB/i)).toBeInTheDocument();
    });

    expect(screen.getByText(/Mouse Gamer Pro/i)).toBeInTheDocument();
  });

  test('2. Filtra productos al usar el buscador', async () => {
    api.obtenerProductos.mockResolvedValue(mockProductos);

    renderConProviders(<Catalogo />);

    const inputBuscador = await screen.findByPlaceholderText(/Buscar producto.../i);

    fireEvent.change(inputBuscador, { target: { value: 'Teclado' } });

    expect(screen.getByText(/Teclado Mecánico RGB/i)).toBeInTheDocument();
    expect(screen.queryByText(/Mouse Gamer Pro/i)).not.toBeInTheDocument();
  });
});