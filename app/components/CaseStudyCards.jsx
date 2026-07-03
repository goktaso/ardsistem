'use client';
import { useState } from 'react';

/**
 * CaseStudyCards — "Ekibimizin Sahadaki Tecrübesi" vaka kartları.
 * ÖNEMLİ: DATA içindeki vakalar placeholder'dır. Gerçek projelerinizi ekleyin;
 * "Kurucu ekibimizin önceki görevlerinde katkı sağladığı operasyon" çerçevesini koruyun
 * (bkz. bu paketin README'sindeki etik/hukuki not — önceki işveren adına yapılmış işleri
 * "ARD Sistem'in yaptığı proje" gibi sunmayın; NDA'nıza dikkat edin).
 */

const ACCENT = '#26D07C';

const DATA = [
  {
    sector: 'Perakende · 200+ Mağaza', duration: '4 ay', color: '#26D07C',
    title: 'Stok Fazlasının Azaltılması',
    problem: 'Depolarda biriken stok fazlası, artan depolama maliyeti ve nakit akışı baskısı yaratıyordu.',
    solution: 'WMS entegrasyonu ve talep tahmin modeliyle stok seviyeleri gerçek zamanlı optimize edildi; mağaza bazlı sipariş otomasyonu kuruldu.',
    metrics: [{ value: '%28↓', label: 'Stok Fazlası' }, { value: '%19↓', label: 'İade Oranı' }, { value: '4.2sn', label: 'Ort. Senkron' }],
    quote: 'Depo maliyetlerimiz ilk çeyrekte gözle görülür şekilde düştü.', quoteAuthor: 'Operasyon Direktörü',
  },
  {
    sector: 'Üretim & İmalat', duration: '6 ay', color: '#38BDF8',
    title: 'ERP & Üretim Hattı Entegrasyonu',
    problem: 'Üretim planlama ve muhasebe sistemleri ayrı çalışıyor, veriler elle taşınıyor, hata oranı yüksekti.',
    solution: 'Middleware katmanıyla ERP, üretim planlama ve depo sistemleri tek veri akışında birleştirildi; canlı KPI dashboard kuruldu.',
    metrics: [{ value: '%35↑', label: 'Sevkiyat Hızı' }, { value: '%99,4', label: 'Stok Doğruluğu' }, { value: '%22↓', label: 'Manuel İşlem' }],
    quote: '', quoteAuthor: '',
  },
  {
    sector: 'Gıda & FMCG', duration: '3 ay', color: '#F5B301',
    title: 'Planogram & Raf Optimizasyonu',
    problem: 'Raf düzeni ve planogram uyumu şube bazında dağınıktı, satış kaybı fark edilmiyordu.',
    solution: 'Merkezi planogram yönetimi ve şube bazlı uyum raporlaması devreye alındı.',
    metrics: [{ value: '%17↑', label: 'Raf Satışı' }, { value: '%94', label: 'Planogram Uyumu' }, { value: '12', label: 'Şubede Yayın' }],
    quote: '', quoteAuthor: '',
  },
];

