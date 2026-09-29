// 1. Productos para el Catálogo
export const productosData = [
  {
    id: 101,
    nombre: "Teclado Mecánico RGB Red Switch",
    categoria: "Periféricos",
    precio: 49990,
    puntos: 50,
    imagen: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop",
    descripcion: "Switches red lineales súper rápidos, retroiluminación RGB personalizable."
  },
  {
    id: 102,
    nombre: "Mouse Gamer Pro 16000 DPI",
    categoria: "Periféricos",
    precio: 29990,
    puntos: 30,
    imagen: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop",
    descripcion: "Sensor óptico de alta precisión y peso ultraligero de 68g."
  },
  {
    id: 103,
    nombre: "Audífonos Gamer 7.1 Surround",
    categoria: "Periféricos",
    precio: 59990,
    puntos: 60,
    imagen: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop",
    descripcion: "Sonido posicional 7.1, micrófono con cancelación de ruido."
  },
  {
    id: 104,
    nombre: "Tarjeta de Video RTX 4060 8GB",
    categoria: "Componentes",
    precio: 349990,
    puntos: 350,
    imagen: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=600&auto=format&fit=crop",
    descripcion: "Arquitectura Ada Lovelace, DLSS 3 y Ray Tracing."
  },
  {
    id: 105,
    nombre: "Procesador Ryzen 5 7600X",
    categoria: "Componentes",
    precio: 219990,
    puntos: 220,
    imagen: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&auto=format&fit=crop",
    descripcion: "6 núcleos y 12 hilos hasta 5.3GHz, socket AM5, soporte DDR5."
  },
  {
    id: 106,
    nombre: "Monitor Gamer 165Hz 1ms IPS",
    categoria: "Monitores",
    precio: 189990,
    puntos: 190,
    imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop",
    descripcion: "Panel IPS Full HD de 24 pulgadas, tiempo de respuesta de 1ms."
  }
];

// 2. Artículos para el Blog
export const articulosData = [
  {
    id: 1,
    categoria: "GUÍAS Y SETUP",
    titulo: "Cómo armar tu primer PC Gamer en 2026",
    resumen: "Te enseñamos a elegir los mejores componentes según tu presupuesto sin gastar de más.",
    imagen: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop",
    fecha: "20 Septiembre 2026",
    autor: "Level-Up Team",
    contenido: [
      "Armar tu primer PC Gamer en 2026 puede parecer intimidante, pero con la guía adecuada es un proceso bastante directo. Lo primero es definir tu presupuesto global.",
      "1. Procesador y Tarjeta de Video: Prioriza la GPU si buscas jugar a alta tasa de refresco. Los procesadores actuales de gama media ofrecen un rendimiento excepcional sin romper el bolsillo.",
      "2. Memoria RAM y Almacenamiento: Se recomienda como mínimo 16GB de RAM a altas velocidades y un SSD NVMe M.2 para tiempos de carga casi instantáneos.",
      "3. Fuente de Poder: Nunca escatimes en la fuente de poder. Elige marcas certificadas 80 Plus Bronze o Gold para proteger tu inversión."
    ]
  },
  {
    id: 2,
    categoria: "PERIFÉRICOS",
    titulo: "¿Teclado Mecánico o Membrana?",
    resumen: "Descubre las ventajas competitivas de los switches mecánicos frente al teclado convencional.",
    imagen: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop",
    fecha: "18 Septiembre 2026",
    autor: "Gamer Expert",
    contenido: [
      "La elección del teclado es vital para la precisión y comodidad durante largas sesiones de juego o escritura.",
      "Los teclados de membrana son silenciosos y económicos, pero carecen del 'feedback' táctil y la durabilidad de los switches mecánicos.",
      "En los teclados mecánicos, cada tecla tiene su propio switch individual. Los switches Red son lineales y rápidos para Gaming, los Blue son ruidosos con respuesta táctil, y los Brown ofrecen un equilibrio intermedio perfecto."
    ]
  },
  {
    id: 3,
    categoria: "OPTIMIZACIÓN",
    titulo: "Mejora tus FPS en juegos competitivos",
    resumen: "Ajustes sencillos en Windows y drivers para exprimir al máximo el rendimiento de tu PC.",
    imagen: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop",
    fecha: "15 Septiembre 2026",
    autor: "Pro Player Chile",
    contenido: [
      "Si buscas la máxima ventaja en títulos como Valorant, Counter-Strike 2 o Fortnite, unos cuantos FPS extra pueden marcar la diferencia.",
      "1. Activa el Modo Juego en Windows y deshabilita aplicaciones en segundo plano.",
      "2. Configura el panel de control de tu GPU (NVIDIA o AMD) en modo de 'Máximo Rendimiento'.",
      "3. En el juego, reduce las sombras, la oclusión ambiental y el anti-aliasing. Mantén únicamente la distancia de visión y la resolución nativa."
    ]
  }
];

// Exportación por defecto para resolver la importación en DetalleProducto
export default productosData;