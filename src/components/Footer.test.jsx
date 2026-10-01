import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('<Footer />', () => {
  it('se debe renderizar sin errores en la pantalla', () => {
    const { container } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    // Verifica que el componente se haya montado en el DOM correctamente
    expect(container).toBeInTheDocument();
  });
});