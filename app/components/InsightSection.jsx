/**
 * InsightSection — "Sahadan notlar" içgörü/blog teaser bölümü.
 * İçerik app/blog/posts.js'ten gelir; kartlar /blog/[slug] sayfalarına gider (SEO-indexable).
 */
import { POSTS } from '../blog/posts'

export default function InsightSection() {
  return (
    <section id="insights" style={{ fontFamily: "'Manrope', system-ui, sans-serif", background: '#0A0E12', color: '#F2F5F7', padding: '72px 24px', boxSizing: 'border-box' }}>
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
          {POSTS.map((p) => (
            <a key={p.slug} href={`/blog/${p.slug}`} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', background: '#12181F', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: 26, cursor: 'pointer', fontFamily: "'Manrope', sans-serif", textDecoration: 'none', color: 'inherit' }}>
              <span style={{ display: 'inline-block', alignSelf: 'flex-start', fontSize: 11.5, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: p.color, background: p.color + '18', padding: '5px 12px', borderRadius: 99, marginBottom: 16 }}>{p.tag}</span>
              <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 18, lineHeight: 1.32, marginBottom: 10 }}>{p.title}</div>
              <p style={{ color: '#9BA6B2', fontSize: 14, lineHeight: 1.6, margin: '0 0 20px', flex: 1 }}>{p.excerpt}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', color: '#6E7C89', fontSize: 12.5, fontWeight: 500 }}>
                <span>{p.readTime} okuma</span>
                <span style={{ color: p.color }}>Devamını oku →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
