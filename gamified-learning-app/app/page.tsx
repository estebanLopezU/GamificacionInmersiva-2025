"use client";
import { useState, useEffect } from "react";
import Link from 'next/link';
import Image from "next/image";
import styles from './Home.module.css';

// --- 1. Estructura de datos con toda la información ---
const vrInfo = [
  {
    id: "sobre-vr",
    title: "Sobre la VR",
    content: (
      <>
        <h3 className="text-3xl font-bold text-gray-900 mb-4 animate-fadeIn">
          ¿Qué es la Realidad Virtual (VR)?
        </h3>
        <p className="mb-4 text-gray-700 leading-relaxed animate-slideInLeft text-base">
          La Realidad Virtual (Virtual Reality) es una tecnología que permite
          sumergir al usuario en un entorno completamente digital, generado por
          computadora, donde puedes interactuar y sentirte "dentro" de una
          simulación.
        </p>
        <p className="mb-4 text-gray-700 leading-relaxed animate-slideInLeft text-base" style={{animationDelay: "0.1s"}}>
          Se logra usando gafas VR, sensores de movimiento, controladores y, en
          algunos casos, guantes o trajes hápticos.
        </p>
        <h4 className="text-2xl font-semibold text-gray-800 mt-6 mb-3 animate-slideInLeft" style={{animationDelay: "0.2s"}}>
          Usos de la VR:
        </h4>
        <ul className="list-disc list-inside space-y-3 text-gray-700 animate-slideInLeft text-base" style={{animationDelay: "0.3s"}}>
          <li className="hover:translate-x-2 transition-transform">Juegos inmersivos</li>
          <li className="hover:translate-x-2 transition-transform">Entrenamiento (médico, militar, industrial)</li>
          <li className="hover:translate-x-2 transition-transform">Simulaciones y Educación</li>
          <li className="hover:translate-x-2 transition-transform">Turismo virtual y Diseño arquitectónico</li>
          <li className="hover:translate-x-2 transition-transform">Terapia y rehabilitación</li>
        </ul>
      </>
    ),
  },
  {
    id: "acceso-vr",
    title: "Información para acceder a la VR",
    content: (
      <>
        <h3 className="text-3xl font-bold text-gray-900 mb-4 animate-fadeIn">
          Formas de acceder a la VR
        </h3>
        <div className="space-y-6">
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600 hover:shadow-xl transition-all hover:-translate-y-1 animate-slideInBottom" style={{animationDelay: "0.1s"}}>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              A) Headsets VR independientes (sin PC)
            </h4>
            <p className="text-gray-700 text-base mb-3">No requieren computador. Ejemplos: Meta Quest 2/3, Pico 4.</p>
            <div className="mt-2 bg-white p-3 rounded">
              <p className="text-gray-700 text-sm">
                <span className="font-semibold text-gray-800">Ventajas:</span> Baratos, fáciles de usar, portátiles.
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-semibold text-gray-800">Desventajas:</span> Gráficos limitados, menos potencia.
              </p>
            </div>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600 hover:shadow-xl transition-all hover:-translate-y-1 animate-slideInBottom" style={{animationDelay: "0.2s"}}>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              B) VR para PC (alta calidad)
            </h4>
            <p className="text-gray-700 text-base mb-3">
              Necesitas una PC gamer y un visor compatible (Valve Index, HTC
              Vive, Quest 3 con Link).
            </p>
            <div className="mt-2 bg-white p-3 rounded">
              <p className="text-gray-700 text-sm">
                <span className="font-semibold text-gray-800">Ventajas:</span> Máxima calidad gráfica, mayor precisión.
              </p>
              <p className="text-gray-700 text-sm">
                <span className="font-semibold text-gray-800">Desventajas:</span> Más costoso, requiere espacio.
              </p>
            </div>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600 hover:shadow-xl transition-all hover:-translate-y-1 animate-slideInBottom" style={{animationDelay: "0.3s"}}>
            <h4 className="text-xl font-semibold text-gray-800 mb-2">
              C) VR para consolas
            </h4>
            <p className="text-gray-700 text-base">
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
        <h3 className="text-3xl font-bold text-gray-900 mb-4 animate-fadeIn">
          Requisitos de PC para VR
        </h3>
        <div className="overflow-x-auto animate-scaleIn" style={{animationDelay: "0.1s"}}>
          <table className="w-full border-collapse border border-gray-300 rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">Nivel</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">GPU</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">CPU</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">RAM</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-800">Almacenamiento</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white hover:bg-blue-50 transition-colors">
                <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">Mínimos</td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700">NVIDIA GTX 1060 / AMD RX 580</td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700">i5 6ª gen</td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700">8 GB</td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700">HDD</td>
              </tr>
              <tr className="bg-gray-50 hover:bg-blue-50 transition-colors">
                <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">Recomendados</td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700">NVIDIA RTX 2060 / AMD RX 6700 XT</td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700">i5 10ª gen</td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700">16 GB</td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700">SSD</td>
              </tr>
              <tr className="bg-white hover:bg-blue-50 transition-colors">
                <td className="border border-gray-300 px-4 py-3 font-semibold text-gray-800">Ideales</td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700">NVIDIA RTX 3070+ / AMD 6800 XT+</td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700">i7 12ª gen</td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700">32 GB</td>
                <td className="border border-gray-300 px-4 py-3 text-gray-700">SSD NVMe</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: "recomendaciones",
    title: "Recomendaciones para empezar",
    content: (
      <>
        <h3 className="text-3xl font-bold text-gray-900 mb-6 animate-fadeIn">
          Recomendaciones
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1 animate-slideInBottom" style={{animationDelay: "0.1s"}}>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center text-lg">
              <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-base font-bold">1</span>
              Primer visor
            </h4>
            <p className="text-gray-700 mb-4 text-base leading-relaxed">Meta Quest 3 es la mejor opción calidad/precio para empezar.</p>
            <div className="space-y-2 text-sm">
              <a href="https://www.meta.com/es/quest/quest-3/" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                Ver en Meta.com
              </a>
              <a href="https://www.youtube.com/watch?v=X6I7d3wL3iM" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Video Reseña (EN)
              </a>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1 animate-slideInBottom" style={{animationDelay: "0.2s"}}>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center text-lg">
              <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-base font-bold">2</span>
              Juegos para empezar
            </h4>
            <p className="text-gray-700 mb-4 text-base leading-relaxed">Títulos excelentes para newcomers y veteranos por igual.</p>
            <div className="space-y-1 text-sm">
              <div><strong className="text-gray-800">Beat Saber:</strong> <a href="https://www.meta.com/es/experiences/beat-saber/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Meta Store</a> | <a href="https://store.steampowered.com/app/620980/Beat_Saber/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Steam</a></div>
              <div><strong className="text-gray-800">Superhot VR:</strong> <a href="https://www.meta.com/es/experiences/superhot-vr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Meta Store</a> | <a href="https://store.steampowered.com/app/317500/SUPERHOT_VR/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Steam</a></div>
              <div><strong className="text-gray-800">Half-Life: Alyx:</strong> <a href="https://store.steampowered.com/app/546560/HalfLife_Alyx/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Steam</a></div>
              <div><strong className="text-gray-800">VRChat:</strong> <a href="https://vrchat.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Web Oficial</a></div>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1 animate-slideInBottom" style={{animationDelay: "0.3s"}}>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center text-lg">
              <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-base font-bold">3</span>
              Espacio necesario
            </h4>
            <p className="text-gray-700 mb-4 text-base leading-relaxed">Se recomienda un área de al menos 2x2 metros para una experiencia inmersiva (Roomscale).</p>
            <div className="space-y-2 text-sm">
              <a href="https://www.meta.com/help/quest/articles/headsets-and-accessories/quest-2/set-up-guardian/" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Guía oficial de Meta (Guardian)
              </a>
              <a href="https://www.youtube.com/watch?v=dh1x4S5d3uA" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Cómo configurar tu espacio (Video)
              </a>
            </div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1 animate-slideInBottom" style={{animationDelay: "0.4s"}}>
            <h4 className="font-semibold text-gray-800 mb-3 flex items-center text-lg">
              <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-base font-bold">4</span>
              Salud y Bienestar
            </h4>
            <p className="text-gray-700 mb-4 text-base leading-relaxed">Toma descansos frecuentes. Si te mareas, empieza con juegos estáticos o de asiento.</p>
            <div className="space-y-2 text-sm">
              <a href="https://www.roadtovr.com/what-is-vr-sickness-and-how-can-you-prevent-it/" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Entender y prevenir el mareo por VR
              </a>
              <a href="https://www.uploadvr.com/best-comfortable-vr-games" target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:underline font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                Lista de juegos cómodos para principiantes
              </a>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "desarrollo-vr",
    title: "¿Quieres desarrollar en VR?",
    content: (
      <>
        <h3 className="text-3xl font-bold text-gray-900 mb-4 animate-fadeIn">
          Herramientas de Desarrollo VR
        </h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-blue-600 hover:shadow-xl transition-all hover:-translate-y-1 animate-slideInRight" style={{animationDelay: "0.1s"}}>
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center text-lg">
              <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              Motores de juego
            </h4>
            <p className="text-gray-700 text-base">Unity (más fácil) o Unreal Engine (mejores gráficos).</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-blue-600 hover:shadow-xl transition-all hover:-translate-y-1 animate-slideInRight" style={{animationDelay: "0.2s"}}>
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center text-lg">
              <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </span>
              Librerías VR
            </h4>
            <p className="text-gray-700 text-base">Meta XR SDK, SteamVR Plugin, OpenXR (estándar moderno).</p>
          </div>
          <div className="bg-gray-50 p-5 rounded-lg border-l-4 border-blue-600 hover:shadow-xl transition-all hover:-translate-y-1 animate-slideInRight" style={{animationDelay: "0.3s"}}>
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center text-lg">
              <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              </span>
              Modelado 3D
            </h4>
            <p className="text-gray-700 text-base">Blender (gratuito y potente) o Maya (profesional).</p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: "mas-informacion",
    title: "Más Información y Fuentes",
    content: (
      <>
        <h3 className="text-3xl font-bold text-gray-900 mb-4 animate-fadeIn">
          Fuentes Confiables y Recursos Adicionales
        </h3>
        <p className="mb-6 text-gray-700 leading-relaxed animate-slideInLeft text-base">
          Para profundizar en el mundo de la Realidad Virtual, te recomendamos consultar las siguientes fuentes, que son líderes en la industria y la academia:
        </p>
        <ul className="space-y-4">
          <li className="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1 animate-slideInLeft" style={{animationDelay: "0.1s"}}>
            <strong className="text-gray-800 text-lg">Documentación Oficial de Meta Quest:</strong>
            <p className="text-sm text-gray-600 mt-1">La fuente principal de información sobre el ecosistema de Quest para desarrolladores y curiosos.</p>
            <a href="https://developer.oculus.com/documentation/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium inline-flex items-center mt-2">
              developer.oculus.com/documentation
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </li>
          <li className="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1 animate-slideInLeft" style={{animationDelay: "0.2s"}}>
            <strong className="text-gray-800 text-lg">Road to VR & UploadVR:</strong>
            <p className="text-sm text-gray-600 mt-1">Los sitios de noticias más respetados, enfocados exclusivamente en la industria de la Realidad Virtual.</p>
            <div className="flex flex-wrap gap-2 mt-2">
              <a href="https://www.roadtovr.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium inline-flex items-center">
                www.roadtovr.com
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <span className="text-gray-400">|</span>
              <a href="https://www.uploadvr.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium inline-flex items-center">
                www.uploadvr.com
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </li>
          <li className="bg-gray-50 p-5 rounded-lg border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1 animate-slideInLeft" style={{animationDelay: "0.3s"}}>
            <strong className="text-gray-800 text-lg">Google Scholar y IEEE Xplore:</strong>
            <p className="text-sm text-gray-600 mt-1">Para investigación académica, busca artículos con palabras clave como "Virtual Reality in Education", "VR Sickness", etc.</p>
            <a href="https://scholar.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm font-medium inline-flex items-center mt-2">
              scholar.google.com
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </li>
        </ul>
      </>
    ),
  },
];

export default function Home() {
  // --- 2. Estado para manejar la sección activa ---
  const [selectedSection, setSelectedSection] = useState<string>("sobre-vr"); // Volvemos a la sección inicial
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Efecto para manejar la animación de transición
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSectionChange = (sectionId: string) => {
    if (sectionId !== selectedSection) {
      setIsAnimating(true);
      setTimeout(() => {
        setSelectedSection(sectionId);
        setIsAnimating(false);
      }, 300);
    }
  };

  const selectedContent = vrInfo.find((item) => item.id === selectedSection)?.content;

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* El video de fondo - Corregido el nombre del archivo */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className={`${styles.backgroundVideo} ${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
      >
        <source src="/background-video.mp4" type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>

      {/* Overlay oscuro para mejorar la legibilidad del contenido */}
      <div className={`fixed inset-0 bg-black/50 z-0 ${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}></div>

      {/* Elementos decorativos animados */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="fixed bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse" style={{animationDelay: "1s"}}></div>
      <div className="fixed top-1/2 left-1/3 w-16 h-16 bg-cyan-500/20 rounded-full blur-xl animate-pulse" style={{animationDelay: "2s"}}></div>

      {/* El contenido de tu página irá aquí */}
      <div className={`relative z-10 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'} transition-all duration-1000`}>
        {/* Encabezado */}
        <header className="fixed top-0 left-0 w-full bg-white shadow-lg z-30">
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Image src="/UNAL.webp" alt="Logo UNAL" width={40} height={40} className="hover:rotate-12 transition-transform duration-300" />
                <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping"></div>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">
                Centro de Información de Realidad Virtual
              </h1>
            </div>
            
            {/* Botón de "empezar modo VR" que redirige a la página de juegos - Corregida la ruta */}
            <Link 
              href="/games" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-xl"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Empezar modo VR
            </Link>
          </div>
        </header>

        {/* Contenido Principal con Sidebar */}
        <div className="max-w-7xl mx-auto pt-24 px-6 pb-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Menú de Navegación (Sidebar) */}
            <aside className={`w-full md:w-1/4 ${mounted ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'} transition-all duration-700`} style={{transitionDelay: "0.2s"}}>
              <nav className="sticky top-28 bg-white rounded-lg shadow-lg p-4 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  Secciones
                </h2>
                <ul className="space-y-2">
                  {vrInfo.map((item, index) => (
                    <li key={item.id} className={`${mounted ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'} transition-all duration-500`} style={{transitionDelay: `${0.3 + index * 0.1}s`}}>
                      <button
                        onClick={() => handleSectionChange(item.id)}
                        className={`w-full text-left px-4 py-3 rounded-md transition-all duration-300 flex items-center text-base ${
                          selectedSection === item.id
                            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold shadow-md transform scale-105"
                            : "hover:bg-gray-100 text-gray-800 hover:translate-x-1"
                        }`}
                      >
                        <span className={`w-2 h-2 rounded-full mr-2 ${selectedSection === item.id ? "bg-white animate-pulse" : "bg-gray-400"}`}></span>
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Área de Contenido */}
            <div className={`w-full md:w-3/4 ${mounted ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} transition-all duration-700`} style={{transitionDelay: "0.4s"}}>
              <section className={`bg-white rounded-lg shadow-lg p-10 min-h-[60vh] transition-all duration-300 ${
                isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
              }`}>
                {selectedContent ? (
                  <div className="animate-fadeIn">
                    {selectedContent}
                  </div>
                ) : (
                  <div className="text-center text-gray-600">
                    <h3 className="text-xl font-semibold">Bienvenido</h3>
                    <p>
                      Selecciona una sección del menú para ver la información.
                    </p>
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Estilos CSS para las animaciones */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from { 
            opacity: 0;
            transform: translateX(-20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from { 
            opacity: 0;
            transform: translateX(20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInBottom {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slideInBottom {
          animation: slideInBottom 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </main>
  );
}