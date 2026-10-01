import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CarritoProvider, useCarrito } from './CarritoContext';

const mockAuth = { usuario: null };
vi.mock('./AuthContext', () => ({
  useAuth: () => mockAuth,
}));

describe('CarritoContext', () => {
  beforeEach(() => {
    localStorage.clear();
    mockAuth.usuario = null;
    vi.clearAllMocks();
  });

  const wrapper = ({ children }) => <CarritoProvider>{children}</CarritoProvider>;

  it('debe agregar productos y acumular la cantidad si ya existen', () => {
    const { result } = renderHook(() => useCarrito(), { wrapper });
    const producto = { id: 101, nombre: 'Teclado Gamer', precio: 50000 };

    act(() => {
      result.current.agregarAlCarrito(producto);
      result.current.agregarAlCarrito(producto);
    });

    expect(result.current.carrito).toHaveLength(1);
    expect(result.current.carrito[0].cantidad).toBe(2);
    expect(result.current.totalItems).toBe(2);
    expect(result.current.subtotal).toBe(100000);
  });

  it('debe modificar la cantidad (+1 / -1) y remover el producto al llegar a 0', () => {
    const { result } = renderHook(() => useCarrito(), { wrapper });
    const producto = { id: 101, nombre: 'Mouse Gamer', precio: 20000 };

    act(() => {
      result.current.agregarAlCarrito(producto);
    });

    act(() => {
      result.current.cambiarCantidad(101, 1);
    });
    expect(result.current.carrito[0].cantidad).toBe(2);

    act(() => {
      result.current.cambiarCantidad(101, -2);
    });
    expect(result.current.carrito).toHaveLength(0);
  });

  it('debe aplicar un 20% de descuento si el usuario es de Duoc UC (@duocuc.cl)', () => {
    mockAuth.usuario = { email: 'estudiante@duocuc.cl' };
    const { result } = renderHook(() => useCarrito(), { wrapper });

    act(() => {
      result.current.agregarAlCarrito({ id: 1, nombre: 'Silla Gamer', precio: 100000 });
    });

    expect(result.current.esEstudianteDuoc).toBe(true);
    expect(result.current.descuento).toBe(20000);
    expect(result.current.total).toBe(80000);
  });
});