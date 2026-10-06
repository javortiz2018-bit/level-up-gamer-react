import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Footer from './Footer';

describe('<Footer />', () => {
  it('debe renderizarse sin errores en el DOM', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    // Verifica que la etiqueta semántica <footer> esté presente
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('debe renderizar todos los enlaces de navegación con sus rutas correctas', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const enlacesEsperados = [
      { name: /inicio/i, href: '/' },
      { name: /catálogo de productos/i, href: '/catalogo' },
      { name: /gaming blog/i, href: '/blog' },
      { name: /sobre nosotros/i, href: '/nosotros' },
      { name: /contacto y soporte/i, href: '/contacto' },
    ];

    enlacesEsperados.forEach(({ name, href }) => {
      const link = screen.getByRole('link', { name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', href);
    });
  });
});