export default function CaseStudyCards() {
  const [activeIdx, setActiveIdx] = useState(null);
  const active = activeIdx !== null ? DATA[activeIdx] : null;

  return (
    <section style={{ fontFamily: "'Manrope', system-ui, sans-serif", background: '#0A0E12', color: '#F2F5F7', padding: '72px 24px', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', border: `1px solid ${ACCENT}59`, borderRadius: 99, background: `${ACCENT}12`, color: ACCENT, fontSize: 12, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} />
            Sahadaki Tecrübe
          </div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 'clamp(28px,4vw,42px)', lineHeight: 1.1, margin: '0 0 16px', letterSpacing: '-0.02em' }}>Ekibimizin Sahadaki Tecrübesi</h2>
          <p style={{ margin: 0, color: '#9BA6B2', fontSize: 16, lineHeight: 1.6 }}>İddia değil, sonuç. Kurucu ekibimizin önceki görevlerinde katkı sağladığı operasyonlardan gerçek metrikler.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 22 }}>
          {DATA.map((c, i) => (
            <button key={i} type="button" onClick={() => setActiveIdx(i)} style={{ textAlign: 'left', display: 'block', width: '100%', boxSizing: 'border-box', background: '#12181F', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 26, cursor: 'pointer', fontFamily: "'Manrope', sans-serif" }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: c.color }}>{c.sector}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#5C6B78' }}>{c.duration}</span>
              </div>
              <div style={{ textAlign: 'left', color: '#C4CDD6', fontSize: 14.5, lineHeight: 1.55, marginBottom: 22, minHeight: 66 }}>{c.problem}</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginBottom: 20 }}>
                {c.metrics.map((m, j) => (
                  <div key={j} style={{ textAlign: 'center', padding: '12px 6px', borderRadius: 12, background: 'rgba(255,255,255,0.03)' }}>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 20, color: c.color }}>{m.value}</div>
                    <div style={{ fontSize: 11, color: '#6E7C89', marginTop: 5, lineHeight: 1.3 }}>{m.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ color: '#7E8B98', fontSize: 13, fontWeight: 600 }}>Vaka detayı</span>
                <span style={{ color: c.color, fontSize: 18 }}>↗</span>
              </div>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(6,8,10,0.72)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, zIndex: 100 }} onClick={() => setActiveIdx(null)}>
            <div style={{ background: '#12181F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 38, maxWidth: 560, width: '100%', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: active.color, marginBottom: 8 }}>{active.sector}</div>
                  <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 22, margin: 0 }}>{active.title}</h3>
                </div>
                <button type="button" onClick={() => setActiveIdx(null)} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#9BA6B2', width: 34, height: 34, borderRadius: 10, fontSize: 18, cursor: 'pointer', flexShrink: 0 }}>×</button>
              </div>
              <div style={{ color: '#9BA6B2', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>SORUN</div>
              <p style={{ color: '#C4CDD6', fontSize: 15, lineHeight: 1.6, margin: '0 0 18px' }}>{active.problem}</p>
              <div style={{ color: '#9BA6B2', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>ÇÖZÜM</div>
              <p style={{ color: '#C4CDD6', fontSize: 15, lineHeight: 1.6, margin: '0 0 22px' }}>{active.solution}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginBottom: 22 }}>
                {active.metrics.map((m, j) => (
                  <div key={j} style={{ textAlign: 'center', padding: '14px 8px', borderRadius: 12, background: 'rgba(255,255,255,0.04)' }}>
                    <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 22, color: active.color }}>{m.value}</div>
                    <div style={{ fontSize: 11.5, color: '#6E7C89', marginTop: 5 }}>{m.label}</div>
                  </div>
                ))}
              </div>
              {active.quote && (
                <div style={{ borderLeft: `3px solid ${active.color}`, paddingLeft: 16, marginBottom: 16 }}>
                  <p style={{ color: '#E5EAEF', fontSize: 14.5, fontStyle: 'italic', lineHeight: 1.6, margin: '0 0 8px' }}>"{active.quote}"</p>
                  <div style={{ color: '#6E7C89', fontSize: 12.5, fontWeight: 600 }}>{active.quoteAuthor}</div>
                </div>
              )}
              <p style={{ color: '#5C6B78', fontSize: 12, lineHeight: 1.6, margin: '16px 0 0', paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>Kurucu ekibimizin önceki görevlerinde katkı sağladığı bir operasyondan aktarılmıştır.</p>
            </div>
          </div>
        )}

        <p style={{ textAlign: 'center', color: '#5C6B78', fontSize: 12.5, marginTop: 30 }}>*Kurucu ekibimizin önceki görevlerinde yer aldığı operasyonlardan derlenmiştir; şirket ve müşteri isimleri gizlilik gereği verilmemiştir.</p>
      </div>
    </section>
  );
}
