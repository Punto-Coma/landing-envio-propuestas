import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BackgroundBeams } from "../components/ui/background-beams";
import Image from "next/image";

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
            <Image
              src={'https://cdn.discordapp.com/icons/1045166944380256286/1ff8554f4291ba9a09c016e41448c9e6.webp?size=100'}
              width={60} 
              height={60} 
              alt="discord server" 
              className="mx-auto absolute top-2 left-2 rounded-xl"
            />
            <Image
              src={'https://assets-global.website-files.com/6257adef93867e50d84d30e2/6257d23c5fb25be7e0b6e220_Open%20Source%20Projects%20_%20Discord-7.svg'}
              width={100} 
              height={60} 
              alt="discord" 
              className="mx-auto absolute top-8 lg:top-4 right-4 "
            />
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
