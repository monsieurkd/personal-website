import { Geist, Geist_Mono } from "next/font/google";
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
  title: "David Kieu - Software Developer",
  description:
    "David Kieu's personal portfolio showcasing modern web development projects. Experienced in React, Next.js, JavaScript, and responsive design.",
  keywords:
    "David Kieu, software developer, web developer, React, Next.js, JavaScript, portfolio, frontend developer",
  author: "David Kieu",
  openGraph: {
    title: "David Kieu - Software Developer",
    description:
      "David Kieu's personal portfolio showcasing modern web development projects",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
