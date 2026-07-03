'use client';
import { useState } from 'react';

/**
 * ERPFlowDiagram — İnteraktif middleware veri akışı diyagramı.
 * 3 giriş kaynağı (WMS, Üretim, Muhasebe) → ARD Middleware → 3 çıktı (ERP, BI, Mobil).
 * Herhangi bir düğüme tıklandığında sağ panel o katmanın detayını gösterir.
 */

const ACCENT = '#38BDF8';

const NODES = {
  wms: { icon: '📦', label: 'WMS / Depo', title: 'Depo Yönetim Sistemi', tag: 'KAYNAK · GİRİŞ',
    desc: 'Depodaki stok hareketleri, sayım verileri ve sevkiyat kayıtları anlık olarak middleware’e akar.',
    points: ['Barkod/RF okutmalarından canlı stok güncelleme', 'Sayım farklarının otomatik raporlanması', 'Sevkiyat verisinin ERP’ye anlık yansıması'] },
  uretim: { icon: '🏭', label: 'Üretim Planlama', title: 'Üretim Planlama Sistemi', tag: 'KAYNAK · GİRİŞ',
    desc: 'Üretim hattındaki kapasite, iş emri ve OEE verileri middleware üzerinden merkezi sisteme aktarılır.',
    points: ['İş emri durumunun gerçek zamanlı takibi', 'Kapasite/OEE verisinin otomatik toplanması', 'Hammadde tüketiminin depo verisiyle eşleşmesi'] },
  muhasebe: { icon: '🧾', label: 'Muhasebe', title: 'Muhasebe / Finans Sistemi', tag: 'KAYNAK · GİRİŞ',
    desc: 'Fatura, maliyet ve stok değerleme verileri elle taşınmadan doğrudan finans sistemine işlenir.',
    points: ['Stok değerlemesinin otomatik güncellenmesi', 'Fatura-sevkiyat eşleşmesinin doğrulanması', 'Manuel veri girişi hatalarının ortadan kalkması'] },
  core: { icon: '⚙️', label: 'ARD Middleware', title: 'ARD Middleware', tag: 'MERKEZ KATMAN',
    desc: 'Tüm kaynaklardan gelen veriyi standartlaştırır, doğrular ve tek bir gerçek zamanlı veri akışında birleştirir.',
    points: ['Veri formatı standardizasyonu ve doğrulama', 'Kural bazlı otomasyon (eşikler, uyarılar)', 'Tüm sistemler arası çift yönlü senkronizasyon'] },
  erp: { icon: '🗄️', label: 'ERP', title: 'ERP Sistemi', tag: 'ÇIKTI',
    desc: 'Standartlaştırılmış veri, kurumsal ERP’nizde güncel ve tutarlı şekilde görünür.',
    points: ['Modüller arası tutarlı veri seti', 'Manuel senkronizasyon ihtiyacının ortadan kalkması', 'Denetime hazır kayıt izlenebilirliği'] },
  bi: { icon: '📊', label: 'Raporlama & BI', title: 'Raporlama & İş Zekası', tag: 'ÇIKTI',
    desc: 'Yöneticiler için canlı KPI dashboard’ları ve otomatik raporlar üretilir.',
    points: ['Gerçek zamanlı KPI dashboard’ları', 'Otomatik periyodik raporlama', 'Anomali/eşik aşımı uyarıları'] },
  saha: { icon: '📱', label: 'Saha & Mobil', title: 'Saha / Mobil Uygulamalar', tag: 'ÇIKTI',
    desc: 'Saha ekipleri güncel veriye mobil üzerinden anlık erişir ve veri girer.',
    points: ['Sahadan anlık veri girişi', 'Yöneticiye push bildirimler', 'Çevrimdışı çalışıp senkron olabilme'] },
};

