'use client';
import { useState, useEffect, useRef } from 'react';

/**
 * MaturityQuiz — Operasyon Olgunluk Testi (6 soruluk interaktif quiz).
 * Next.js 14 App Router client component. Bağımlılık yok (sadece React).
 * Sonuç: animasyonlu skor halkası + seviye + kişiye özel öneri + WhatsApp CTA.
 */

const ACCENT = '#38BDF8';
const WA_NUMBER = '905323020250';
const RING_C = 452.4; // 2 * PI * 72

const QUESTIONS = [
  { text: 'Stok ve envanter takibinizi nasıl yapıyorsunuz?', options: [
    { label: 'Excel ya da kağıt üzerinde', val: 0 },
    { label: 'Kısmi yazılım, güncelleme çoğunlukla manuel', val: 1 },
    { label: 'Entegre WMS/ERP, gerçek zamanlı', val: 2 } ] },
  { text: 'Sistemleriniz (depo, muhasebe, ERP, üretim) birbiriyle konuşuyor mu?', options: [
    { label: 'Ayrı çalışıyor, veriyi elle taşıyoruz', val: 0 },
    { label: 'Bir kısmı entegre', val: 1 },
    { label: 'Tümü tek veri akışında', val: 2 } ] },
  { text: 'Operasyonel kararlarınızı neye dayanarak alıyorsunuz?', options: [
    { label: 'Tecrübe ve sezgi', val: 0 },
    { label: 'Periyodik (haftalık/aylık) raporlar', val: 1 },
    { label: 'Gerçek zamanlı dashboard ve KPI’lar', val: 2 } ] },
  { text: 'Talep tahmini ve sipariş planlaması yapıyor musunuz?', options: [
    { label: 'Hayır, gelen siparişe göre hareket ediyoruz', val: 0 },
    { label: 'Geçmiş verilere bakıyoruz', val: 1 },
    { label: 'Sistematik talep tahmini kullanıyoruz', val: 2 } ] },
  { text: 'Verimliliği (sevkiyat hızı, OEE, fire, iade) ölçüyor musunuz?', options: [
    { label: 'Ölçmüyoruz', val: 0 },
    { label: 'Kısmen, düzensiz', val: 1 },
    { label: 'Düzenli olarak KPI ile takip ediyoruz', val: 2 } ] },
  { text: 'Denetim ve uyum (FSC, ISO, lot izleme) süreçleriniz nasıl?', options: [
    { label: 'Manuel ve zahmetli', val: 0 },
    { label: 'Kısmen dijital', val: 1 },
    { label: 'Tam dijital ve izlenebilir', val: 2 } ] },
];

function levelFor(score) {
  if (score <= 33) return { name: 'Başlangıç Seviyesi', color: '#F97362', tagline: 'Manuel süreçler sizi yavaşlatıyor',
    rec: 'Operasyonunuz büyük ölçüde Excel ve tecrübeyle yürüyor. En hızlı kazanım tam burada: temel stok/depo dijitalleşmesi ve sistemler arası ilk entegrasyonla kısa sürede görünür bir verimlilik elde edersiniz.',
    services: ['Depo & Stok Yönetimi', 'ERP Entegrasyonu', 'Tedarik Zinciri'] };
  if (score <= 58) return { name: 'Gelişmekte', color: '#F5B301', tagline: 'Temeliniz var, veri akışı eksik',
    rec: 'Bazı sistemleriniz devrede ama birbirinden kopuk çalışıyor. Bunları tek veri akışında birleştirip gerçek zamanlı raporlamaya geçtiğinizde karar hızınız ve doğruluğunuz belirgin şekilde artar.',
    services: ['ERP Entegrasyonu', 'Raporlama & İş Zekası', 'Üretim Planlama'] };
  if (score <= 82) return { name: 'Olgun', color: '#38BDF8', tagline: 'İyi durumdasınız — sırada optimizasyon',
    rec: 'Entegre ve ölçülebilir bir operasyonunuz var. Bundan sonrası ince ayar: talep tahmini, kapasite ve planogram optimizasyonu ile ileri analitik sayesinde marjinal kazanımları büyütmek.',
    services: ['Raporlama & İş Zekası', 'Planogram Yönetimi', 'Üretim Planlama'] };
  return { name: 'Lider Seviye', color: '#26D07C', tagline: 'Dijital olgun bir operasyon',
    rec: 'Operasyonunuz veriyle yönetilen bir yapıda. Odak; sürdürülebilirlik, denetim uyumu (FSC/ISO) ve sürekli iyileştirme kültürünü kurumsallaştırmak. Sistemi bir üst seviyeye birlikte taşıyalım.',
    services: ['FSC™ Denetim Uyumu', 'Raporlama & İş Zekası', 'Tedarik Zinciri'] };
}

