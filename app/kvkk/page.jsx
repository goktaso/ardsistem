export const metadata = {
  title: 'KVKK Aydınlatma Metni — ARD Sistem',
  description: 'ARD Sistem kişisel verilerin korunması ve işlenmesine ilişkin aydınlatma metni.',
  alternates: { canonical: '/kvkk' },
}

const S = {
  h2: { fontSize: 18, fontWeight: 800, color: '#f1f5f9', margin: '32px 0 12px' },
  p: { fontSize: 14.5, lineHeight: 1.8, color: '#94a3b8', margin: '0 0 14px' },
  li: { fontSize: 14.5, lineHeight: 1.8, color: '#94a3b8', marginBottom: 6 },
}

export default function KvkkPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#05080f', padding: '60px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <a href="/" style={{ color: '#f97316', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>← Ana Sayfa</a>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: '#fff', margin: '24px 0 8px' }}>
          Kişisel Verilerin Korunması ve İşlenmesi Aydınlatma Metni
        </h1>
        <p style={{ ...S.p, fontSize: 13, color: '#64748b' }}>Son güncelleme: 21 Temmuz 2026</p>

        <h2 style={S.h2}>1. Veri Sorumlusu</h2>
        <p style={S.p}>
          6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca kişisel verileriniz,
          veri sorumlusu sıfatıyla ARD Sistem — Özay Göktaş (İzmir, Türkiye; &quot;ARD Sistem&quot;)
          tarafından aşağıda açıklanan kapsamda işlenmektedir.
        </p>

        <h2 style={S.h2}>2. İşlenen Kişisel Veriler ve Toplama Yöntemi</h2>
        <p style={S.p}>
          Web sitemiz üyelik veya form doldurma zorunluluğu içermez. Kişisel verileriniz yalnızca
          sizin tercihinizle, aşağıdaki kanallardan bize ulaştığınızda işlenir:
        </p>
        <ul style={{ paddingLeft: 20 }}>
          <li style={S.li}>WhatsApp üzerinden mesaj gönderdiğinizde: ad-soyad, telefon numarası ve mesaj içeriği</li>
          <li style={S.li}>E-posta gönderdiğinizde: ad-soyad, e-posta adresi ve mesaj içeriği</li>
          <li style={S.li}>Telefonla aradığınızda: telefon numarası ve görüşme kapsamında paylaştığınız bilgiler</li>
        </ul>
        <p style={S.p}>
          Sitedeki tasarruf hesaplayıcı ve olgunluk testi araçlarına girdiğiniz değerler tarayıcınızda
          kalır; siz bir iletişim kanalıyla paylaşmadıkça tarafımıza iletilmez ve kaydedilmez.
        </p>

        <h2 style={S.h2}>3. İşleme Amaçları ve Hukuki Sebep</h2>
        <p style={S.p}>
          Kişisel verileriniz; talebinizin yanıtlanması, danışmanlık hizmeti teklifinin hazırlanması ve
          iletişimin yürütülmesi amaçlarıyla, KVKK m.5/2(c) &quot;bir sözleşmenin kurulması veya ifasıyla
          doğrudan doğruya ilgili olması&quot; ve m.5/2(f) &quot;meşru menfaat&quot; hukuki sebeplerine dayanılarak işlenir.
        </p>

        <h2 style={S.h2}>4. Aktarım</h2>
        <p style={S.p}>
          Kişisel verileriniz üçüncü kişilere satılmaz ve pazarlama amacıyla paylaşılmaz. WhatsApp üzerinden
          iletişim kurmanız hâlinde verileriniz WhatsApp LLC&apos;nin (Meta) kendi gizlilik politikasına tabi
          olarak yurt dışındaki sunucularında işlenebilir.
        </p>

        <h2 style={S.h2}>5. Saklama Süresi</h2>
        <p style={S.p}>
          İletişim kayıtları, talebin sonuçlanmasından itibaren makul süre boyunca; sözleşme ilişkisi kurulması
          hâlinde ilgili mevzuattaki zamanaşımı süreleri boyunca saklanır ve süre sonunda silinir.
        </p>

        <h2 style={S.h2}>6. KVKK m.11 Kapsamındaki Haklarınız</h2>
        <ul style={{ paddingLeft: 20 }}>
          <li style={S.li}>Kişisel verilerinizin işlenip işlenmediğini öğrenme ve bilgi talep etme</li>
          <li style={S.li}>İşleme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme</li>
          <li style={S.li}>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
          <li style={S.li}>KVKK m.7 çerçevesinde silinmesini veya yok edilmesini isteme</li>
          <li style={S.li}>İşlemenin münhasıran otomatik sistemlerle analizi sonucu aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
          <li style={S.li}>Kanuna aykırı işleme sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
        </ul>
        <p style={S.p}>
          Başvurularınızı <a href="mailto:ozaygoktas@ardsistem.net.tr" style={{ color: '#f97316' }}>ozaygoktas@ardsistem.net.tr</a> adresine
          iletebilirsiniz. Başvurular en geç 30 gün içinde ücretsiz olarak sonuçlandırılır.
        </p>
      </div>
    </main>
  )
}
