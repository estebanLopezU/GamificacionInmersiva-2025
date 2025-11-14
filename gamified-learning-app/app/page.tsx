"use client";
export default function Home() {
  const menuItems = [
    {
      title: "Sobre la VR",
      href: "#",
    },
    {
      title: "Información para acceder a la realidad virtual aumentada",
      href: "#",
    },
    {
      title: "Sistema y equipo de la PC",
      href: "#",
    },
    {
      title: "Recomendaciones",
      href: "#",
    },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Fondo de video */}
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/background-video.mp4.mp4" type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>

      {/* Capa oscura para mejorar legibilidad */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-5"></div>

      {/* Contenido principal */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center p-8 md:p-24 text-white">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-cyan-300 [text-shadow:0_0_10px_theme(colors.cyan.300)]">
            ¡Bienvenidos a la página de gamificación!
          </h1>
          <p className="text-lg text-slate-400 mb-12">
            Explora las siguientes opciones para comenzar tu aventura en la realidad virtual.
          </p>
        </div>

        <nav className="w-full max-w-4xl">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {menuItems.map((item) => (
              <li key={item.title}>
                <a
                  href={item.href}
                  className="block p-6 bg-slate-900/50 border border-pink-500/30 rounded-lg shadow-lg shadow-pink-500/10 hover:border-pink-500/80 hover:shadow-pink-500/30 transition-all duration-300 h-full text-center backdrop-blur-sm"
                >
                  <h2 className="text-xl font-semibold text-pink-400">
                    {item.title}
                  </h2>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </main>
    </div>
  );
}
