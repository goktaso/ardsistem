export const metadata = {
  title: 'Çerez Politikası — ARD Sistem',
  description: 'ARD Sistem web sitesi çerez kullanımına ilişkin bilgilendirme.',
  alternates: { canonical: '/cerez-politikasi' },
}

const S = {
  h2: { fontSize: 18, fontWeight: 800, color: '#f1f5f9', margin: '32px 0 12px' },
  p: { fontSize: 14.5, lineHeight: 1.8, color: '#94a3b8', margin: '0 0 14px' },
  li: { fontSize: 14.5, lineHeight: 1.8, color: '#94a3b8', marginBottom: 6 },
}

export default function CerezPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#05080f', padding: '60px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <a href="/" style={{ color: '#f97316', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>← Ana Sayfa</a>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#fff', margin: '24px 0 8px' }}>Çerez Politikası</h1>
        <p style={{ ...S.p, fontSize: 13, color: '#64748b' }}>Son güncelleme: 21 Temmuz 2026</p>

        <h2 style={S.h2}>1. Birinci Taraf Çerezler</h2>
        <p style={S.p}>
          ardsistem.net.tr, kendi adına hiçbir çerez (cookie) kullanmaz; analitik, reklam veya izleme
          çerezi barındırmaz. Sitede üyelik, oturum veya form sistemi bulunmadığından tarayıcınıza
          birinci taraf çerez yerleştirilmez.
        </p>

        <h2 style={S.h2}>2. Üçüncü Taraf İçerikler</h2>
        <p style={S.p}>Sitede aşağıdaki üçüncü taraf servisler kullanılır:</p>
        <ul style={{ paddingLeft: 20 }}>
          <li style={S.li}>
            <strong style={{ color: '#cbd5e1' }}>Google Fonts:</strong> Yazı tiplerinin yüklenmesi için
            tarayıcınız Google sunucularına istek gönderir; bu istekte IP adresiniz Google&apos;a iletilir.
            Bu servis çerez yerleştirmez.
          </li>
          <li style={S.li}>
            <strong style={{ color: '#cbd5e1' }}>YouTube (gizlilik modu):</strong> Tanıtım videosu,
            çerezleri asgariye indiren youtube-nocookie.com alan adı üzerinden gömülüdür. Videoyu
            oynattığınızda YouTube kendi politikasına tabi olarak yerel depolama kullanabilir.
          </li>
        </ul>

        <h2 style={S.h2}>3. Çerezleri Yönetme</h2>
        <p style={S.p}>
          Tarayıcınızın ayarlarından çerezleri dilediğiniz zaman engelleyebilir veya silebilirsiniz.
          Bu sitenin işleyişi çerezlere bağlı olmadığından, çerezleri engellemeniz site deneyiminizi etkilemez.
        </p>

        <h2 style={S.h2}>4. İletişim</h2>
        <p style={S.p}>
          Sorularınız için: <a href="mailto:ozaygoktas@ardsistem.net.tr" style={{ color: '#f97316' }}>ozaygoktas@ardsistem.net.tr</a>
          {' '}· Kişisel verilerinizle ilgili detaylar için <a href="/kvkk" style={{ color: '#f97316' }}>KVKK Aydınlatma Metni</a>&apos;ne bakınız.
        </p>
      </div>
    </main>
  )
}
