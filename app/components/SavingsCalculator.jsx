'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * SavingsCalculator — İnteraktif Tasarruf Hesaplayıcı
 * Next.js 14 App Router client component. Bağımlılık yok (sadece React).
 * Fontlar: Sora, Manrope, JetBrains Mono (README > "Fontlar" bölümüne bakın).
 * WhatsApp numarası ve oran katsayıları aşağıda; gerçek verinizle güncelleyin.
 */

const ACCENT = '#26D07C';
const WA_NUMBER = '905323020250';

const MULT = {
  retail:        { stok: 0.19, loj: 0.013, isg: 0.09, fire: 0.006, label: 'Perakende & Lojistik' },
  manufacturing: { stok: 0.16, loj: 0.011, isg: 0.11, fire: 0.008, label: 'Üretim & İmalat' },
  packaging:     { stok: 0.17, loj: 0.012, isg: 0.10, fire: 0.010, label: 'Ambalaj & Kağıt' },
  food:          { stok: 0.21, loj: 0.014, isg: 0.08, fire: 0.012, label: 'Gıda & FMCG' },
  other:         { stok: 0.15, loj: 0.010, isg: 0.08, fire: 0.006, label: 'Diğer' },
};

const fmt = (n) => '₺' + Math.round(n).toLocaleString('tr-TR');
const fmtM = (n) => '₺' + (n / 1e6).toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Milyon';

