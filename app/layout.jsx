import './globals.css'

export const metadata = {
  title: 'ARD Sistem — Endüstriyel Danışmanlık & Teknoloji',
  description: 'Tedarik zinciri, depo yönetimi, ERP entegrasyonu ve planogram danışmanlığı. İzmir merkezli saha deneyimli danışmanlık.',
  keywords: 'tedarik zinciri, depo yönetimi, ERP entegrasyonu, planogram, WMS, stok yönetimi, İzmir',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  )
}
