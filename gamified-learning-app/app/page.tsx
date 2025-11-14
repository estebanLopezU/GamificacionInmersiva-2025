"use client";
import { useState } from "react";
import Image from "next/image";

// --- 1. Estructura de datos con toda la información ---
const vrInfo = [
  {
    id: "sobre-vr",
    title: "Sobre la VR",
    content: (
      <>
        <h3 className="text-2xl font-bold text-zinc-800 mb-4">
          ¿Qué es la Realidad Virtual (VR)?
        </h3>
        <p className="mb-4">
          La Realidad Virtual (Virtual Reality) es una tecnología que permite
          sumergir al usuario en un entorno completamente digital, generado por
          computadora, donde puedes interactuar y sentirte “dentro” de una
          simulación.
        </p>
        <p className="mb-4">
          Se logra usando gafas VR, sensores de movimiento, controladores y, en
          algunos casos, guantes o trajes hápticos.
        </p>
        <h4 className="text-xl font-semibold text-zinc-700 mt-6 mb-3">
          Usos de la VR:
        </h4>
        <ul className="list-disc list-inside space-y-2">
          <li>Juegos inmersivos</li>
          <li>Entrenamiento (médico, militar, industrial)</li>
          <li>Simulaciones y Educación</li>
          <li>Turismo virtual y Diseño arquitectónico</li>
          <li>Terapia y rehabilitación</li>
        </ul>
      </>
    ),
  },
  {
    id: "acceso-vr",
    title: "Información para acceder a la VR",
    content: (
      <>
        <h3 className="text-2xl font-bold text-zinc-800 mb-4">
          Formas de acceder a la VR
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-semibold text-zinc-700 mb-2">
              A) Headsets VR independientes (sin PC)
            </h4>
            <p>No requieren computador. Ejemplos: Meta Quest 2/3, Pico 4.</p>
            <p className="text-zinc-500 text-sm mt-1">
              Ventajas: Baratos, fáciles de usar, portátiles.
              <br />
              Desventajas: Gráficos limitados, menos potencia.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-zinc-700 mb-2">
              B) VR para PC (alta calidad)
            </h4>
            <p>
              Necesitas una PC gamer y un visor compatible (Valve Index, HTC
              Vive, Quest 3 con Link).
            </p>
            <p className="text-zinc-500 text-sm mt-1">
              Ventajas: Máxima calidad gráfica, mayor precisión.
              <br />
              Desventajas: Más costoso, requiere espacio.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold text-zinc-700 mb-2">
              C) VR para consolas
            </h4>
            <p>
              Ejemplo: PSVR 2 para PlayStation 5. Ideal si ya tienes la consola.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "requisitos-pc",
    title: "Requisitos del sistema para PC",
    content: (
      <>
        <h3 className="text-2xl font-bold text-zinc-800 mb-4">
          Requisitos de PC para VR
        </h3>
        <div className="space-y-4">
          <p>
            <strong className="text-zinc-600">Mínimos:</strong> GPU NVIDIA GTX
            1060 / AMD RX 580, CPU i5 6ª gen, 8 GB RAM.
          </p>
          <p>
            <strong className="text-zinc-600">Recomendados:</strong> GPU NVIDIA
            RTX 2060 / AMD RX 6700 XT, CPU i5 10ª gen, 16 GB RAM, SSD.
          </p>
          <p>
            <strong className="text-zinc-600">Ideales:</strong> GPU NVIDIA RTX
            3070+ / AMD 6800 XT+, CPU i7 12ª gen, 32 GB RAM, SSD NVMe.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "recomendaciones",
    title: "Recomendaciones para empezar",
    content: (
      <>
        <h3 className="text-2xl font-bold text-zinc-800 mb-4">
          Recomendaciones
        </h3>
        <ul className="list-disc list-inside space-y-3">
          <li>
            <strong className="text-zinc-600">Primer visor:</strong> Meta Quest
            3 es la mejor opción calidad/precio.
          </li>
          <li>
            <strong className="text-zinc-600">Juegos para empezar:</strong> Beat
            Saber, Superhot VR, Half-Life: Alyx (PC), VRChat.
          </li>
          <li>
            <strong className="text-zinc-600">Espacio necesario:</strong> Mínimo
            2x2 metros para una buena experiencia.
          </li>
          <li>
            <strong className="text-zinc-600">Salud:</strong> Toma descansos
            frecuentes y si te mareas, empieza con juegos estáticos.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "desarrollo-vr",
    title: "¿Quieres desarrollar en VR?",
    content: (
      <>
        <h3 className="text-2xl font-bold text-zinc-800 mb-4">
          Herramientas de Desarrollo VR
        </h3>
        <ul className="list-disc list-inside space-y-3">
          <li>
            <strong className="text-zinc-600">Motores de juego:</strong> Unity
            (más fácil) o Unreal Engine (mejores gráficos).
          </li>
          <li>
            <strong className="text-zinc-600">Librerías VR:</strong> Meta XR
            SDK, SteamVR Plugin, OpenXR (estándar moderno).
          </li>
          <li>
            <strong className="text-zinc-600">Modelado 3D:</strong> Blender
            (gratuito y potente) o Maya (profesional).
          </li>
        </ul>
      </>
    ),
  },
];

export default function Home() {
  // --- 2. Estado para manejar la sección activa ---
  const [selectedSection, setSelectedSection] = useState<string>("sobre-vr");

  const selectedContent = vrInfo.find((item) => item.id === selectedSection)
    ?.content;

  return (
    <div className="w-full min-h-screen bg-zinc-100 text-zinc-800">
      {/* Encabezado */}
      <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-lg border-b border-zinc-200 z-30">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
          <Image src="/UNAL.webp" alt="Logo UNAL" width={40} height={40} />
          <h1 className="text-xl font-semibold text-zinc-900">
            Centro de Información de Realidad Virtual
          </h1>
        </div>
      </header>

      {/* Contenido Principal con Sidebar */}
      <main className="max-w-7xl mx-auto pt-24 px-6">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Menú de Navegación (Sidebar) */}
          <aside className="w-full md:w-1/4">
            <nav className="sticky top-28">
              <h2 className="text-lg font-bold text-zinc-800 mb-4 border-b pb-2">
                Secciones
              </h2>
              <ul className="space-y-2">
                {vrInfo.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setSelectedSection(item.id)}
                      className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${
                        selectedSection === item.id
                          ? "bg-blue-100 text-blue-800 font-semibold"
                          : "hover:bg-zinc-200 text-zinc-600"
                      }`}
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Área de Contenido */}
          <div className="w-full md:w-3/4">
            <section className="bg-white p-8 rounded-lg shadow-md border border-zinc-200 min-h-[60vh]">
              {selectedContent ? (
                selectedContent
              ) : (
                <div className="text-center text-zinc-500">
                  <h3 className="text-xl font-semibold">Bienvenido</h3>
                  <p>
                    Selecciona una sección del menú para ver la información.
                  </p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
