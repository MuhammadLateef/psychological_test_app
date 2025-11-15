import React, { Suspense } from "react"
import { Inter, Fira_Code } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"

// Load fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const fira = Fira_Code({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata = {
  title: "physcological App",
  description: "Created with physcological App",
  generator: "physcological.app",
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${fira.variable} antialiased`}
    >
      <head>
        {/* ✅ Move theme script here using Next.js Script */}
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              try {
                const ls = localStorage.getItem('theme');
                const mql = window.matchMedia('(prefers-color-scheme: dark)');
                const theme = ls || (mql.matches ? 'dark' : 'light');
                const root = document.documentElement;
                if (theme === 'dark') root.classList.add('dark');
                else root.classList.remove('dark');
              } catch (e) {}
            })();
          `}
        </Script>
      </head>
      <body className="font-sans bg-background text-foreground">
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
