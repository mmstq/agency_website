import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import MasterLayout from "../components/MasterLayout";
import StyledJsxRegistry from "./registry";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://modall.agency'),
  title: {
    default: "Modall | Digital Monolith Infrastructure",
    template: "%s | Modall"
  },
  description: "High-end B2B technology infrastructure agency building custom web applications, mobile solutions, and AI integrations.",
  openGraph: {
    title: "Modall | Digital Monolith Infrastructure",
    description: "High-end B2B technology infrastructure agency.",
    url: "https://modall.agency",
    siteName: "Modall",
    locale: "en_US",
    type: "website",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${manrope.variable} font-inter antialiased bg-black text-[#e2e2e2]`}
      >
        <StyledJsxRegistry>
          <MasterLayout>
            {children}
          </MasterLayout>
        </StyledJsxRegistry>
      </body>
    </html>
  );
}
