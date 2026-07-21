import './globals.css'

const SITE_URL = 'https://ardsistem.net.tr'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'ARD Sistem — Endüstriyel Danışmanlık & Teknoloji',
  description: 'Tedarik zinciri, depo yönetimi, ERP entegrasyonu ve planogram danışmanlığı. İzmir merkezli saha deneyimli danışmanlık.',
  keywords: 'tedarik zinciri, depo yönetimi, ERP entegrasyonu, planogram, WMS, stok yönetimi, FSC danışmanlık, İzmir',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'ARD Sistem',
    title: 'ARD Sistem — Endüstriyel Danışmanlık & Teknoloji',
    description: 'Tedarik zincirinden depoya, üretim planlamadan ERP entegrasyonuna — operasyonlarınızı gerçek veriyle yönetin. İzmir merkezli, sahada 20+ yıl.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'ARD Sistem' }],
    locale: 'tr_TR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ARD Sistem — Endüstriyel Danışmanlık & Teknoloji',
    description: 'Tedarik zinciri, depo yönetimi, ERP entegrasyonu ve FSC uyum danışmanlığı. İzmir merkezli.',
    images: ['/og-image.png'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'ARD Sistem',
  url: SITE_URL,
  image: `${SITE_URL}/og-image.png`,
  logo: `${SITE_URL}/ard_logo11.png`,
  description: 'Tedarik zinciri, depo ve stok yönetimi, üretim planlama, raporlama/iş zekası, ERP entegrasyonu, planogram ve FSC denetim uyumu danışmanlığı.',
  telephone: '+90-532-302-02-50',
  email: 'ozaygoktas@ardsistem.net.tr',
  address: { '@type': 'PostalAddress', addressLocality: 'İzmir', addressCountry: 'TR' },
  areaServed: 'TR',
  openingHours: 'Mo-Fr 09:00-18:00',
  founder: { '@type': 'Person', name: 'Özay Göktaş' },
  knowsAbout: [
    'Tedarik Zinciri Yönetimi', 'Depo ve Stok Yönetimi', 'Üretim Planlama',
    'Raporlama ve İş Zekası', 'ERP Entegrasyonu', 'Planogram Yönetimi', 'FSC Denetim Uyumu',
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Manrope:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
