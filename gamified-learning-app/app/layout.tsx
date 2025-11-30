import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import { AuthProvider } from '../hooks/useAuth';

export const metadata: Metadata = {
  title: "Gamificación Inmersiva UNAL",
  description: "Página de gamificación con Realidad Virtual",
  icons: {
    icon: "/UNAL.webp", // La ruta debe coincidir con el archivo en la carpeta 'public'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased">
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
