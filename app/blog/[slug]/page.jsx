import { POSTS } from '../posts'

const WA_NUMBER = '905323020250'

export function generateStaticParams() {
  return POSTS.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }) {
  const post = POSTS.find(p => p.slug === params.slug)
  if (!post) return {}
  return {
    title: `${post.title} — ARD Sistem`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: 'article' },
  }
}

export default function BlogPost({ params }) {
  const post = POSTS.find(p => p.slug === params.slug)
  if (!post) return null
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0A0E12', color: '#F2F5F7', padding: '60px 24px', fontFamily: "'Manrope', system-ui, sans-serif" }}>
      <article style={{ maxWidth: 720, margin: '0 auto' }}>
        <a href="/#insights" style={{ color: '#f97316', fontSize: 13, fontWeight: 700, textDecoration: 'none' }}>← Ana Sayfa</a>
        <div style={{ marginTop: 28 }}>
          <span style={{ display: 'inline-block', fontSize: 11.5, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: post.color, background: post.color + '18', padding: '5px 12px', borderRadius: 99, marginBottom: 16 }}>{post.tag}</span>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 'clamp(26px,4vw,38px)', lineHeight: 1.2, margin: '0 0 10px', letterSpacing: '-0.02em' }}>{post.title}</h1>
          <div style={{ color: '#6E7C89', fontSize: 13, marginBottom: 30 }}>{post.readTime} okuma · ARD Sistem — Sahadan Notlar</div>
        </div>
        {post.body.map((para, i) => (
          <p key={i} style={{ color: '#C4CDD6', fontSize: 16, lineHeight: 1.75, margin: '0 0 18px' }}>{para}</p>
        ))}
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent('Merhaba, "' + post.title + '" konusuyla ilgili görüşmek istiyorum.')}`}
          target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-flex', marginTop: 16, padding: '13px 22px', borderRadius: 12, background: post.color, color: '#0A0E12', fontWeight: 700, fontSize: 14, textDecoration: 'none' }}
        >
          Bu konuyu bizimle konuşun →
        </a>
      </article>
    </main>
  )
}
