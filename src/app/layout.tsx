import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Artisan Matcha | Pure ritual meets modern movement",
  description: "A premium iced matcha latte experience. Pure ritual meets modern movement.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-[#0B0F08]`}>
        <div className="bg-noise"></div>
        {children}
      </body>
    </html>
  );
}
