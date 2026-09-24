import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CarritoProvider } from "./context/CarritoContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CarritoModal from "./components/CarritoModal";
import ModalConfirmacionSalir from "./components/ModalConfirmacionSalir"; 
import Checkout from "./paginas/Checkout";

import Index from "./paginas/Index";
import Catalogo from "./paginas/catalogo";
import Blog from "./paginas/blog";
import DetalleBlog from "./paginas/DetalleBlog";
import Contacto from "./paginas/contacto";
import Nosotros from "./paginas/nosotros";
import Login from "./paginas/login";
import Registrar from "./paginas/registrar";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CarritoProvider>
          {/* Contenedor flexible principal adaptado a Bootstrap */}
          <div className="d-flex flex-column min-vh-100 text-light" style={{ backgroundColor: "#090d16" }}>
            <Navbar />
            <CarritoModal />
            <ModalConfirmacionSalir />

            <main className="flex-grow-1">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<DetalleBlog />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registrar" element={<Registrar />} />
                <Route path="/checkout" element={<Checkout />} />

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