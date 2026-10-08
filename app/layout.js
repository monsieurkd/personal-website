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
  metadataBase: new URL("https://david-kieu-personal-website.vercel.app"),
  title: {
    default: "David Kieu — Data Engineer",
    template: "%s · David Kieu",
  },
  description:
    "David Kieu is a data engineer and Computer Science (AI) student at the University of Adelaide, building tested, reproducible data pipelines in Python, SQL, dbt and DuckDB.",
  keywords: [
    "David Kieu",
    "data engineer",
    "data engineering",
    "dbt",
    "DuckDB",
    "Python",
    "SQL",
    "ETL",
    "Adelaide",
    "Python",
    "portfolio",
  ],
  authors: [{ name: "David Kieu" }],
  openGraph: {
    title: "David Kieu — Data Engineer",
    description:
      "Data engineer and CS (AI) student at the University of Adelaide — reproducible pipelines, dbt, DuckDB, Python and SQL.",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "David Kieu — Data Engineer",
    description:
      "Data engineer and CS (AI) student at the University of Adelaide.",
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
