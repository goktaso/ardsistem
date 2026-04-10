"use client"
import React, { useState, useEffect, useRef } from 'react'

const BRAND = {
  name: "Özay Göktaş",
  phone: "+90 532 302 02 50",
  email: "iletisim@ardsistem.net.tr",
  address: "İzmir, Türkiye",
  whatsapp: "+905323020250"
}

const NAV_LINKS = [
  { label: "Neden Biz?", id: "neden-biz" },
  { label: "Çözümler", id: "cozumler" },
  { label: "ERP Entegrasyon", id: "erp" },
  { label: "Planogram", id: "planogram" },
  { label: "Referanslar", id: "referanslar" },
]

const STATS = [
  { value: "20+", label: "Yıl Saha Deneyimi" },
  { value: "%45", label: "Operasyonel Verimlilik Artışı" },
  { value: "30+", label: "Başarılı Proje" },
  { value: "7/24", label: "Teknik Destek" },
]

const SERVICES = [
  {
    id: "tedarik",
    icon: "🔗",
    color: "#f97316",
    bg: "from-orange-600/20 to-orange-500/5",
    border: "border-orange-500/30",
    title: "Tedarik Zinciri Yönetimi",
    subtitle: "Supply Chain",
    desc: "Tedarikçiden müşteriye uzanan tüm zinciri şeffaflaştırıyoruz. Stok kesintilerini, gecikmeleri ve maliyet kaçaklarını gerçek zamanlı verilerle kontrol altına alıyoruz.",
    bullets: [
      "Tedarikçi performans analizi ve puanlama",
      "Talep tahmini & sipariş optimizasyonu",
      "Lojistik maliyet analizi",
      "Kritik stok uyarı sistemleri",
    ]
  },
  {
    id: "depo",
    icon: "🏭",
    color: "#3b82f6",
    bg: "from-blue-600/20 to-blue-500/5",
    border: "border-blue-500/30",
    title: "Depo & Stok Yönetimi",
    subtitle: "Warehouse Management",
    desc: "Deponuzdaki her palet, her raf, her hareket kayıt altında. El terminallerinden merkezi raporlara kadar tam entegre WMS çözümleri sunuyoruz.",
    bullets: [
      "Barkod / RFID ile anlık stok takibi",
      "Lot & seri no bazlı izleme",
      "FIFO / FEFO stok yönetimi",
      "Kapasite optimizasyonu ve slotlama",
    ]
  },
  {
    id: "raporlama",
    icon: "📊",
    color: "#8b5cf6",
    bg: "from-violet-600/20 to-violet-500/5",
    border: "border-violet-500/30",
    title: "Raporlama & İş Zekası",
    subtitle: "Reporting & BI",
    desc: "Verinin içinde boğulmak yerine kararları yönlendiren öngörüler üretiyoruz. Operasyonel dashboardlardan yönetim raporlarına tek platform.",
    bullets: [
      "Gerçek zamanlı KPI dashboardları",
      "Özelleştirilebilir yönetici raporları",
      "Trend analizi ve sapma raporları",
      "Power BI / Excel entegrasyonu",
    ]
  },
  {
    id: "erp",
    icon: "⚙️",
    color: "#10b981",
    bg: "from-emerald-600/20 to-emerald-500/5",
    border: "border-emerald-500/30",
    title: "ERP Sistem Entegrasyonu",
    subtitle: "ERP Integration",
    desc: "Mevcut SAP, Logo, Netsis, Mikro ve diğer ERP sistemlerinizle sorunsuz entegrasyon sağlıyoruz. Veri tekrarı ve manuel aktarım artık geçmişte kalıyor.",
    bullets: [
      "SAP, Logo, Netsis, Mikro entegrasyonları",
      "Middleware & API geliştirme",
      "Veri temizleme & migrasyon",
      "Çoklu sistem senkronizasyonu",
    ]
  },
  {
    id: "planogram",
    icon: "🗂️",
    color: "#f59e0b",
    bg: "from-amber-600/20 to-amber-500/5",
    border: "border-amber-500/30",
    title: "Planogram Yönetimi",
    subtitle: "Planogram Management",
    desc: "Raf alanını satışa çeviren planogram stratejileri geliştiriyoruz. Perakende süreçlerinizde her santimetreyi verimli kullanın.",
    bullets: [
      "Kategori bazlı raf optimizasyonu",
      "Ürün yerleşim analizi",
      "Satış verisiyle raf planı güncellemesi",
      "Dijital planogram arşivi",
    ]
  },
  {
    id: "fsc",
    icon: "🌿",
    color: "#22c55e",
    bg: "from-green-600/20 to-green-500/5",
    border: "border-green-500/30",
    title: "FSC™ Denetim Uyumu",
    subtitle: "FSC Certification",
    desc: "Kağıt & ambalaj sektöründe FSC™ denetimleri için tam dijital altyapı kuruyoruz. Kütle balansı ve lot takibi artık otomatik.",
    bullets: [
      "Kütle balans otomasyonu",
      "Lot bazlı geriye dönük izleme",
      "FSC sertifika kontrol sistemi",
      "Denetim hazırlık danışmanlığı",
    ]
  },
]