export default function SavingsCalculator({ accent = ACCENT }) {
  const [sector, setSector] = useState('retail');
  const [ciro, setCiro] = useState(80);
  const [stok, setStok] = useState(24);
  const [personel, setPersonel] = useState(60);
  const [disp, setDisp] = useState({ total: 0, stok: 0, loj: 0, isg: 0, fire: 0 });
  const [showHow, setShowHow] = useState(false);
  const raf = useRef(null);
  const dispRef = useRef(disp);
  dispRef.current = disp;

  const targets = useCallback(() => {
    const m = MULT[sector];
    const ciroTL = ciro * 1e6, stokTL = stok * 1e6, personelCost = personel * 340000;
    const s = stokTL * m.stok, l = ciroTL * m.loj, i = personelCost * m.isg, f = ciroTL * m.fire;
    return { stok: s, loj: l, isg: i, fire: f, total: s + l + i + f };
  }, [sector, ciro, stok, personel]);

  useEffect(() => {
    const start = { ...dispRef.current };
    const end = targets();
    const t0 = performance.now(), dur = 650, ease = (t) => 1 - Math.pow(1 - t, 3);
    const keys = ['total', 'stok', 'loj', 'isg', 'fire'];
    const step = (now) => {
      const t = Math.min(1, (now - t0) / dur), e = ease(t);
      const d = {};
      keys.forEach((k) => (d[k] = start[k] + (end[k] - start[k]) * e));
      setDisp(d);
      if (t < 1) raf.current = requestAnimationFrame(step);
    };
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [targets]);

  const fill = (v, min, max) => {
    const p = ((v - min) / (max - min)) * 100;
    return `linear-gradient(90deg, ${accent} 0%, ${accent} ${p}%, rgba(255,255,255,0.09) ${p}%, rgba(255,255,255,0.09) 100%)`;
  };

  const total = disp.total || 0;
  const items = [
    { key: 'stok', label: 'Stok maliyeti azalması' },
    { key: 'loj', label: 'Lojistik & tedarik maliyeti' },
    { key: 'isg', label: 'İşgücü & operasyon verimliliği' },
    { key: 'fire', label: 'Fire / iade kaybı azalması' },
  ].map((it) => {
    const raw = disp[it.key] || 0;
    const pct = total > 0 ? Math.max(4, (raw / total) * 100) : 0;
    return { ...it, raw, pct };
  });

  const waMsg = encodeURIComponent(`Merhaba, ARD Sistem tasarruf hesaplayıcısında yıllık ~${fmtM(total)} tasarruf potansiyeli çıktı. Ücretsiz saha analizi için görüşmek isterim.`);
  const waHref = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;

  const mono = { fontFamily: "'JetBrains Mono', monospace" };

  return (
    <section className="ard-calc" style={{ fontFamily: "'Manrope', system-ui, sans-serif", background: `radial-gradient(1100px 520px at 50% -8%, ${accent}1a, transparent 60%), #0A0E12`, color: '#F2F5F7', padding: '72px 24px', boxSizing: 'border-box' }}>
      <style>{`
        .ard-calc input[type=range]{-webkit-appearance:none;appearance:none;height:6px;border-radius:99px;outline:none;cursor:pointer;}
        .ard-calc input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:22px;height:22px;border-radius:50%;background:#fff;border:3px solid ${accent};box-shadow:0 2px 10px rgba(0,0,0,.5);cursor:pointer;}
        .ard-calc input[type=range]::-moz-range-thumb{width:22px;height:22px;border-radius:50%;background:#fff;border:3px solid ${accent};box-shadow:0 2px 10px rgba(0,0,0,.5);cursor:pointer;}
        @keyframes ard-rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 44px', animation: 'ard-rise .6s ease both' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', border: `1px solid ${accent}59`, borderRadius: 99, background: `${accent}12`, color: accent, fontSize: 12, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: accent, boxShadow: `0 0 10px ${accent}` }} />
            İnteraktif Araç
          </div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 'clamp(28px,4vw,44px)', lineHeight: 1.08, margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            Operasyonunuzda gizli<br />ne kadar tasarruf var?
          </h2>
          <p style={{ margin: 0, color: '#9BA6B2', fontSize: 16, lineHeight: 1.6 }}>
            Birkaç değeri kaydırın — stok, lojistik, işgücü ve fire kalemlerinde yıllık tasarruf potansiyelinizi anında görün.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(330px,1fr))', gap: 22, alignItems: 'stretch' }}>
          {/* INPUTS */}
          <div style={{ background: '#12181F', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 22, padding: 30, boxSizing: 'border-box', animation: 'ard-rise .6s ease both' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#5C6B78', marginBottom: 16 }}>Sektörünüz</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 30 }}>
              {Object.keys(MULT).map((k) => {
                const active = k === sector;
                return (
                  <button key={k} type="button" onClick={() => setSector(k)} style={{ padding: '9px 15px', borderRadius: 99, border: `1px solid ${active ? accent : 'rgba(255,255,255,0.10)'}`, background: active ? `${accent}22` : 'transparent', color: active ? accent : '#9BA6B2', fontFamily: "'Manrope', sans-serif", fontWeight: active ? 600 : 500, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s' }}>
                    {MULT[k].label}
                  </button>
                );
              })}
            </div>

            {[
              { label: 'Yıllık Ciro', val: ciro, set: setCiro, min: 5, max: 500, step: 5, disp: `₺${ciro} Milyon` },
              { label: 'Ortalama Stok Değeri', val: stok, set: setStok, min: 1, max: 150, step: 1, disp: `₺${stok} Milyon` },
              { label: 'Operasyon Personeli', val: personel, set: setPersonel, min: 5, max: 600, step: 5, disp: `${personel} kişi` },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: i === 2 ? 6 : 28 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                  <span style={{ fontSize: 14.5, fontWeight: 600, color: '#C4CDD6' }}>{s.label}</span>
                  <span style={{ ...mono, fontSize: 15, fontWeight: 700, color: accent }}>{s.disp}</span>
                </div>
                <input type="range" min={s.min} max={s.max} step={s.step} value={s.val} onChange={(e) => s.set(+e.target.value)} style={{ width: '100%', background: fill(s.val, s.min, s.max) }} />
              </div>
            ))}
          </div>

          {/* RESULTS */}
          <div style={{ background: 'linear-gradient(160deg, #14201A 0%, #101820 55%)', border: `1px solid ${accent}38`, borderRadius: 22, padding: 30, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', animation: 'ard-rise .7s ease both' }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: accent, marginBottom: 10 }}>Yıllık Tasarruf Potansiyeli</div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 'clamp(38px,6vw,56px)', lineHeight: 1, letterSpacing: '-0.03em', color: '#F2F5F7', marginBottom: 6 }}>{fmtM(total)}</div>
            <div style={{ ...mono, fontSize: 13.5, color: '#7E8B98', marginBottom: 26 }}>≈ {fmt(total)} / yıl</div>

            <div style={{ flex: 1 }}>
              {items.map((it) => (
                <div key={it.key} style={{ marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
                    <span style={{ color: '#C4CDD6', fontSize: 13.5, fontWeight: 500 }}>{it.label}</span>
                    <span style={{ ...mono, color: '#F2F5F7', fontSize: 13.5, fontWeight: 700 }}>{fmt(it.raw)}</span>
                  </div>
                  <div style={{ height: 7, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
                    <div style={{ width: `${it.pct}%`, height: '100%', background: accent, borderRadius: 99, transition: 'width .18s ease' }} />
                  </div>
                </div>
              ))}
            </div>

            <a href={waHref} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 20, padding: '16px 20px', borderRadius: 14, background: accent, color: '#06210F', fontWeight: 700, fontSize: 15.5, textDecoration: 'none', boxShadow: `0 8px 24px ${accent}47` }}>
              Kişiye özel tasarruf raporumu al →
            </a>
            <div style={{ display: 'flex', gap: 18, justifyContent: 'center', marginTop: 14 }}>
              <a href="tel:+905323020250" style={{ color: '#9BA6B2', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>📞 +90 532 302 02 50</a>
              <a href="mailto:ozaygoktas@ardsistem.net.tr" style={{ color: '#9BA6B2', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>✉️ E-posta</a>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 22 }}>
          <button type="button" onClick={() => setShowHow((v) => !v)} style={{ background: 'none', border: 'none', color: '#5C6B78', fontFamily: "'Manrope', sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 3 }}>
            Bu rakamlar nasıl hesaplanıyor?
          </button>
          {showHow && (
            <p style={{ maxWidth: 720, margin: '14px auto 0', color: '#6E7C89', fontSize: 13, lineHeight: 1.7 }}>
              Değerler; sektörünüzdeki tipik iyileştirme oranları (stok tutma maliyeti ↓, lojistik &amp; tedarik gideri ↓, işgücü verimliliği ↑, fire/iade ↓) baz alınarak hesaplanan <b style={{ color: '#9BA6B2' }}>tahmini</b> potansiyeldir. Kesin rakamlar, ücretsiz saha analizinde operasyonunuzun gerçek verisiyle belirlenir.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
