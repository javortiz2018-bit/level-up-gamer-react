import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CarritoProvider } from "./context/CarritoContext";

// Componentes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CarritoModal from "./components/CarritoModal";
import ModalConfirmacionSalir from "./components/ModalConfirmacionSalir"; 
import ScrollToTop from "./components/ScrollToTop";
import SoporteFlotante from "./components/SoporteFlotante";
import DetalleProducto from "./components/DetalleProducto";

// Páginas
import Index from "./paginas/Index";
import Catalogo from "./paginas/catalogo";
import Blog from "./paginas/blog";
import DetalleBlog from "./paginas/DetalleBlog";
import Contacto from "./paginas/contacto";
import Nosotros from "./paginas/nosotros";
import Login from "./paginas/login";
import Registrar from "./paginas/registrar";
import Checkout from "./paginas/Checkout";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <AuthProvider>
        <CarritoProvider>
          <div className="d-flex flex-column min-vh-100 text-light" style={{ backgroundColor: "#090d16" }}>
            <Navbar />
            <CarritoModal />
            <ModalConfirmacionSalir />
            
            {/* Widget flotante de soporte */}
            <SoporteFlotante />

            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Index />} />
                
                {/* Catálogo y Detalle de Producto */}
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/producto/:id" element={<DetalleProducto />} />
                
                {/* Blog y Detalle de Blog */}
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<DetalleBlog />} />
                
                {/* Páginas estáticas y autenticación */}
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registrar" element={<Registrar />} />
                <Route path="/checkout" element={<Checkout />} />

                {/* Ruta de respaldo para páginas no encontradas (404) */}
                <Route path="*" element={<Index />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </CarritoProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;