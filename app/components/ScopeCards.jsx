'use client';

/**
 * ScopeCards — Fiyat yerine 3 seviyeli kapsam kartı (Keşif / Uygulama / Dönüşüm).
 * Bilinçli olarak sabit fiyat yazmaz — B2B danışmanlıkta kapsam projeye göre değişir.
 */

const TIERS = [
  { key: 'kesif', name: 'Keşif', color: '#F2F5F7', featured: false,
    desc: 'Nereden başlayacağınızı bilmiyorsanız ilk adım.',
    features: ['48 saat içinde ücretsiz ön analiz', 'Operasyonunuzda 3 öncelikli alan tespiti', 'Yazılı özet rapor', 'Taahhüt yok'],
    cta: 'Ücretsiz analiz talep et', msg: 'Merhaba, ücretsiz ön analiz / keşif görüşmesi talep etmek istiyorum.' },
  { key: 'uygulama', name: 'Uygulama', color: '#26D07C', featured: true,
    desc: 'Tek bir alanda somut, ölçülebilir iyileştirme.',
    features: ['Tek modül entegrasyonu (WMS / ERP / planlama)', 'Proje bazlı kapsam ve süre', 'Uygulama sonrası KPI takibi', 'Kapsamınıza özel teklif'],
    cta: 'Kapsamımı görüşmek istiyorum', msg: 'Merhaba, tek modül (WMS/ERP/planlama) uygulama kapsamını görüşmek istiyorum.' },
  { key: 'donusum', name: 'Dönüşüm', color: '#38BDF8', featured: false,
    desc: 'Uçtan uca operasyonel dönüşüm ortaklığı.',
    features: ['Tedarik + depo + ERP + raporlama bütünleşik', 'Uzun vadeli danışmanlık ortaklığı', 'Sürekli optimizasyon ve destek', 'Kurumunuza özel yol haritası'],
    cta: 'Ortaklık görüşmesi talep et', msg: 'Merhaba, uçtan uca operasyonel dönüşüm için görüşme talep ediyorum.' },
];

const WA_NUMBER = '905323020250';

export default function ScopeCards() {
  return (
    <section style={{ fontFamily: "'Manrope', system-ui, sans-serif", background: 'radial-gradient(1000px 500px at 50% -10%, rgba(38,208,124,0.08), transparent 60%), #0A0E12', color: '#F2F5F7', padding: '72px 24px', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', border: '1px solid rgba(38,208,124,0.35)', borderRadius: 99, background: 'rgba(38,208,124,0.07)', color: '#26D07C', fontSize: 12, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#26D07C', boxShadow: '0 0 10px #26D07C' }} />
            Nereden Başlarım?
          </div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 'clamp(28px,4vw,42px)', lineHeight: 1.1, margin: '0 0 16px', letterSpacing: '-0.02em' }}>İhtiyacınıza uygun kapsamı seçin</h2>
          <p style={{ margin: 0, color: '#9BA6B2', fontSize: 16, lineHeight: 1.6 }}>Her operasyon farklı büyüklükte. Size özel teklif için önce birlikte doğru kapsamı belirleyelim.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 22, alignItems: 'stretch' }}>
          {TIERS.map((t) => (
            <div key={t.key} style={{ position: 'relative', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', background: t.featured ? 'linear-gradient(160deg,#14201A 0%,#101820 60%)' : '#12181F', border: `1px solid ${t.featured ? 'rgba(38,208,124,0.35)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 22, padding: '32px 28px' }}>
              {t.featured && (
                <div style={{ position: 'absolute', top: -13, left: '50%', transform: 'translateX(-50%)', background: '#26D07C', color: '#06210F', fontSize: 11.5, fontWeight: 700, letterSpacing: '.04em', padding: '5px 14px', borderRadius: 99 }}>EN ÇOK TERCİH EDİLEN</div>
              )}
              <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 8 }}>{t.name}</div>
              <div style={{ color: '#9BA6B2', fontSize: 14, lineHeight: 1.55, marginBottom: 22, minHeight: 44 }}>{t.desc}</div>
              <div style={{ flex: 1, marginBottom: 24 }}>
                {t.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 11 }}>
                    <span style={{ color: t.color, fontSize: 14, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <span style={{ color: '#C4CDD6', fontSize: 14, lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(t.msg)}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '15px 20px', borderRadius: 14, background: t.featured ? t.color : 'rgba(255,255,255,0.05)', border: t.featured ? 'none' : '1px solid rgba(255,255,255,0.12)', color: t.featured ? '#06210F' : '#E5EAEF', fontWeight: 700, fontSize: 14.5, textDecoration: 'none' }}>{t.cta}</a>
            </div>
          ))}
        </div>
        <p style={{ textAlign: 'center', color: '#5C6B78', fontSize: 13, marginTop: 30 }}>Sabit paket fiyatı yoktur — kapsam, keşif görüşmesinde operasyonunuza göre netleşir.</p>
      </div>
    </section>
  );
}
