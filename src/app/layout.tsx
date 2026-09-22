import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/cart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const rajdhani = Rajdhani({ 
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-rajdhani" 
});

export const metadata: Metadata = {
  title: "SP Game Loot - Premium Digital Games",
  description: "Your ultimate destination for premium digital games. Buy action, adventure, RPGs, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${rajdhani.variable}`}>
      <body className="bg-primary text-light font-sans antialiased min-h-screen flex flex-col">
        <CartProvider>
          <ToastProvider>
            <Navbar />
            <main className="flex-grow pt-20">
              {children}
            </main>
            <Footer />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