export default function MaturityQuiz({ accent = ACCENT }) {
  const [view, setView] = useState('intro'); // 'intro' | 'q' | 'result'
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [dispScore, setDispScore] = useState(0);
  const raf = useRef(null);

  const rawScore = answers.reduce((a, b) => a + (b || 0), 0);
  const score = Math.round((rawScore / (QUESTIONS.length * 2)) * 100);

  useEffect(() => {
    if (view !== 'result') return;
    const t0 = performance.now(), dur = 900, ease = (t) => 1 - Math.pow(1 - t, 3);
    const step = (now) => {
      const t = Math.min(1, (now - t0) / dur);
      setDispScore(score * ease(t));
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [view, score]);

  const start = () => { setAnswers([]); setQi(0); setDispScore(0); setView('q'); };
  const answer = (val) => {
    const next = answers.slice();
    next[qi] = val;
    setAnswers(next);
    if (qi >= QUESTIONS.length - 1) setView('result');
    else setQi(qi + 1);
  };
  const back = () => {
    if (view === 'result') { setView('q'); setQi(QUESTIONS.length - 1); }
    else if (qi > 0) setQi(qi - 1);
    else setView('intro');
  };
  const restart = () => { cancelAnimationFrame(raf.current); setAnswers([]); setQi(0); setDispScore(0); setView('intro'); };

  const cur = QUESTIONS[qi] || QUESTIONS[0];
  const sc = Math.round(dispScore);
  const lvl = levelFor(score);
  const offset = RING_C * (1 - sc / 100);
  const waMsg = encodeURIComponent(`Merhaba, ARD Sistem olgunluk testini çözdüm. Skorum ${score}/100 (${lvl.name}). Kişiye özel yol haritası için görüşmek isterim.`);
  const waHref = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;
  const mono = { fontFamily: "'JetBrains Mono', monospace" };

  return (
    <section style={{ fontFamily: "'Manrope', system-ui, sans-serif", background: `radial-gradient(900px 480px at 50% -6%, ${accent}17, transparent 60%), #0A0E12`, color: '#F2F5F7', padding: '72px 24px', boxSizing: 'border-box' }}>
      <style>{`
        @keyframes ard-pop{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}
      `}</style>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 34 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', border: `1px solid ${accent}52`, borderRadius: 99, background: `${accent}10`, color: accent, fontSize: 12, fontWeight: 600, letterSpacing: '.05em', textTransform: 'uppercase', marginBottom: 18 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: accent, boxShadow: `0 0 10px ${accent}` }} />
            2 Dakikalık Test
          </div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 'clamp(26px,3.6vw,40px)', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 }}>Operasyon Olgunluk Testiniz</h2>
        </div>

        <div style={{ background: '#12181F', border: '1px solid rgba(255,255,255,0.09)', borderRadius: 24, padding: 38, boxSizing: 'border-box', minHeight: 420, display: 'flex', flexDirection: 'column', boxShadow: '0 24px 60px rgba(0,0,0,0.4)' }}>

          {view === 'intro' && (
            <div style={{ textAlign: 'center', margin: 'auto', animation: 'ard-pop .4s ease both', maxWidth: 460 }}>
              <div style={{ fontSize: 44, marginBottom: 18 }}>🧭</div>
              <p style={{ color: '#C4CDD6', fontSize: 16.5, lineHeight: 1.62, margin: '0 0 28px' }}>6 kısa soruyla operasyonunuzun dijital olgunluğunu ölçün. Sonunda <b style={{ color: '#F2F5F7' }}>kişiye özel skorunuzu</b> ve öncelikli iyileştirme yol haritanızı görün.</p>
              <button type="button" onClick={start} style={{ padding: '16px 34px', borderRadius: 14, border: 'none', background: accent, color: '#04202B', fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: `0 10px 28px ${accent}4d` }}>Teste Başla →</button>
              <div style={{ marginTop: 16, color: '#6E7C89', fontSize: 13 }}>6 soru · ~2 dakika · ücretsiz</div>
            </div>
          )}

          {view === 'q' && (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ marginBottom: 26 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ ...mono, fontSize: 13, color: accent, fontWeight: 700 }}>SORU {qi + 1}/{QUESTIONS.length}</span>
                  <button type="button" onClick={back} style={{ background: 'none', border: 'none', color: '#6E7C89', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>← Geri</button>
                </div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ width: `${(qi / QUESTIONS.length) * 100}%`, height: '100%', background: accent, borderRadius: 99, transition: 'width .3s ease' }} />
                </div>
              </div>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 22, lineHeight: 1.28, margin: '0 0 24px' }}>{cur.text}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {cur.options.map((o) => {
                  const sel = answers[qi] === o.val;
                  return (
                    <button key={o.val} type="button" onClick={() => answer(o.val)} style={{ display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', padding: '16px 18px', borderRadius: 14, border: `1px solid ${sel ? accent : 'rgba(255,255,255,0.1)'}`, background: sel ? `${accent}17` : 'rgba(255,255,255,0.02)', color: '#E5EAEF', fontFamily: "'Manrope', sans-serif", fontWeight: 500, fontSize: 15, cursor: 'pointer', transition: 'all .15s' }}>
                      <span style={{ width: 22, height: 22, borderRadius: '50%', border: `2px solid ${sel ? accent : 'rgba(255,255,255,0.22)'}`, flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: accent, fontSize: 12 }}>{sel ? '●' : ''}</span>
                      <span>{o.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {view === 'result' && (
            <div style={{ textAlign: 'center', margin: 'auto 0', animation: 'ard-pop .45s ease both', width: '100%' }}>
              <div style={{ position: 'relative', width: 170, height: 170, margin: '0 auto 8px' }}>
                <svg width="170" height="170" viewBox="0 0 170 170">
                  <circle cx="85" cy="85" r="72" fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="13" />
                  <circle cx="85" cy="85" r="72" fill="none" stroke={lvl.color} strokeWidth="13" strokeLinecap="round" strokeDasharray={RING_C} strokeDashoffset={offset} transform="rotate(-90 85 85)" style={{ transition: 'stroke-dashoffset .1s linear' }} />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 46, lineHeight: 1, color: '#F2F5F7' }}>{sc}</span>
                  <span style={{ ...mono, fontSize: 12, color: '#6E7C89', marginTop: 2 }}>/ 100</span>
                </div>
              </div>
              <div style={{ display: 'inline-block', padding: '7px 18px', borderRadius: 99, background: `${lvl.color}1f`, color: lvl.color, fontWeight: 700, fontSize: 14, margin: '8px 0 6px' }}>{lvl.name}</div>
              <div style={{ color: '#9BA6B2', fontSize: 15, fontWeight: 600, marginBottom: 16 }}>{lvl.tagline}</div>
              <p style={{ color: '#C4CDD6', fontSize: 15, lineHeight: 1.62, margin: '0 auto 24px', maxWidth: 500, textAlign: 'left' }}>{lvl.rec}</p>
              <div style={{ textAlign: 'left', maxWidth: 500, margin: '0 auto 28px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#5C6B78', marginBottom: 11 }}>Öncelikli Hizmetler</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
                  {lvl.services.map((sv) => (
                    <span key={sv} style={{ padding: '8px 15px', borderRadius: 99, border: `1px solid ${lvl.color}44`, background: `${lvl.color}14`, color: lvl.color, fontSize: 13, fontWeight: 600 }}>{sv}</span>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                <a href={waHref} target="_blank" rel="noopener noreferrer" style={{ padding: '15px 28px', borderRadius: 14, background: '#26D07C', color: '#06210F', fontWeight: 700, fontSize: 15.5, textDecoration: 'none', boxShadow: '0 10px 26px rgba(38,208,124,0.28)' }}>Ücretsiz yol haritamı al →</a>
                <button type="button" onClick={restart} style={{ padding: '15px 24px', borderRadius: 14, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: '#E5EAEF', fontFamily: "'Manrope', sans-serif", fontWeight: 600, fontSize: 15.5, cursor: 'pointer' }}>Testi tekrar çöz</button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
