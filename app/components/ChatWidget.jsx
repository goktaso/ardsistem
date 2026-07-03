'use client';
import { useState } from 'react';

/**
 * ChatWidget — "Süreç Danışmanı" kural-tabanlı sohbet widget'ı.
 * Sabit konumlu (fixed) floating button + panel. Gerçek AI yanıtı isterseniz
 * (Claude API vb.) `ask()` fonksiyonunu bir API çağrısıyla değiştirin — bu
 * sürüm hazır soru-cevap çiftleriyle çalışır ve karmaşık sorularda WhatsApp'a yönlendirir.
 */

const WA_NUMBER = '905323020250';

const INTRO = "Merhaba 👋 Ben ARD Sistem süreç danışmanınızım. Depo, ERP, üretim planlama ya da raporlama konularında hızlı bilgi verebilirim. Aşağıdan bir konu seçin, ya da doğrudan WhatsApp'tan ekibimize yazın.";

const QA = {
  depo: { q: 'Depo/stok yönetimi hakkında bilgi almak istiyorum', a: 'WMS entegrasyonumuz stok hareketlerini gerçek zamanlı izler, sayım farklarını otomatik raporlar ve sevkiyat verisini ERP\'nize anlık yansıtır. Ortalama uygulama süresi 2-4 ay.' },
  erp: { q: 'ERP entegrasyonu ne kadar sürer?', a: 'Kapsam ve mevcut sisteminize göre değişir; tek modül entegrasyonu genelde 6-10 hafta, uçtan uca dönüşüm 4-6 ay sürüyor. Kesin süre için önce ücretsiz ön analiz yapıyoruz.' },
  fiyat: { q: 'Fiyatlandırma nasıl işliyor?', a: 'Sabit paket fiyatımız yok — her operasyon farklı. Önce ücretsiz keşif görüşmesiyle kapsamı netleştiriyor, ardından size özel teklif sunuyoruz.' },
  analiz: { q: 'Ücretsiz ön analiz nasıl işliyor?', a: 'Kısa bir görüşme sonrası 48 saat içinde operasyonunuzdaki 3 öncelikli alanı içeren yazılı bir rapor hazırlıyoruz — taahhüt gerektirmez.' },
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [log, setLog] = useState([]);

  const toggle = () => {
    const willOpen = !open;
    setOpen(willOpen);
    if (willOpen && log.length === 0) {
      setTyping(true);
      setTimeout(() => { setTyping(false); setLog([{ from: 'bot', text: INTRO }]); }, 700);
    }
  };

  const ask = (key) => {
    const item = QA[key];
    setLog((l) => [...l, { from: 'user', text: item.q }]);
    setTyping(true);
    setTimeout(() => {
      setLog((l) => [...l, { from: 'bot', text: item.a }]);
      setTyping(false);
    }, 750);
  };

  const waHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Merhaba, ARD Sistem web sitesi üzerinden yazıyorum.')}`;

  return (
    <>
      <style>{`
        @media (max-width: 480px) {
          .ard-chat-fab { padding: 14px !important; }
          .ard-chat-fab-label { display: none; }
        }
      `}</style>
      {!open && (
        <button type="button" onClick={toggle} className="ard-chat-fab" style={{ position: 'fixed', left: 26, bottom: 26, zIndex: 60, display: 'flex', alignItems: 'center', gap: 11, padding: '15px 22px 15px 17px', borderRadius: 99, border: 'none', background: '#38BDF8', color: '#04202B', fontWeight: 700, fontSize: 14.5, cursor: 'pointer', boxShadow: '0 12px 30px rgba(56,189,248,0.35)', fontFamily: "'Manrope', sans-serif" }}>
          <span style={{ fontSize: 19 }}>💬</span> <span className="ard-chat-fab-label">Süreç Danışmanı</span>
        </button>
      )}

      {open && (
        <div style={{ position: 'fixed', left: 26, bottom: 26, zIndex: 60, width: 360, maxWidth: 'calc(100vw - 40px)', background: '#12181F', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, boxShadow: '0 30px 70px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', overflow: 'hidden', fontFamily: "'Manrope', sans-serif" }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', background: 'linear-gradient(135deg,#15202A,#101820)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(56,189,248,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17 }}>⚙️</div>
              <div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 14, color: '#F2F5F7' }}>Süreç Danışmanı</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, color: '#26D07C' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#26D07C' }} />Aktif
                </div>
              </div>
            </div>
            <button type="button" onClick={toggle} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#9BA6B2', width: 28, height: 28, borderRadius: 8, fontSize: 16, cursor: 'pointer' }}>×</button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: 18, display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 360, minHeight: 260 }}>
            {log.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '82%', padding: '11px 14px', borderRadius: m.from === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px', background: m.from === 'user' ? '#38BDF8' : 'rgba(255,255,255,0.05)', color: m.from === 'user' ? '#04202B' : '#E5EAEF', fontSize: 13.5, lineHeight: 1.5 }}>{m.text}</div>
              </div>
            ))}
            {typing && (
              <div style={{ alignSelf: 'flex-start', display: 'flex', gap: 4, padding: '12px 14px', background: 'rgba(255,255,255,0.05)', borderRadius: '14px 14px 14px 4px' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7E8B98' }} />
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7E8B98' }} />
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7E8B98' }} />
              </div>
            )}
          </div>

          {!typing && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 18px 16px' }}>
              {Object.keys(QA).map((k) => (
                <button key={k} type="button" onClick={() => ask(k)} style={{ textAlign: 'left', padding: '11px 14px', borderRadius: 12, border: '1px solid rgba(56,189,248,0.3)', background: 'rgba(56,189,248,0.06)', color: '#9BEBFF', fontFamily: "'Manrope', sans-serif", fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>{QA[k].q}</button>
              ))}
            </div>
          )}

          <div style={{ padding: '14px 18px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
            <a href={waHref} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '12px 16px', borderRadius: 12, background: '#25D366', color: '#06210F', fontWeight: 700, fontSize: 13.5, textDecoration: 'none' }}>🟢 Gerçek biriyle konuş (WhatsApp)</a>
          </div>
        </div>
      )}
    </>
  );
}
