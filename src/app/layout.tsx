import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BackgroundBeams } from "./components/ui/background-beams";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "<Punto&Coma/> Propuestas",
  description: "App hecha por y para la comunidad de <Punto&Coma/>",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex min-h-screen flex-col items-center justify-between">
          <div className="min-h-screen w-full rounded-md relative flex flex-col items-center justify-center antialiased">
            <BackgroundBeams className="bg-neutral-950 -z-50"/>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