const PARTNERS = [
  { name: "TESCOKIPA", industry: "Perakende & Lojistik", desc: "Geniş ölçekli depo operasyonu ve tedarik zinciri optimizasyonu" },
  { name: "ACORE AMBALAJ", industry: "Kağıt & Ambalaj", desc: "FSC™ uyumlu dijital takip altyapısı ve ERP entegrasyonu" },
]

const PROCESS = [
  { num: "01", title: "Saha Analizi", desc: "Mevcut süreçlerinizi yerinde inceliyoruz. Sorunun nerede olduğunu tanımlamadan çözüm önermiyoruz." },
  { num: "02", title: "Çözüm Tasarımı", desc: "İhtiyaçlarınıza özel sistem mimarisi oluşturuyoruz. Hazır şablon değil, gerçek iş akışınıza uygun yapı." },
  { num: "03", title: "Uygulama & Eğitim", desc: "Sistemi kuruyoruz, personeli eğitiyoruz. Sahada bırakmıyoruz." },
  { num: "04", title: "Ölçüm & Optimizasyon", desc: "Canlıya geçtikten sonra KPI'ları takip eder, sistemi sürekli iyileştiririz." },
]

function useCountUp(end, duration = 1500, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    const numeric = parseInt(end.replace(/\D/g, ''))
    if (!numeric) return
    let startTime = null
    const step = (ts) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      setCount(Math.floor(progress * numeric))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start])
  return count
}

function StatCard({ value, label, animate }) {
  const numeric = parseInt(value.replace(/\D/g, ''))
  const prefix = value.replace(/[\d+%]/g, '').trim()
  const suffix = value.includes('%') ? '%' : value.includes('+') ? '+' : ''
  const count = useCountUp(value, 1800, animate)
  const display = numeric ? `${count}${suffix}` : value
  return (
    <div className="text-center">
      <div className="text-4xl md:text-6xl font-black text-orange-500 tabular-nums leading-none">{display}</div>
      <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500 mt-2">{label}</div>
    </div>
  )
}

const SERVICE_METRICS = {
  tedarik:   [{ v: "↓32%", l: "Stok Kesintisi" }, { v: "↑28%", l: "Sipariş İsabeti" }, { v: "↓18%", l: "Lojistik Maliyet" }],
  depo:      [{ v: "98.4%", l: "Stok Doğruluğu" }, { v: "↑45%", l: "Sevkiyat Hızı" }, { v: "↓22%", l: "Fire Oranı" }],
  raporlama: [{ v: "7/24", l: "Canlı Dashboard" }, { v: "↑60%", l: "Karar Hızı" }, { v: "100%", l: "Özelleştirme" }],
  erp:       [{ v: "0", l: "Manuel Aktarım" }, { v: "↑10x", l: "Veri Hızı" }, { v: "%99.9", l: "Senkronizasyon" }],
  planogram: [{ v: "↑31%", l: "Raf Geliri" }, { v: "↓15%", l: "Ölü Stok" }, { v: "↑23%", l: "Kategori Satışı" }],
  fsc:       [{ v: "0", l: "Denetim Açığı" }, { v: "100%", l: "Lot İzleme" }, { v: "↓80%", l: "Hazırlık Süresi" }],
}

