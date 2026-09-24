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
      <body className="bg-background-outer text-text-main font-sans antialiased h-[100dvh] w-screen overflow-hidden flex items-center justify-center p-2 sm:p-4 md:p-8">
        <CartProvider>
          <ToastProvider>
            <ClientCartWrapper>
              {/* Main Application Shell */}
              <div className="w-full max-w-[1500px] h-full max-h-[1000px] bg-shell rounded-[var(--radius-shell)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex overflow-hidden relative border border-white/5">
                
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
