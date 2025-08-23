import { Geist, Geist_Mono } from "next/font/google";
import { unbounded, mplus2 } from "./fonts";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "OneShade - Fashion Redefined",
  description: "Experience premium fashion with OneShade's curated collection.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${unbounded.variable} ${mplus2.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
