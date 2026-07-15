import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://davidkieu.dev"),
  title: {
    default: "David Kieu — Software Engineer",
    template: "%s · David Kieu",
  },
  description:
    "David Kieu is a software engineer and Computer Science student at the University of Adelaide, working across full-stack development, computer vision, and game development.",
  keywords: [
    "David Kieu",
    "software engineer",
    "full-stack developer",
    "computer vision",
    "React",
    "Next.js",
    "Python",
    "portfolio",
  ],
  authors: [{ name: "David Kieu" }],
  openGraph: {
    title: "David Kieu — Software Engineer",
    description:
      "Software engineer and CS student at the University of Adelaide — full-stack, computer vision, and game development.",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "David Kieu — Software Engineer",
    description:
      "Software engineer and CS student at the University of Adelaide.",
  },
};

// Apply the saved/system theme before first paint to avoid a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&m)){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
