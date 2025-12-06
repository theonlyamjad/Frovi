import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "../components/Header";
import ViewCanvas from "../components/ViewCanvas";
import Footer from "@/components/Footer";

const alpino = localFont({
  src: "../fonts/Alpino-Variable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-alpino",
});

export const metadata: Metadata = {
  title: "Frovi",
  description: "Fresh Drinks for You , made by us ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${alpino.className} overflow-x-hidden bg-yellow-300`}>
        <Header />
        <main>
          {children}
          <ViewCanvas />
        </main>
        <Footer/>
      </body>
    </html>
  );
}
