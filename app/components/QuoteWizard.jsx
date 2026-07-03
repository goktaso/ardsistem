'use client';
import { useState } from 'react';

/**
 * QuoteWizard — "Teklif Sihirbazı": tek kontak formu yerine 3 adımlı seçim
 * (Sektör → İhtiyaç → İletişim), sonunda WhatsApp'a otomatik dolu mesajla gönderir.
 */

const ACCENT = '#26D07C';
const WA_NUMBER = '905323020250';

const SECTORS = [
  { key: 'perakende', icon: '🛒', label: 'Perakende' },
  { key: 'uretim', icon: '🏭', label: 'Üretim & İmalat' },
  { key: 'gida', icon: '🍽️', label: 'Gıda & FMCG' },
  { key: 'ambalaj', icon: '📦', label: 'Ambalaj & Kağıt' },
  { key: 'lojistik', icon: '🚚', label: 'Lojistik' },
  { key: 'diger', icon: '🏢', label: 'Diğer' },
];
const NEEDS = [
  { key: 'depo', icon: '📦', label: 'Depo & Stok Yönetimi' },
  { key: 'erp', icon: '⚙️', label: 'ERP Entegrasyonu' },
  { key: 'uretimplan', icon: '🏗️', label: 'Üretim Planlama' },
  { key: 'raporlama', icon: '📊', label: 'Raporlama & İş Zekası' },
  { key: 'genel', icon: '🧭', label: 'Nereden başlayacağımdan emin değilim' },
];

export default function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [sector, setSector] = useState(null);
  const [need, setNeed] = useState(null);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  const sectorLabel = SECTORS.find((x) => x.key === sector)?.label || '';
  const needLabel = NEEDS.find((x) => x.key === need)?.label || '';
  const summary = sectorLabel && needLabel ? `${sectorLabel} sektörü · ${needLabel}` : '';

  const optStyle = (selKey, cur, row) => ({
    display: 'flex', alignItems: 'center', gap: row ? 12 : 10, textAlign: 'left', padding: row ? '15px 16px' : '16px 14px', borderRadius: 14,
    border: `1px solid ${cur === selKey ? ACCENT : 'rgba(255,255,255,0.09)'}`, background: cur === selKey ? ACCENT + '17' : 'rgba(255,255,255,0.02)',
    color: '#E5EAEF', fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: 14.5, cursor: 'pointer',
  });
  const inputStyle = { padding: '14px 16px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', color: '#F2F5F7', fontFamily: "'Manrope', sans-serif", fontSize: 14.5, boxSizing: 'border-box', width: '100%' };

  const waMsg = encodeURIComponent(`Merhaba, ARD Sistem üzerinden ücretsiz ön analiz talep ediyorum.\nSektör: ${sectorLabel}\nİhtiyaç: ${needLabel}\nAd Soyad: ${name}\nŞirket: ${company}\nTelefon: ${phone}`);
  const waHref = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;

  return (
    <section style={{ fontFamily: "'Manrope', system-ui, sans-serif", background: 'radial-gradient(1000px 500px at 50% -8%, rgba(38,208,124,0.09), transparent 60%), #0A0E12', color: '#F2F5F7', padding: '72px 24px', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', border: `1px solid ${ACCENT}59`, borderRadius: 99, background: `${ACCENT}12`, color: ACCENT, fontSize: 12, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }} />
            Ücretsiz Ön Analiz
          </div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 'clamp(26px,3.6vw,38px)', lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 12px' }}>Size özel teklife 3 adımda ulaşın</h2>
          <p style={{ margin: 0, color: '#9BA6B2', fontSize: 15.5, lineHeight: 1.6 }}>Uzun bir form doldurmayın — birkaç tık, 48 saat içinde dönüş yapalım.</p>
        </div>

        <div style={{ background: '#12181F', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 24, padding: 38, boxSizing: 'border-box', boxShadow: '0 24px 60px rgba(0,0,0,0.4)', minHeight: 400, display: 'flex', flexDirection: 'column' }}>

          {!sent && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 30 }}>
              {[1, 2, 3].map((n) => (
                <div key={n} style={{ flex: 1, height: 5, borderRadius: 99, background: step >= n ? ACCENT : 'rgba(255,255,255,0.08)' }} />
              ))}
            </div>
          )}

          {step === 1 && !sent && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#5C6B78', marginBottom: 6 }}>Adım 1 / 3</div>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 21, margin: '0 0 22px' }}>Hangi sektörde faaliyet gösteriyorsunuz?</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {SECTORS.map((o) => (
                  <button key={o.key} type="button" onClick={() => { setSector(o.key); setStep(2); }} style={optStyle(o.key, sector, false)}>
                    <span style={{ fontSize: 20 }}>{o.icon}</span><span>{o.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && !sent && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#5C6B78', marginBottom: 6 }}>Adım 2 / 3</div>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 21, margin: '0 0 22px' }}>En çok hangi alanda destek almak istersiniz?</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {NEEDS.map((o) => (
                  <button key={o.key} type="button" onClick={() => { setNeed(o.key); setStep(3); }} style={optStyle(o.key, need, true)}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>{o.icon}</span><span>{o.label}</span>
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => setStep(1)} style={{ marginTop: 20, background: 'none', border: 'none', color: '#6E7C89', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>← Geri</button>
            </div>
          )}

          {step === 3 && !sent && (
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#5C6B78', marginBottom: 6 }}>Adım 3 / 3</div>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 21, margin: '0 0 8px' }}>Size nasıl ulaşalım?</h3>
              <p style={{ color: '#7E8B98', fontSize: 13.5, margin: '0 0 22px' }}>{summary}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 22 }}>
                <input type="text" placeholder="Adınız Soyadınız" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
                <input type="text" placeholder="Şirket Adı" value={company} onChange={(e) => setCompany(e.target.value)} style={inputStyle} />
                <input type="tel" placeholder="Telefon Numarası" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />
              </div>
              <button type="button" onClick={() => setStep(2)} style={{ alignSelf: 'flex-start', marginBottom: 18, background: 'none', border: 'none', color: '#6E7C89', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>← Geri</button>
              <a href={waHref} target="_blank" rel="noopener noreferrer" onClick={() => setSent(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 20px', borderRadius: 14, background: ACCENT, color: '#06210F', fontWeight: 700, fontSize: 15.5, textDecoration: 'none', boxShadow: `0 8px 24px ${ACCENT}47` }}>Ücretsiz analiz talebimi gönder →</a>
              <div style={{ textAlign: 'center', color: '#5C6B78', fontSize: 12, marginTop: 14 }}>WhatsApp üzerinden anında iletilir · 48 saat içinde dönüş</div>
            </div>
          )}

          {sent && (
            <div style={{ margin: 'auto', textAlign: 'center' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 20, margin: '0 0 10px' }}>Talebiniz iletiliyor</h3>
              <p style={{ color: '#9BA6B2', fontSize: 14.5, margin: '0 0 22px' }}>WhatsApp sekmesinden mesajınızı gönderin — ekibimiz 48 saat içinde dönüş yapacak.</p>
              <button type="button" onClick={() => { setStep(1); setSector(null); setNeed(null); setName(''); setCompany(''); setPhone(''); setSent(false); }} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: '#E5EAEF', padding: '12px 22px', borderRadius: 12, fontFamily: "'Manrope', sans-serif", fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Yeniden başlat</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
