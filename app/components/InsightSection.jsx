'use client';
import { useState } from 'react';

/**
 * InsightSection — "Sahadan notlar" içgörü/blog teaser bölümü.
 * İçerik placeholder'dır — gerçek yazılarınızla değiştirin ya da bir CMS/MDX kaynağına bağlayın.
 */

const WA_NUMBER = '905323020250';

const POSTS = [
  { tag: 'Depo Yönetimi', color: '#F5B301', title: 'Depo yönetiminde en sık karşılaşılan 5 verimlilik kaçağı',
    excerpt: 'Manuel sayım hataları, yanlış yerleşim ve kopuk sistemler — sahada en çok gördüğümüz 5 kayıp noktası ve çözüm yaklaşımı.',
    readTime: '4 dk',
    body: ['Sahada yürüttüğümüz onlarca operasyonda karşımıza sürekli aynı 5 verimlilik kaçağı çıkıyor: manuel stok sayımı, optimize edilmemiş yerleşim, sistemler arası kopukluk, reaktif (öngörüsüz) sipariş planlama ve ölçülmeyen sevkiyat performansı.', 'Bunların ortak noktası, hiçbirinin büyük bir yatırım gerektirmemesi — çoğu, doğru veri akışı ve basit süreç disiplini ile kısa sürede düzeltilebiliyor.', 'Kendi operasyonunuzda hangi kaçakların olduğunu görmek isterseniz, ücretsiz ön analizimizle başlayabiliriz.'] },
  { tag: 'ERP Entegrasyonu', color: '#38BDF8', title: 'Sistemleriniz neden birbiriyle konuşmuyor?',
    excerpt: 'Depo, üretim ve muhasebe ayrı adalar gibi çalışıyorsa, veri kopukluğu büyümenin önündeki en büyük engel hâline gelir.',
    readTime: '5 dk',
    body: ['Çoğu operasyonda depo, üretim planlama ve muhasebe sistemleri zamanla ayrı ayrı satın alınmış, birbirinden habersiz çalışan adacıklara dönüşür.', 'Bu kopukluk, veri girişini tekrar tekrar yaptırır, hata oranını artırır ve yöneticinin gerçek zamanlı görünürlüğünü ortadan kaldırır.', 'Bir middleware katmanı, bu sistemleri değiştirmeden aralarında gerçek zamanlı bir köprü kurar — dönüşüm sandığınızdan daha az maliyetli olabilir.'] },
  { tag: 'Planlama', color: '#26D07C', title: 'Talep tahmini olmadan büyümek neden risklidir?',
    excerpt: 'Geçmiş verilere değil sezgiye dayalı sipariş planlaması, ya stoksuz kalmanıza ya da elde fazla stokla kalmanıza yol açar.',
    readTime: '3 dk',
    body: ['Sezgiyle yapılan sipariş planlaması kısa vadede işe yarar gibi görünse de, büyüme ile birlikte hata payı katlanarak büyür.', 'Sistematik bir talep tahmin modeli, geçmiş satış verisini mevsimsellik ve trendle birleştirerek stok kararlarını veriye dayandırır.', 'Küçük bir pilot uygulamayla bile, stok fazlası ve stoksuzluk arasındaki dengeyi ölçülebilir şekilde iyileştirmek mümkün.'] },
];

export default function InsightSection() {
  const [activeIdx, setActiveIdx] = useState(null);
  const active = activeIdx !== null ? POSTS[activeIdx] : null;

  return (
    <section style={{ fontFamily: "'Manrope', system-ui, sans-serif", background: '#0A0E12', color: '#F2F5F7', padding: '72px 24px', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 40 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', border: '1px solid rgba(245,179,1,0.35)', borderRadius: 99, background: 'rgba(245,179,1,0.07)', color: '#F5B301', fontSize: 12, fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 18 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#F5B301', boxShadow: '0 0 10px #F5B301' }} />
              İçgörüler
            </div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 'clamp(28px,3.6vw,40px)', lineHeight: 1.1, margin: 0, letterSpacing: '-0.02em' }}>Sahadan notlar</h2>
          </div>
          <p style={{ margin: 0, color: '#9BA6B2', fontSize: 15, maxWidth: 360, lineHeight: 1.6 }}>Operasyon yönetimi üzerine kısa, pratik yazılar — pazarlama değil, saha tecrübesi.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 22 }}>
          {POSTS.map((p, i) => (
            <button key={i} type="button" onClick={() => setActiveIdx(i)} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', background: '#12181F', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 26, cursor: 'pointer', fontFamily: "'Manrope', sans-serif" }}>
              <span style={{ display: 'inline-block', alignSelf: 'flex-start', fontSize: 11.5, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: p.color, background: p.color + '18', padding: '5px 12px', borderRadius: 99, marginBottom: 16 }}>{p.tag}</span>
              <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18, lineHeight: 1.32, marginBottom: 10 }}>{p.title}</div>
              <p style={{ color: '#9BA6B2', fontSize: 14, lineHeight: 1.6, margin: '0 0 20px', flex: 1 }}>{p.excerpt}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', color: '#6E7C89', fontSize: 12.5, fontWeight: 500 }}>
                <span>{p.readTime} okuma</span>
                <span style={{ color: p.color }}>Devamını oku →</span>
              </div>
            </button>
          ))}
        </div>

        {active && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(6,8,10,0.72)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, zIndex: 100 }} onClick={() => setActiveIdx(null)}>
            <div style={{ background: '#12181F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: 38, maxWidth: 600, width: '100%', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, gap: 16 }}>
                <div>
                  <span style={{ display: 'inline-block', fontSize: 11.5, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: active.color, background: active.color + '18', padding: '5px 12px', borderRadius: 99, marginBottom: 14 }}>{active.tag}</span>
                  <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 22, margin: 0, lineHeight: 1.3 }}>{active.title}</h3>
                </div>
                <button type="button" onClick={() => setActiveIdx(null)} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#9BA6B2', width: 34, height: 34, borderRadius: 10, fontSize: 18, cursor: 'pointer', flexShrink: 0 }}>×</button>
              </div>
              {active.body.map((para, i) => (
                <p key={i} style={{ color: '#C4CDD6', fontSize: 15, lineHeight: 1.68, margin: '0 0 16px' }}>{para}</p>
              ))}
              <a href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Merhaba, "' + active.title + '" konusuyla ilgili görüşmek istiyorum.')}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', marginTop: 8, padding: '13px 22px', borderRadius: 12, background: active.color, color: '#0A0E12', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>Bu konuyu bizimle konuşun →</a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
