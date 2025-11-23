import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YOLOv11 Video Counter",
  description: "Sistema de contagem de pessoas e veículos em vídeos usando YOLOv11",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
