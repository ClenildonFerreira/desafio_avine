import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TodoProvider } from "./context/TodoContext"; // 👈 importa o provider

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ToDoList Avine",
  description: "Desafio para Vaga de Jr na Avine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt_BR" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-base-100 min-h-screen`}
      >
        <TodoProvider>
          {children}
        </TodoProvider>
      </body>
    </html>
  );
}