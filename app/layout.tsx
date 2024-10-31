import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import LoadingScreen from "./components/LoadingScreen"
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Anna Briançon",
  description: "Portfolio de Anna Briançon",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}
      >
        <LoadingScreen />
        {children}
      </body>
    </html>
  )
}