export default function ERPFlowDiagram() {
  const [activeKey, setActiveKey] = useState('wms');
  const active = NODES[activeKey];
  const isCore = activeKey === 'core';

  const nodeBtnStyle = (key) => {
    const on = activeKey === key;
    return { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '16px 10px', borderRadius: 16, border: `1px solid ${on ? ACCENT : 'rgba(255,255,255,0.09)'}`, background: on ? ACCENT + '1a' : 'rgba(255,255,255,0.02)', color: on ? '#F2F5F7' : '#9BA6B2', cursor: 'pointer', fontFamily: "'Manrope', sans-serif", transition: 'all .15s', textAlign: 'center' };
  };
  const outBoxStyle = (key, color) => ({ textAlign: 'center', padding: '14px 8px', borderRadius: 14, border: `1px solid ${activeKey === key ? color : 'rgba(255,255,255,0.08)'}`, background: activeKey === key ? color + '14' : 'rgba(255,255,255,0.02)', cursor: 'pointer', transition: 'all .15s' });

  const lineColor0 = activeKey === 'wms' || isCore ? ACCENT : 'rgba(255,255,255,0.13)';
  const lineColor1 = activeKey === 'uretim' || isCore ? ACCENT : 'rgba(255,255,255,0.13)';
  const lineColor2 = activeKey === 'muhasebe' || isCore ? ACCENT : 'rgba(255,255,255,0.13)';
  const lineColorOut = ['erp', 'bi', 'saha'].includes(activeKey) || isCore ? ACCENT : 'rgba(255,255,255,0.13)';

  const outputs = [
    { key: 'erp', value: 'ERP', color: ACCENT, label: 'Kurumsal Sistem' },
    { key: 'bi', value: 'BI', color: '#26D07C', label: 'Canlı Raporlama' },
    { key: 'saha', value: 'Mobil', color: '#F5B301', label: 'Saha Ekipleri' },
  ];

  return (
    <section style={{ fontFamily: "'Manrope', system-ui, sans-serif", background: 'radial-gradient(1000px 520px at 50% -8%, rgba(56,189,248,0.08), transparent 60%), #0A0E12', color: '#F2F5F7', padding: '72px 24px', boxSizing: 'border-box' }}>
      <style>{`
        @media (max-width: 860px) {
          .ard-erp-grid { grid-template-columns: 1fr !important; }
          .ard-erp-detail { position: static !important; }
        }
      `}</style>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 20px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', border: '1px solid rgba(56,189,248,0.35)', borderRadius: 99, background: 'rgba(56,189,248,0.07)', color: ACCENT, fontSize: 12, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} />
            Nasıl Çalışır
          </div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 'clamp(28px,4vw,42px)', lineHeight: 1.1, margin: '0 0 16px', letterSpacing: '-0.02em' }}>Dağınık sistemleri tek veri akışında birleştiriyoruz</h2>
          <p style={{ margin: 0, color: '#9BA6B2', fontSize: 16, lineHeight: 1.6 }}>ARD Middleware; depo, üretim, muhasebe ve ERP sisteminizin arasında gerçek zamanlı köprü kurar. Bir katmana dokunun, ne yaptığını görün.</p>
        </div>

        <div className="ard-erp-grid" style={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 24, alignItems: 'start', marginTop: 44 }}>
          <div style={{ background: '#10151B', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '36px 28px', boxSizing: 'border-box', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
              {['wms', 'uretim', 'muhasebe'].map((k) => (
                <button key={k} type="button" onClick={() => setActiveKey(k)} style={nodeBtnStyle(k)}>
                  <span style={{ fontSize: 22 }}>{NODES[k].icon}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 600 }}>{NODES[k].label}</span>
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', height: 90, margin: '0 -4px' }}>
              <svg width="100%" height="90" viewBox="0 0 600 90" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
                <path d="M 100 0 L 100 30 Q 100 45 115 45 L 285 45 Q 300 45 300 60 L 300 90" fill="none" stroke={lineColor0} strokeWidth="2.5" />
                <path d="M 300 0 L 300 90" fill="none" stroke={lineColor1} strokeWidth="2.5" />
                <path d="M 500 0 L 500 30 Q 500 45 485 45 L 315 45 Q 300 45 300 60" fill="none" stroke={lineColor2} strokeWidth="2.5" />
              </svg>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '16px 26px', borderRadius: 18, border: `1.5px solid ${isCore ? ACCENT : ACCENT + '55'}`, background: isCore ? ACCENT + '1a' : 'rgba(56,189,248,0.06)', boxShadow: `0 0 0 6px ${ACCENT}0d` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
                  <span style={{ fontSize: 20 }}>⚙️</span>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15 }}>ARD Middleware</span>
                </div>
                <div style={{ fontSize: 11.5, color: '#7E8B98' }}>Gerçek zamanlı veri köprüsü</div>
              </div>
            </div>

            <div style={{ position: 'relative', height: 70, margin: '0 -4px' }}>
              <svg width="100%" height="70" viewBox="0 0 600 70" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0 }}>
                <path d="M 300 0 L 300 25 Q 300 40 315 40 L 500 40" fill="none" stroke={lineColorOut} strokeWidth="2.5" />
                <path d="M 300 0 L 300 70" fill="none" stroke={lineColorOut} strokeWidth="2.5" />
                <path d="M 300 0 L 300 25 Q 300 40 285 40 L 100 40" fill="none" stroke={lineColorOut} strokeWidth="2.5" />
              </svg>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
              {outputs.map((o) => (
                <div key={o.key} onClick={() => setActiveKey(o.key)} style={outBoxStyle(o.key, o.color)}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 19, color: o.color }}>{o.value}</div>
                  <div style={{ fontSize: 11.5, color: '#7E8B98', marginTop: 4 }}>{o.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="ard-erp-detail" style={{ background: 'linear-gradient(160deg,#12181F 0%,#0F161D 100%)', border: '1px solid rgba(56,189,248,0.22)', borderRadius: 22, padding: 28, boxSizing: 'border-box', position: 'sticky', top: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 26 }}>{active.icon}</span>
              <div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 17 }}>{active.title}</div>
                <div style={{ fontSize: 12, color: ACCENT, fontWeight: 600, marginTop: 2 }}>{active.tag}</div>
              </div>
            </div>
            <p style={{ color: '#C4CDD6', fontSize: 14.5, lineHeight: 1.62, margin: '0 0 20px' }}>{active.desc}</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {active.points.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                  <span style={{ color: ACCENT, fontSize: 13, marginTop: 2 }}>→</span>
                  <span style={{ color: '#9BA6B2', fontSize: 13.5, lineHeight: 1.5 }}>{p}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['wms', 'uretim', 'muhasebe', 'core', 'erp', 'bi', 'saha'].map((k) => (
                <button key={k} type="button" onClick={() => setActiveKey(k)} style={{ width: 38, height: 38, borderRadius: 10, border: `1px solid ${activeKey === k ? ACCENT : 'rgba(255,255,255,0.09)'}`, background: activeKey === k ? ACCENT + '1f' : 'transparent', fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{NODES[k].icon}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
