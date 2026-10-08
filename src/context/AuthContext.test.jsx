import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { AuthProvider, useAuth } from './AuthContext';

// Componente auxiliar para probar la disponibilidad del contexto
const ComponenteDePrueba = () => {
  const auth = useAuth();
  return (
    <div>
      <span data-testid="auth-context-ok">
        {auth ? 'Contexto Cargado' : 'Error'}
      </span>
      <span data-testid="usuario-estado">
        {auth?.usuario ? 'Autenticado' : 'Sin Sesión'}
      </span>
    </div>
  );
};

describe('Contexto AuthContext', () => {
  test('1. Provee el contexto de autenticación correctamente a sus componentes hijos', () => {
    render(
      <AuthProvider>
        <ComponenteDePrueba />
      </AuthProvider>
    );

    expect(screen.getByTestId('auth-context-ok')).toHaveTextContent('Contexto Cargado');
  });

  test('2. Inicia con el estado por defecto sin usuario autenticado', () => {
    render(
      <AuthProvider>
        <ComponenteDePrueba />
      </AuthProvider>
    );

    expect(screen.getByTestId('usuario-estado')).toHaveTextContent('Sin Sesión');
  });
});