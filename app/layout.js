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
  title: "Your Name - Full Stack Developer",
  description: "Passionate full-stack developer creating innovative web applications. Explore my portfolio featuring modern web technologies like React, Next.js, and Node.js.",
  keywords: "full stack developer, web developer, React, Next.js, JavaScript, portfolio",
  author: "Your Name",
  openGraph: {
    title: "Your Name - Full Stack Developer",
    description: "Passionate full-stack developer creating innovative web applications",
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
