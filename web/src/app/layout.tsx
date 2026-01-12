import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Header, Footer } from "@/components/layout";

export const metadata: Metadata = {
  title: "Meridian DEX",
  description: "Liquidity protocol. No custodians. No apologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
