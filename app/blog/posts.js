// Shared blog content — rendered both in the landing teaser and on /blog/[slug] pages.
export const POSTS = [
  {
    slug: 'depo-yonetiminde-5-verimlilik-kacagi',
    tag: 'Depo Yönetimi', color: '#F5B301',
    title: 'Depo yönetiminde en sık karşılaşılan 5 verimlilik kaçağı',
    excerpt: 'Manuel sayım hataları, yanlış yerleşim ve kopuk sistemler — sahada en çok gördüğümüz 5 kayıp noktası ve çözüm yaklaşımı.',
    readTime: '4 dk',
    body: [
      'Sahada yürüttüğümüz onlarca operasyonda karşımıza sürekli aynı 5 verimlilik kaçağı çıkıyor: manuel stok sayımı, optimize edilmemiş yerleşim, sistemler arası kopukluk, reaktif (öngörüsüz) sipariş planlama ve ölçülmeyen sevkiyat performansı.',
      'Bunların ortak noktası, hiçbirinin büyük bir yatırım gerektirmemesi — çoğu, doğru veri akışı ve basit süreç disiplini ile kısa sürede düzeltilebiliyor.',
      'Kendi operasyonunuzda hangi kaçakların olduğunu görmek isterseniz, ücretsiz ön analizimizle başlayabiliriz.',
    ],
  },
  {
    slug: 'sistemleriniz-neden-birbiriyle-konusmuyor',
    tag: 'ERP Entegrasyonu', color: '#38BDF8',
    title: 'Sistemleriniz neden birbiriyle konuşmuyor?',
    excerpt: 'Depo, üretim ve muhasebe ayrı adalar gibi çalışıyorsa, veri kopukluğu büyümenin önündeki en büyük engel hâline gelir.',
    readTime: '5 dk',
    body: [
      'Çoğu operasyonda depo, üretim planlama ve muhasebe sistemleri zamanla ayrı ayrı satın alınmış, birbirinden habersiz çalışan adacıklara dönüşür.',
      'Bu kopukluk, veri girişini tekrar tekrar yaptırır, hata oranını artırır ve yöneticinin gerçek zamanlı görünürlüğünü ortadan kaldırır.',
      'Bir middleware katmanı, bu sistemleri değiştirmeden aralarında gerçek zamanlı bir köprü kurar — dönüşüm sandığınızdan daha az maliyetli olabilir.',
    ],
  },
  {
    slug: 'talep-tahmini-olmadan-buyumek-neden-riskli',
    tag: 'Planlama', color: '#26D07C',
    title: 'Talep tahmini olmadan büyümek neden risklidir?',
    excerpt: 'Geçmiş verilere değil sezgiye dayalı sipariş planlaması, ya stoksuz kalmanıza ya da elde fazla stokla kalmanıza yol açar.',
    readTime: '3 dk',
    body: [
      'Sezgiyle yapılan sipariş planlaması kısa vadede işe yarar gibi görünse de, büyüme ile birlikte hata payı katlanarak büyür.',
      'Sistematik bir talep tahmin modeli, geçmiş satış verisini mevsimsellik ve trendle birleştirerek stok kararlarını veriye dayandırır.',
      'Küçük bir pilot uygulamayla bile, stok fazlası ve stoksuzluk arasındaki dengeyi ölçülebilir şekilde iyileştirmek mümkün.',
    ],
  },
]
