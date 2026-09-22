import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Importamos con los nombres exactos de tu carpeta 'paginas'
import Index from "./paginas/Index";
import Catalogo from "./paginas/catalogo";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-950">
        <Navbar />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/catalogo" element={<Catalogo />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;