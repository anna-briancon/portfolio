import type { Metadata } from "next"

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
      <body>{children}</body>
    </html>
  )
}
