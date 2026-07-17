import { Navbar } from "@/components/layout/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Casa de Jogos - Os clássicos da infância reunidos em um só lugar.",
  description:
    "Centenas de jogos gratuitos para jogar diretamente no navegador. Sem downloads, sem cadastro, sem complicação. Escolha um jogo e comece a jogar.",
  keywords: [
    "jogos online",
    "jogos gratuitos",
    "games hub",
    "jogos no navegador",
    "jogos sem download",
    "jogos arcade",
    "jogos casa",
    "jogos clássicos",
  ],
  openGraph: {
    title: "Casa de Jogos - Os clássicos da infância reunidos em um só lugar.",
    description:
      "Centenas de jogos gratuitos para jogar diretamente no navegador. Sem downloads, sem cadastro.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Casa de Jogos - Os clássicos da infância reunidos em um só lugar.",
    description:
      "Centenas de jogos gratuitos para jogar diretamente no navegador. Sem downloads, sem cadastro.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background font-sans">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
