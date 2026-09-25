import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import ToastProvider from "@/components/ToastProvider";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ClientCartWrapper from "@/components/ClientCartWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "GAMEVERSE - Premium Digital Store",
  description: "Rebuilt to match the exact design reference.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="bg-shell text-text-main font-sans antialiased h-[100dvh] w-screen overflow-hidden flex">
        <CartProvider>
          <ToastProvider>
            <ClientCartWrapper>
              {/* Main Application Shell */}
              <div className="w-full h-full bg-shell flex overflow-hidden relative">
                
                <Sidebar />
                
                <div className="flex-1 flex flex-col relative overflow-hidden bg-shell">
                  <Header />
                  <main className="flex-1 overflow-y-auto custom-scrollbar relative">
                    {children}
                  </main>
                </div>

              </div>
            </ClientCartWrapper>
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
