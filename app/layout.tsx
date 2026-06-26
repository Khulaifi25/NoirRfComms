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
  metadataBase: new URL("https://noirsrfcomms.vercel.app"),
  title: "NoirRf Comms",
  description: "This is the official website commission of illustrator NoirRf.\n\n『こちらはイラストレーターNoirRf氏による公式ウェブサイトの依頼作品です。』",

  openGraph: {
    title: "NoirRf Comms Official Website",
    description:
      "This is the official website commission of illustrator NoirRf.\n\n『こちらはイラストレーターNoirRf氏による公式ウェブサイトの依頼作品です。』",
    url: "https://noirsrfcomms.vercel.app",
    siteName: "NoirRf Comms",

    images: [
      {
        url: "https://noirsrfcomms.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NoirRf Comms",
      },
    ],

    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "NoirRf Comms Official Website",
    description: "This is the official website commission of illustrator NoirRf.\n\n『こちらはイラストレーターNoirRf氏による公式ウェブサイトの依頼作品です。』",
    images: ["https://noirsrfcomms.vercel.app/og-image.jpg"],
  },
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

