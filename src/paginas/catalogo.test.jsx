import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { vi, describe, test, expect } from 'vitest';
import Catalogo from './catalogo';

vi.mock('../context/CarritoContext', () => ({
  useCarrito: () => ({
    agregarAlCarrito: vi.fn(),
  }),
}));

vi.mock('../data', () => ({
  productosData: [
    { id: 1, nombre: 'Teclado Mecánico RGB', precio: 45000, categoria: 'Teclados', imagen: 'teclado.jpg' },
    { id: 2, nombre: 'Mouse Inalámbrico', precio: 25000, categoria: 'Mouses', imagen: 'mouse.jpg' },
  ],
}));

describe('Componente Catalogo', () => {
  test('1. Renderiza el catálogo y muestra los productos', () => {
    render(
      <MemoryRouter>
        <Catalogo />
      </MemoryRouter>
    );

    expect(screen.getByText(/Teclado Mecánico RGB/i)).toBeInTheDocument();
    expect(screen.getByText(/Mouse Inalámbrico/i)).toBeInTheDocument();
  });

  test('2. Filtra productos al usar el buscador', () => {
    render(
      <MemoryRouter>
        <Catalogo />
      </MemoryRouter>
    );

    const inputBuscador = screen.getByPlaceholderText(/buscar/i);
    fireEvent.change(inputBuscador, { target: { value: 'Teclado' } });

    expect(screen.getByText(/Teclado Mecánico RGB/i)).toBeInTheDocument();
    expect(screen.queryByText(/Mouse Inalámbrico/i)).not.toBeInTheDocument();
  });
});