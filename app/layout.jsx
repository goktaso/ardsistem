import './globals.css'

export const metadata = {
  title: 'ARD Sistem — Endüstriyel Danışmanlık & Teknoloji',
  description: 'Tedarik zinciri, depo yönetimi, ERP entegrasyonu ve planogram danışmanlığı. İzmir merkezli saha deneyimli danışmanlık.',
  keywords: 'tedarik zinciri, depo yönetimi, ERP entegrasyonu, planogram, WMS, stok yönetimi, İzmir',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
