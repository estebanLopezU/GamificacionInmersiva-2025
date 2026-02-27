import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import { AuthProvider } from '../hooks/useAuth';
import VRBackground from '@/components/game/VRBackground';

export const metadata: Metadata = {
  title: "Gamificación Inmersiva UNAL",
  description: "Página de gamificación con Realidad Virtual",
  icons: {
    icon: "/UNAL.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-black overflow-x-hidden">
        <AuthProvider>
          <VRBackground />
          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow flex items-center justify-center">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
