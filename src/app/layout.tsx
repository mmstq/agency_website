import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import MasterLayout from "../components/MasterLayout";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Digital Monolith",
  description: "High-end B2B infrastructure platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${manrope.variable} font-inter antialiased bg-[#131313] text-[#e2e2e2]`}
      >
        <MasterLayout>{children}</MasterLayout>
      </body>
    </html>
  );
}