function ServicesPanel() {
  const [active, setActive] = useState(0)
  const s = SERVICES[active]
  const metrics = SERVICE_METRICS[s.id]
  return (
    <div className="flex flex-col lg:flex-row gap-0 rounded-[2.5rem] overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
      {/* LEFT: Tab list */}
      <div className="lg:w-72 shrink-0" style={{ backgroundColor: 'rgba(5,10,20,0.95)' }}>
        <div className="p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <div className="text-[8px] font-black uppercase tracking-[0.4em]" style={{ color: '#64748b' }}>Hizmet Alanları</div>
        </div>
        {SERVICES.map((svc, i) => {
          const isActive = i === active
          return (
            <button
              key={svc.id}
              onClick={() => setActive(i)}
              className="w-full text-left transition-all duration-200"
              style={{
                padding: '1.1rem 1.5rem',
                backgroundColor: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                borderLeft: isActive ? `3px solid ${svc.color}` : '3px solid transparent',
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.025)' }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl shrink-0">{svc.icon}</span>
                <div>
                  <div className="text-xs font-black uppercase tracking-tight leading-none" style={{ color: isActive ? '#fff' : '#64748b' }}>{svc.title}</div>
                  <div className="text-[8px] font-bold uppercase tracking-widest mt-0.5" style={{ color: isActive ? svc.color : '#334155' }}>{svc.subtitle}</div>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* RIGHT: Detail panel */}
      <div className="flex-1 p-10 lg:p-14 flex flex-col justify-between" style={{ backgroundColor: 'rgba(10,16,30,0.97)' }}>
        {/* Header */}
        <div>
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="text-[9px] font-black uppercase tracking-[0.4em] mb-3" style={{ color: s.color }}>{s.subtitle}</div>
              <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-none" style={{ color: '#ffffff' }}>{s.title}</h3>
            </div>
            <span className="text-5xl leading-none shrink-0 ml-4">{s.icon}</span>
          </div>
          <p className="text-base font-light leading-relaxed mb-10" style={{ color: '#94a3b8', maxWidth: '520px' }}>{s.desc}</p>

          {/* Bullet capabilities */}
          <div className="grid sm:grid-cols-2 gap-3 mb-10">
            {s.bullets.map((b, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                <span className="text-xs font-bold uppercase tracking-wide" style={{ color: '#cbd5e1' }}>{b}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Metrics footer */}
        <div className="grid grid-cols-3 gap-4 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          {metrics.map((m, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-black leading-none mb-1" style={{ color: s.color }}>{m.v}</div>
              <div className="text-[9px] font-bold uppercase tracking-[0.25em]" style={{ color: '#475569' }}>{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function WhatsAppWidget() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState([])
  useEffect(() => { setTimeout(() => setVisible(true), 2500) }, [])

  const canSend = selected.length > 0
  const waUrl = canSend ? `https://wa.me/${BRAND.whatsapp}?text=${buildWAMessage(selected)}` : '#'

  return (
    <div className={`fixed bottom-8 right-8 z-[999] flex flex-col items-end gap-3 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* Chat bubble */}
      {open && (
        <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ width: '320px', backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.1)' }}>
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4" style={{ backgroundColor: '#075E54' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xl" style={{ backgroundColor: '#128C7E' }}>💬</div>
            <div>
              <div className="text-sm font-black text-white">ARD Sistem</div>
              <div className="text-[10px] text-green-200 font-medium">● Çevrimiçi</div>
            </div>
            <button onClick={() => setOpen(false)} className="ml-auto text-white/60 hover:text-white text-xl leading-none">×</button>
          </div>

          {/* Body */}
          <div className="p-4" style={{ backgroundColor: '#ece5dd' }}>
            <div className="rounded-xl rounded-tl-none p-3 shadow-sm" style={{ backgroundColor: '#fff', maxWidth: 260 }}>
              <p className="text-slate-700 leading-relaxed text-[13px]">Merhaba! 👋 Hangi konuda yardımcı olabiliriz?</p>
              <div className="text-[9px] text-right mt-1" style={{ color: '#94a3b8' }}>ARD Sistem</div>
            </div>
          </div>

          {/* Service selector */}
          <div className="px-4 py-4" style={{ backgroundColor: '#f0f2f5', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: '#475569' }}>Hangi hizmeti görüşelim?</div>
            <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
              {SERVICE_OPTIONS.map(svc => {
                const checked = selected.includes(svc.id)
                return (
                  <button
                    key={svc.id}
                    onClick={() => setSelected(checked ? selected.filter(s => s !== svc.id) : [...selected, svc.id])}
                    className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-left transition-all"
                    style={{
                      backgroundColor: checked ? 'rgba(249,115,22,0.1)' : 'rgba(255,255,255,0.7)',
                      border: checked ? '1px solid rgba(249,115,22,0.5)' : '1px solid rgba(0,0,0,0.08)',
                    }}
                  >
                    <span style={{
                      width: 16, height: 16, borderRadius: 4, flexShrink: 0, display: 'inline-flex',
                      alignItems: 'center', justifyContent: 'center',
                      backgroundColor: checked ? '#f97316' : 'transparent',
                      border: `1.5px solid ${checked ? '#f97316' : '#cbd5e1'}`,
                    }}>
                      {checked && <span style={{ color: '#fff', fontSize: 9, fontWeight: 900 }}>✓</span>}
                    </span>
                    <span style={{ fontSize: 13 }}>{svc.icon}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: checked ? '#111' : '#64748b' }}>{svc.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* CTA */}
          <a
            href={canSend ? waUrl : undefined}
            target={canSend ? "_blank" : undefined}
            rel="noreferrer"
            onClick={e => !canSend && e.preventDefault()}
            className="flex items-center justify-center gap-2 py-4 text-sm font-black text-white uppercase tracking-wider transition-all"
            style={{
              backgroundColor: canSend ? '#25D366' : '#94a3b8',
              cursor: canSend ? 'pointer' : 'not-allowed',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.874L0 24l6.335-1.51A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.367l-.36-.214-3.73.888.934-3.617-.234-.37A9.818 9.818 0 1112 21.818z"/>
            </svg>
            {canSend ? `WhatsApp'ta Başlat (${selected.length} Hizmet)` : 'Önce Hizmet Seçin'}
          </a>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-3 rounded-full font-black text-white text-sm shadow-2xl transition-all duration-300"
        style={{
          backgroundColor: '#25D366',
          padding: open ? '1rem' : '1rem 1.5rem',
          boxShadow: '0 8px 32px rgba(37,211,102,0.35)',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.874L0 24l6.335-1.51A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.367l-.36-.214-3.73.888.934-3.617-.234-.37A9.818 9.818 0 1112 21.818z"/>
        </svg>
        {!open && <span>WhatsApp ile Yaz</span>}
      </button>
    </div>
  )
}

const SERVICE_OPTIONS = [
  { id: "tedarik",   label: "Tedarik Zinciri Yönetimi",  icon: "🔗" },
  { id: "depo",      label: "Depo & Stok Yönetimi",       icon: "🏭" },
  { id: "raporlama", label: "Raporlama & İş Zekası",      icon: "📊" },
  { id: "erp",       label: "ERP Sistem Entegrasyonu",    icon: "⚙️" },
  { id: "planogram", label: "Planogram Yönetimi",         icon: "🗂️" },
  { id: "fsc",       label: "FSC™ Denetim Uyumu",         icon: "🌿" },
]

function buildWAMessage(selected) {
  const names = selected.length === SERVICE_OPTIONS.length
    ? "tüm hizmet alanlarınız"
    : selected.map(id => SERVICE_OPTIONS.find(s => s.id === id)?.label).filter(Boolean).join(", ")
  return encodeURIComponent(`Merhaba ARD Sistem, "${names}" konusunda bilgi almak istiyorum. Benimle iletişime geçer misiniz?`)
}

function buildMailBody(selected) {
  const names = selected.length === SERVICE_OPTIONS.length
    ? "Tüm Hizmet Alanları"
    : selected.map(id => SERVICE_OPTIONS.find(s => s.id === id)?.label).filter(Boolean).join("\n• ")
  return encodeURIComponent(`Merhaba,\n\nAşağıdaki hizmetler hakkında bilgi almak istiyorum:\n\n• ${names}\n\nLütfen benimle iletişime geçin.\n\nSaygılarımla`)
}

function ServiceCheckboxes({ selected, onChange, theme = "dark" }) {
  const isDark = theme === "dark"
  const toggle = (id) => {
    onChange(selected.includes(id) ? selected.filter(s => s !== id) : [...selected, id])
  }
  const allSelected = selected.length === SERVICE_OPTIONS.length
  const toggleAll = () => onChange(allSelected ? [] : SERVICE_OPTIONS.map(s => s.id))

  return (
    <div>
      {/* Select All */}
      <button
        onClick={toggleAll}
        className="mb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all"
        style={{ color: allSelected ? '#f97316' : isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }}
      >
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          width: 18, height: 18, borderRadius: 5, border: `2px solid ${allSelected ? '#f97316' : isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
          backgroundColor: allSelected ? '#f97316' : 'transparent', flexShrink: 0, transition: 'all 0.2s'
        }}>
          {allSelected && <span style={{ color: '#fff', fontSize: 10, fontWeight: 900 }}>✓</span>}
        </span>
        {allSelected ? "Seçimi Kaldır" : "Tümünü Seç"}
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {SERVICE_OPTIONS.map(svc => {
          const checked = selected.includes(svc.id)
          return (
            <button
              key={svc.id}
              onClick={() => toggle(svc.id)}
              className="flex items-center gap-3 text-left rounded-xl px-4 py-3 transition-all duration-200"
              style={{
                backgroundColor: checked
                  ? isDark ? 'rgba(249,115,22,0.15)' : 'rgba(249,115,22,0.1)'
                  : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                border: checked
                  ? '1.5px solid rgba(249,115,22,0.6)'
                  : isDark ? '1.5px solid rgba(255,255,255,0.07)' : '1.5px solid rgba(0,0,0,0.08)',
              }}
            >
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 18, height: 18, borderRadius: 5, flexShrink: 0, transition: 'all 0.2s',
                border: `2px solid ${checked ? '#f97316' : isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
                backgroundColor: checked ? '#f97316' : 'transparent',
              }}>
                {checked && <span style={{ color: '#fff', fontSize: 10, fontWeight: 900, lineHeight: 1 }}>✓</span>}
              </span>
              <span style={{ fontSize: 16 }}>{svc.icon}</span>
              <span className="text-xs font-bold" style={{ color: checked ? (isDark ? '#fff' : '#111') : isDark ? '#64748b' : '#475569' }}>
                {svc.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ContactSelector() {
  const [selected, setSelected] = useState([])
  const canContact = selected.length > 0
  const waUrl = `https://wa.me/${BRAND.whatsapp}?text=${buildWAMessage(selected)}`
  const mailUrl = `mailto:${BRAND.email}?subject=${encodeURIComponent('Hizmet Talebi — ARD Sistem')}&body=${buildMailBody(selected)}`

  return (
    <div className="max-w-4xl mx-auto rounded-[2.5rem] overflow-hidden" style={{ backgroundColor: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.15)' }}>
      <div className="p-8 md:p-12">
        {/* Step 1 */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-7 h-7 rounded-full flex items-center justify-center font-black text-xs" style={{ backgroundColor: '#fff', color: '#ea580c' }}>1</div>
          <div className="font-black text-sm uppercase tracking-widest text-white">Hangi hizmeti görüşmek istiyorsunuz?</div>
        </div>
        <ServiceCheckboxes selected={selected} onChange={setSelected} theme="dark" />

        {/* Step 2 */}
        <div className="mt-10 pt-8" style={{ borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-7 h-7 rounded-full flex items-center justify-center font-black text-xs" style={{ backgroundColor: canContact ? '#fff' : 'rgba(255,255,255,0.2)', color: canContact ? '#ea580c' : 'rgba(255,255,255,0.4)', transition: 'all 0.3s' }}>2</div>
            <div className="font-black text-sm uppercase tracking-widest" style={{ color: canContact ? '#fff' : 'rgba(255,255,255,0.35)' }}>
              {canContact ? `${selected.length} hizmet seçildi — nasıl ulaşalım?` : "Önce yukarıdan hizmet seçin"}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {/* WhatsApp */}
            <a
              href={canContact ? waUrl : undefined}
              target={canContact ? "_blank" : undefined}
              rel="noreferrer"
              onClick={e => !canContact && e.preventDefault()}
              className="flex flex-col items-center gap-3 rounded-2xl py-6 px-4 text-center font-black text-sm uppercase tracking-wider transition-all"
              style={{
                backgroundColor: canContact ? '#25D366' : 'rgba(255,255,255,0.08)',
                color: '#fff',
                opacity: canContact ? 1 : 0.4,
                cursor: canContact ? 'pointer' : 'not-allowed',
                border: '1.5px solid transparent',
              }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.535 5.874L0 24l6.335-1.51A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.003-1.367l-.36-.214-3.73.888.934-3.617-.234-.37A9.818 9.818 0 1112 21.818z"/>
              </svg>
              WhatsApp'ta Yaz
            </a>

            {/* E-posta */}
            <a
              href={canContact ? mailUrl : undefined}
              onClick={e => !canContact && e.preventDefault()}
              className="flex flex-col items-center gap-3 rounded-2xl py-6 px-4 text-center font-black text-sm uppercase tracking-wider transition-all"
              style={{
                backgroundColor: canContact ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.08)',
                color: canContact ? '#ea580c' : '#fff',
                opacity: canContact ? 1 : 0.4,
                cursor: canContact ? 'pointer' : 'not-allowed',
              }}
            >
              <span style={{ fontSize: 24 }}>✉️</span>
              E-Posta Gönder
            </a>

            {/* Telefon */}
            <a
              href={`tel:${BRAND.phone}`}
              className="flex flex-col items-center gap-3 rounded-2xl py-6 px-4 text-center font-black text-sm uppercase tracking-wider transition-all text-white"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.2)' }}
            >
              <span style={{ fontSize: 24 }}>📞</span>
              {BRAND.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const statsRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true) },
      { threshold: 0.4 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const scroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <main className="min-h-screen text-slate-100 font-sans overflow-x-hidden" style={{ backgroundColor: '#05080f', color: '#f1f5f9' }}>

      {/* ── NAV ── */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${scrolled ? 'backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`} style={scrolled ? { backgroundColor: 'rgba(5,8,15,0.96)' } : {}}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <button onClick={() => scroll('top')} className="flex items-center group">
            <img src="/logo-main.svg" alt="ARD Sistem Logo" style={{ height: '90px', width: 'auto' }} />
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(l => (
              <button key={l.id} onClick={() => scroll(l.id)} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-orange-400 transition-colors">{l.label}</button>
            ))}
            <button
              onClick={() => scroll('iletisim')}
              className="bg-orange-600 text-white px-7 py-3 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-orange-500 transition-all shadow-lg shadow-orange-600/25 flex items-center gap-2">
              <span className="animate-pulse">●</span> Ücretsiz Analiz
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="lg:hidden text-slate-300 hover:text-white" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="space-y-1.5">
              <div className={`w-6 h-0.5 bg-current transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-6 h-0.5 bg-current transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden border-t border-white/5 px-6 py-6 space-y-4" style={{ backgroundColor: '#05080f' }}>
            {NAV_LINKS.map(l => (
              <button key={l.id} onClick={() => scroll(l.id)} className="block text-left text-sm font-black uppercase tracking-widest text-slate-300 hover:text-orange-400 w-full py-2">{l.label}</button>
            ))}
            <button onClick={() => scroll('iletisim')}
              className="block w-full text-center bg-orange-600 text-white px-6 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-orange-500 mt-4">
              Ücretsiz Analiz Talep Et
            </button>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="top" className="relative min-h-screen flex items-center overflow-hidden" style={{ backgroundColor: '#05080f' }}>
        {/* BG image */}
        <div className="absolute inset-0 z-0">
          <img src="/tedarik_zinciri.png" alt="" className="w-full h-full object-cover" style={{ opacity: 0.15 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, #05080f 50%, transparent 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #05080f 10%, transparent 60%)' }} />
        </div>
        {/* BG grid */}
        <div className="absolute inset-0 z-0" style={{ opacity: 0.03, backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #fff 0px, transparent 1px, transparent 60px)' }} />
        {/* BG glow */}
        <div className="absolute top-1/4 right-0 w-[700px] h-[700px] rounded-full z-0" style={{ background: 'radial-gradient(circle, rgba(234,88,12,0.12) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full z-0" style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)' }} />

        <div className="relative z-10 container mx-auto px-6 pt-28 pb-20">
          <div className="max-w-6xl">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-10 text-[10px] font-black tracking-[0.3em] uppercase rounded-full" style={{ color: '#fb923c', backgroundColor: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.25)' }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#f97316' }} />
              Endüstriyel Dijital Dönüşüm Uzmanları
            </div>

            {/* Headline */}
            <h1 className="font-black leading-[0.88] tracking-tighter uppercase mb-10" style={{ fontSize: 'clamp(3rem, 10vw, 9rem)', color: '#ffffff' }}>
              Operasyonun<br />
              <span className="italic" style={{ color: '#f97316' }}>Her Katmanı</span><br />
              Kontrol Altında
            </h1>

            <p className="text-lg md:text-2xl font-light leading-relaxed max-w-3xl mb-14" style={{ color: '#94a3b8' }}>
              Tedarik zincirinden depoya, ERP entegrasyonundan planograma — üretim ve perakende operasyonlarınızı gerçek veriyle yönetmenizi sağlıyoruz.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-5">
              <button onClick={() => scroll('cozumler')}
                className="flex items-center gap-3 group font-black text-base rounded-full transition-all"
                style={{ backgroundColor: '#ea580c', color: '#ffffff', padding: '1.25rem 2.5rem' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f97316'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = '#ea580c'}>
                Çözümleri İncele
                <span className="group-hover:translate-x-1.5 transition-transform inline-block">→</span>
              </button>
              <button onClick={() => scroll('neden-biz')}
                className="font-black text-base rounded-full transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#ffffff', padding: '1.25rem 2.5rem' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                Neden Biz?
              </button>
            </div>

            {/* Mini badges */}
            <div className="flex flex-wrap gap-3 mt-12">
              {['Tedarik Zinciri', 'Depo Yönetimi', 'Raporlama & BI', 'ERP Entegrasyon', 'Planogram', 'FSC™ Uyum'].map(t => (
                <span key={t} className="text-[9px] font-bold uppercase tracking-[0.25em] rounded-full px-4 py-2" style={{ color: '#64748b', backgroundColor: 'rgba(30,41,59,0.6)', border: '1px solid rgba(255,255,255,0.07)' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce" style={{ opacity: 0.4 }}>
          <div className="w-px h-12" style={{ background: 'linear-gradient(to bottom, transparent, #f97316)' }} />
          <span className="text-[8px] font-black uppercase tracking-[0.3em]" style={{ color: '#f97316' }}>Keşfet</span>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section ref={statsRef} className="py-20 border-y border-white/5" style={{ backgroundColor: 'rgba(15,23,42,0.6)' }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {STATS.map(s => <StatCard key={s.label} value={s.value} label={s.label} animate={statsVisible} />)}
          </div>
        </div>
      </section>

      {/* ── NEDEN BİZ ── */}
      <section id="neden-biz" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Neden ARD Sistem?</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase mt-4 mb-8">
                Teoriyle Değil<br /><span className="text-orange-500 italic">Sahada</span> Öğrendik
              </h2>
              <p className="text-xl text-slate-400 font-light leading-relaxed mb-10">
                TescoKipa ve Acore Ambalaj gibi sektör devlerinde edindiğimiz gerçek saha deneyimiyle danışmanlık yapıyoruz. Danışmanımız ofiste değil, fabrikanızda çalışır.
              </p>
              <div className="space-y-6">
                {[
                  { t: "Hızlı Adaptasyon", d: "Karmaşık sistemleri personelin en kolay kullanacağı hale getiriyoruz. Değişim direncini anlıyor, yönetiyoruz." },
                  { t: "Ölçülebilir Sonuç", d: "Sistemi kurup gitmiyoruz. Verimlilik artışını rakamlarla kanıtlıyoruz, KPI'ları birlikte takip ediyoruz." },
                  { t: "Çok Sistemli Uzmanlık", d: "SAP'tan Logo'ya, WMS'ten planogram yazılımlarına — farklı platform deneyimimiz ile doğru sistemi seçiyoruz." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 items-start group">
                    <div className="w-10 h-10 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 group-hover:bg-orange-500/20 transition-colors">
                      <span className="text-orange-500 font-black text-sm">0{i + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-black text-base uppercase tracking-tight text-white mb-1">{item.t}</h4>
                      <p className="text-sm text-slate-500 leading-snug">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual side */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-[3rem]" style={{ background: 'linear-gradient(135deg, rgba(249,115,22,0.15) 0%, transparent 70%)' }} />
              <img
                src="/stok.png"
                alt="ARD Sistem saha operasyonu"
                className="relative z-10 w-full rounded-[2.5rem] object-cover"
                style={{ height: '520px', boxShadow: '0 32px 80px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
              />
              <div className="absolute bottom-6 left-6 right-6 z-20 p-5 rounded-2xl" style={{ backgroundColor: 'rgba(5,8,15,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="grid grid-cols-3 gap-4">
                  {[{ v: "↓ 28%", l: "Stok Fazlası" }, { v: "↑ 45%", l: "Sevkiyat Hızı" }, { v: "↓ 19%", l: "İade Oranı" }].map((m, i) => (
                    <div key={i} className="text-center">
                      <div className="text-xl font-black text-white">{m.v}</div>
                      <div className="text-[8px] uppercase tracking-[0.2em] font-bold mt-1" style={{ color: '#64748b' }}>{m.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ÇÖZÜMLER ── */}
      <section id="cozumler" className="py-32" style={{ backgroundColor: '#05080f' }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: '#f97316' }}>Hizmet Alanlarımız</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase mt-4" style={{ color: '#fff' }}>
                Uçtan Uca<br /><span style={{ color: '#f97316', fontStyle: 'italic' }}>Çözüm Paketi</span>
              </h2>
            </div>
            <p className="text-lg max-w-md font-light leading-relaxed" style={{ color: '#475569' }}>
              Tedarik zincirinin her halkasını kapsayan entegre danışmanlık hizmetleri. Bir hizmeti seçerek detayları inceleyin.
            </p>
          </div>
          <ServicesPanel />
        </div>
      </section>

      {/* ── ERP ENTEGRASYON DEEP-DIVE ── */}
      <section id="erp" className="py-32 bg-white text-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600">ERP Sistem Entegrasyonu</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase mt-4 mb-8">
                Sistemler<br /><span className="text-emerald-600 italic">Birbirine Konuşsun</span>
              </h2>
              <p className="text-xl text-slate-500 font-light leading-relaxed mb-10">
                Depo yazılımınız, muhasebe programınız ve ERP'niz ayrı dillerde konuşuyor mu? Tüm sistemleri tek bir veri akışına bağlıyoruz.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {['SAP Business One', 'Logo Tiger 3', 'Netsis ERP', 'Micro ERP', 'Özel / Legacy Sistemler', 'WMS / TMS Entegrasyonu'].map((p, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all group">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-sm font-bold text-slate-700 group-hover:text-emerald-700 transition-colors">{p}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Integration visual */}
            <div className="relative">
              <img
                src="/uretim_planlama.png"
                alt="ERP entegrasyon saha"
                className="w-full rounded-[2.5rem] object-cover"
                style={{ height: '500px', boxShadow: '0 24px 60px rgba(0,0,0,0.15)', border: '1px solid rgba(16,185,129,0.2)' }}
              />
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl" style={{ backgroundColor: 'rgba(5,8,15,0.88)', backdropFilter: 'blur(12px)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <div className="text-[8px] font-black uppercase tracking-widest text-emerald-400 mb-3">Entegrasyon Sonuçları</div>
                <div className="grid grid-cols-3 gap-3">
                  {[{ v: "0", l: "Manuel Aktarım" }, { v: "↑10x", l: "Veri Hızı" }, { v: "%99.9", l: "Senkronizasyon" }].map((m, i) => (
                    <div key={i} className="text-center">
                      <div className="text-xl font-black text-white">{m.v}</div>
                      <div className="text-[8px] uppercase tracking-widest font-bold mt-1" style={{ color: '#475569' }}>{m.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PLANOGRAM ── */}
      <section id="planogram" className="py-32 bg-white border-t border-slate-100 text-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            {/* Visual first on desktop */}
            <div className="order-2 lg:order-1 relative">
              <img
                src="/planogram.png"
                alt="Planogram saha uygulaması"
                className="w-full rounded-[2.5rem] object-cover"
                style={{ height: '480px', boxShadow: '0 24px 60px rgba(0,0,0,0.15)', border: '1px solid rgba(245,158,11,0.2)' }}
              />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <div className="text-[8px] font-black uppercase tracking-[0.3em] text-amber-600 mb-2">Raf Optimizasyonu Sonrası</div>
                <div className="grid grid-cols-3 gap-3">
                  {[{ v: "↑ %31", l: "Satış Artışı" }, { v: "↓ %15", l: "Ölü Stok" }, { v: "↑ %23", l: "Kategori Geliri" }].map((m, i) => (
                    <div key={i} className="text-center">
                      <div className="text-lg font-black text-amber-600">{m.v}</div>
                      <div className="text-[8px] uppercase tracking-widest font-bold text-slate-500">{m.l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-600">Planogram Yönetimi</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase mt-4 mb-8">
                Her Raf,<br /><span className="text-amber-600 italic">Maksimum Satış</span>
              </h2>
              <p className="text-xl text-slate-500 font-light leading-relaxed mb-10">
                Ürünlerin rafta nerede durduğu satışları doğrudan etkiler. Veri odaklı planogram stratejileriyle satış başına raf verimliliğini artırıyoruz.
              </p>
              <div className="space-y-4">
                {[
                  "Satış verisiyle desteklenen raf planlaması",
                  "Kategori yönetimi ve segment analizi",
                  "Mevsimsel & kampanya planogram güncellemesi",
                  "Dijital planogram arşivi ve şube senkronizasyonu",
                  "Göz hizası ve çapraz satış optimizasyonu",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                    <span className="w-6 h-6 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-600 text-xs shrink-0">✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SÜREÇ ── */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Nasıl Çalışıyoruz?</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase mt-4">
              4 Adımda<br /><span className="text-orange-500 italic">Dönüşüm</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => (
              <div key={i} className="relative group">
                {i < PROCESS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-orange-500/40 to-transparent z-0" />
                )}
                <div className="relative bg-slate-900/60 border border-white/6 rounded-3xl p-8 group-hover:border-orange-500/30 transition-all duration-300">
                  <div className="text-5xl font-black leading-none mb-4" style={{ color: 'rgba(249,115,22,0.6)' }}>{p.num}</div>
                  <h4 className="text-lg font-black uppercase tracking-tight text-white mb-3">{p.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REFERANSLAR ── */}
      <section id="referanslar" className="py-32 border-y border-white/5" style={{ backgroundColor: 'rgba(2,6,23,0.9)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">İş Ortaklarımız</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase mt-4">
              Güvendikleri<br /><span className="text-orange-500 italic">Firmalar</span>
            </h2>
          </div>

          {/* Hero image */}
          <div className="relative rounded-[2.5rem] overflow-hidden mb-14" style={{ height: '360px' }}>
            <img src="/depo_stok.png" alt="ARD Sistem referans operasyon" className="w-full h-full object-cover" style={{ opacity: 0.7 }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(2,6,23,0.95) 0%, rgba(2,6,23,0.4) 60%, transparent 100%)' }} />
            <div className="absolute inset-0 flex items-center px-14">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-4">20+ Yıl Saha Deneyimi</div>
                <div className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight leading-tight max-w-lg">
                  Teoriyle Değil,<br /><span className="text-orange-400">Sahada</span> Kanıtladık
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {PARTNERS.map((p, i) => (
              <div key={i} className="bg-slate-900/80 border border-white/8 rounded-3xl p-10 hover:border-orange-500/30 transition-all group">
                <div className="text-[8px] font-black uppercase tracking-[0.35em] text-orange-500/60 mb-4">{p.industry}</div>
                <div className="text-3xl md:text-4xl font-black text-white tracking-tighter group-hover:text-orange-400 transition-colors mb-4">{p.name}</div>
                <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
                <div className="mt-6 w-12 h-0.5 bg-orange-500/40 group-hover:w-24 transition-all duration-500" />
              </div>
            ))}
          </div>
          <p className="text-center text-slate-600 text-xs font-bold uppercase tracking-widest mt-14">
            Referanslarımız hakkında detaylı bilgi için bizimle iletişime geçin.
          </p>
        </div>
      </section>

      {/* ── İLETİŞİM CTA ── */}
      <section id="iletisim" className="py-32 relative overflow-hidden" style={{ backgroundColor: '#ea580c' }}>
        <div className="absolute top-0 right-0 rounded-full" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(251,146,60,0.45) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 rounded-full" style={{ width: 300, height: 300, background: 'radial-gradient(circle, rgba(154,52,18,0.45) 0%, transparent 70%)' }} />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none text-white mb-6">
              Dönüşümü<br />
              <span className="italic" style={{ color: 'rgba(0,0,0,0.45)' }}>Birlikte Başlatalım</span>
            </h2>
            <p className="text-xl font-light max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Hangi konuda destek almak istediğinizi seçin, ardından size en uygun kanaldan ulaşın.
            </p>
          </div>

            {/* Contact person */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10 p-6 rounded-2xl" style={{ backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="w-14 h-14 rounded-full flex items-center justify-center font-black text-lg shrink-0" style={{ backgroundColor: 'rgba(249,115,22,0.2)', border: '2px solid rgba(249,115,22,0.4)', color: '#f97316' }}>ÖG</div>
            <div className="text-center sm:text-left">
              <div className="font-black text-white text-base uppercase tracking-wide">{BRAND.name}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>Yetkili Danışman</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:ml-auto">
              <a href={`tel:${BRAND.phone}`} className="text-xs font-black px-4 py-2 rounded-full transition-all" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }}>
                📞 {BRAND.phone}
              </a>
              <a href={`mailto:${BRAND.email}`} className="text-xs font-black px-4 py-2 rounded-full transition-all" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)' }}>
                ✉️ {BRAND.email}
              </a>
            </div>
          </div>
          <ContactSelector />

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-16 font-bold uppercase tracking-widest text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
            <span>📍 {BRAND.address}</span>
            <span className="hidden md:block">·</span>
            <span>⏰ Hafta İçi 09:00 – 18:00</span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-14 border-t border-white/10" style={{ backgroundColor: '#0d1117' }}>
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <img src="/logo-main.svg" alt="ARD Sistem Logo" style={{ height: '70px', width: 'auto' }} />
          </div>
          <div className="flex flex-wrap justify-center gap-8 text-[9px] font-black uppercase tracking-widest" style={{ color: '#94a3b8' }}>
            {NAV_LINKS.map(l => (
              <button key={l.id} onClick={() => scroll(l.id)} className="hover:text-orange-500 transition-colors">{l.label}</button>
            ))}
          </div>
          <div className="text-center md:text-right">
            <div className="text-[9px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: '#64748b' }}>© {new Date().getFullYear()} ARD SİSTEM</div>
            <div className="flex gap-4 justify-center md:justify-end text-[9px] font-black uppercase tracking-widest" style={{ color: '#64748b' }}>
              <a href="#" className="hover:text-slate-300 transition-colors">KVKK</a>
              <a href="#" className="hover:text-slate-300 transition-colors">Çerez Politikası</a>
            </div>
          </div>
        </div>
      </footer>
      <WhatsAppWidget />
    </main>
  )
}
