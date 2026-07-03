'use client';

/**
 * TrustBar — Doğrulanabilir/güvenli güven sinyalleri (sahte sertifika rozeti değil).
 * Gerçek sertifikanız varsa (FSC, ISO vb.) bu listeye logo/rozet olarak ekleyin.
 */
const ITEMS = [
  { icon: '🕒', value: '20+ Yıl', label: 'Sahada Deneyim' },
  { icon: '🏭', value: '5 Sektör', label: 'Perakende, Üretim, Gıda, Ambalaj, Lojistik' },
  { icon: '⚡', value: '48 Saat', label: 'Ön Analiz Yanıt Süresi' },
  { icon: '🔒', value: 'Gizlilik', label: 'NDA ile Çalışma Garantisi' },
  { icon: '📍', value: 'İzmir Merkezli', label: 'Sahada Yerinde Destek' },
];

export default function TrustBar() {
  return (
    <section style={{ fontFamily: "'Manrope', system-ui, sans-serif", background: '#0A0E12', color: '#F2F5F7', padding: '40px 24px', boxSizing: 'border-box', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 36 }}>
        {ITEMS.map((it, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <span style={{ fontSize: 20, lineHeight: 1 }}>{it.icon}</span>
              <div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 15, color: '#F2F5F7', lineHeight: 1.1 }}>{it.value}</div>
                <div style={{ fontSize: 11.5, color: '#7E8B98', marginTop: 2 }}>{it.label}</div>
              </div>
            </div>
            {i < ITEMS.length - 1 && <div style={{ width: 1, height: 30, background: 'rgba(255,255,255,0.08)' }} />}
          </div>
        ))}
      </div>
    </section>
  );
}
