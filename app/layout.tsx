import type { Metadata } from "next";
import { Zen_Maru_Gothic } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import MobileNavbar from "@/components/MobileNavbar";
import Footer from "@/components/Footer";

const zenMaru = Zen_Maru_Gothic({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Noir Comms",
  description: "Illustration Commissions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <body className={zenMaru.className}>
      <ThemeProvider>
        <Navbar />
        <div className="pb-24 md:pb-0">
          {children}
        </div>
        <Footer />
        <MobileNavbar />
      </ThemeProvider>
    </body>
  </html>
  );
}

