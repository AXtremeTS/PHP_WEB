import { ArrowRight, ArrowUpRight, BadgeCheck, Cpu, Headphones, Monitor, PackageCheck, ShieldCheck, Sparkles, Truck, Zap } from 'lucide-react'
import { Head, Link } from '@inertiajs/react'
import { ProductGrid } from '../components/ProductCard'
import { Reveal } from '../components/Reveal'
import { useAnimeEntrance } from '../hooks/useAnimeEntrance'
import type { Category, Product } from '../types'

const categoryIcons: Record<string, typeof Cpu> = {
  'card-do-hoa': Zap,
  'bo-vi-xu-ly': Cpu,
  ram: Sparkles,
  'o-cung': PackageCheck,
  'man-hinh': Monitor,
  'bo-mach-chu': Cpu,
  'tan-nhiet-cpu': Sparkles,
  'nguon-may-tinh': Zap,
  'vo-case': Monitor,
}
const categorySubtitles: Record<string, string> = {
  'card-do-hoa': 'Chiến game cực đỉnh',
  'bo-vi-xu-ly': 'Sức mạnh đa nhân',
  ram: 'Đa nhiệm mượt mà',
  'o-cung': 'Tốc độ vượt trội',
  'man-hinh': 'Thế giới sắc nét',
  'bo-mach-chu': 'Nền tảng vững chắc',
  'tan-nhiet-cpu': 'Hiệu năng mát mẻ',
  'nguon-may-tinh': 'Nguồn điện ổn định',
  'vo-case': 'Phong cách riêng',
}

export default function Home({ featuredProducts, categories }: { featuredProducts: Product[]; categories: Category[] }) {
  const floatingTagRef = useAnimeEntrance<HTMLDivElement>()

  return <>
    <Head title="NEXUS PC — Linh kiện chính hãng, build PC chuyên nghiệp" />
    <section className="hero container">
      <div className="hero-copy"><div className="eyebrow"><span /> PC COMPONENTS, REIMAGINED</div><h1>Build cỗ máy.<br />Chinh phục <span>giới hạn.</span></h1><p>Linh kiện chính hãng, hiệu năng đỉnh cao. Mọi thứ bạn cần để tạo nên bộ PC trong mơ — bắt đầu từ đây.</p><div className="hero-actions"><Link className="button button-dark" href="/products">Khám phá linh kiện <ArrowRight size={17} /></Link><Link className="text-link" href="/build-pc">Tư vấn build PC <ArrowUpRight size={16} /></Link></div><div className="hero-proof"><div className="avatar-stack">{[1, 2, 3].map((item) => <img key={item} src={`https://images.unsplash.com/photo-${['1534528741775-53994a69daeb', '1500648767791-00dcc994a43e', '1506794778202-cad84cf45f1d'][item - 1]}?auto=format&fit=crop&w=80&q=70`} alt="" />)}</div><div><strong>4.9/5 <span>★★★★★</span></strong><small>Được tin chọn bởi 2.000+ game thủ</small></div></div><div className="hero-scribble">Made for<br />your next level <ArrowDownIcon /></div></div>
      <div className="hero-visual"><div className="hero-image-wrap"><img src="https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1400&q=90" alt="Bộ PC gaming RGB hiệu năng cao" /><div className="hero-image-shade" /><div className="hero-image-caption"><span>01 / 03</span><i /> Built for no limits</div></div><div className="hero-spec-card"><span className="spec-icon"><Cpu size={18} /></span><span><small>BUILD GỢI Ý</small><strong>Creator Pro 2025</strong></span><span className="spec-price">Từ 32.990K</span></div><div ref={floatingTagRef} className="hero-floating-tag"><Sparkles size={15} /> Hiệu năng không giới hạn</div></div>
      <div className="hero-pagination"><span className="active" /><span /><span /></div>
    </section>
    <section className="trust-strip"><div className="container trust-grid"><div className="trust-item"><ShieldCheck /><span><strong>Chính hãng 100%</strong><small>Bảo hành toàn quốc</small></span></div><div className="trust-item"><Truck /><span><strong>Giao hàng siêu tốc</strong><small>Miễn phí đơn từ 5 triệu</small></span></div><div className="trust-item"><BadgeCheck /><span><strong>Đổi mới 30 ngày</strong><small>An tâm mua sắm</small></span></div><div className="trust-item"><Headphones /><span><strong>Chuyên gia đồng hành</strong><small>Tư vấn tận tâm 24/7</small></span></div></div></section>
    <Reveal><section className="section container categories-section"><div className="section-heading"><div><span className="section-kicker">TÌM ĐÚNG THỨ BẠN CẦN</span><h2>Mọi linh kiện, <span>một điểm đến.</span></h2></div><Link className="text-link" href="/products">Xem tất cả danh mục <ArrowRight size={16} /></Link></div><div className="category-grid">{categories.map((category, index) => { const Icon = categoryIcons[category.slug] ?? PackageCheck; return <Link className={`category-card category-card-${index % 5 + 1}`} href={`/products?category=${category.slug}`} key={category.slug}><span className="category-icon"><Icon size={20} /></span><span className="category-card-copy"><strong>{category.name}</strong><small>{categorySubtitles[category.slug] ?? 'Khám phá sản phẩm'}</small></span><ArrowUpRight className="category-arrow" size={17} /></Link> })}</div></section></Reveal>
    <Reveal><section className="section products-section"><div className="container"><div className="section-heading"><div><span className="section-kicker">ĐƯỢC CỘNG ĐỒNG YÊU THÍCH</span><h2>Lựa chọn <span>nổi bật.</span></h2></div><Link className="text-link" href="/products">Tất cả sản phẩm <ArrowRight size={16} /></Link></div><ProductGrid products={featuredProducts} /></div></section></Reveal>
    <section className="build-banner container"><div className="build-banner-copy"><span className="section-kicker">KHÔNG BIẾT BẮT ĐẦU TỪ ĐÂU?</span><h2>PC trong mơ,<br />chỉ cách bạn <em>một click.</em></h2><p>Chia sẻ nhu cầu và ngân sách. Chuyên gia của NEXUS sẽ lên cấu hình tối ưu nhất — hoàn toàn miễn phí.</p><Link className="button button-light" href="/build-pc">Bắt đầu build PC <ArrowRight size={17} /></Link><div className="build-note">✓ Tư vấn 1:1 <span /> Không phát sinh chi phí</div></div><div className="build-banner-art"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="build-chip"><Cpu size={48} strokeWidth={1.1} /><span>YOUR NEXT<br />BUILD STARTS HERE</span></div><span className="build-art-tag tag-one"><Zap size={14} /> Gaming</span><span className="build-art-tag tag-two"><Sparkles size={14} /> Creator</span><span className="build-art-tag tag-three"><Monitor size={14} /> Workstation</span></div></section>
    <section className="section container brands-section"><div className="section-heading"><div><span className="section-kicker">ĐỐI TÁC CHÍNH HÃNG</span><h2>Thương hiệu <span>bạn tin dùng.</span></h2></div><Link className="text-link" href="/products">Khám phá sản phẩm <ArrowRight size={16} /></Link></div><BrandList /></section>
  </>
}

function BrandList() {
  return <div className="brand-list"><span className="brand-logo brand-asus">ASUS</span><span className="brand-logo brand-msi">msi</span><span className="brand-logo brand-intel">intel</span><span className="brand-logo brand-amd">AMD</span><span className="brand-logo brand-corsair">CORSAIR</span><span className="brand-logo brand-samsung">SAMSUNG</span></div>
}

function ArrowDownIcon() {
  return <ArrowRight className="scribble-down" size={17} />
}
