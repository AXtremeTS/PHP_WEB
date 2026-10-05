import { Head, Link } from '@inertiajs/react'
import { ArrowRight, Clock3, Gift, Percent, Zap } from 'lucide-react'
import { ProductGrid } from '../../components/ProductCard'
import type { Product } from '../../types'

export default function Promotions({ featuredProducts }: { products: Product[]; featuredProducts: Product[] }) {
  return <>
    <Head title="Khuyến mãi linh kiện PC — NEXUS PC" />
    <section className="promo-hero"><div className="container promo-hero-inner"><div className="promo-copy"><span className="promo-live"><i /> ƯU ĐÃI CÓ HẠN</span><h1>Deal ngon.<br /><span>Build chất.</span></h1><p>Săn linh kiện chính hãng giá tốt và nhận thêm quà tặng hấp dẫn trong tháng này.</p><Link className="button button-light" href="/products">Săn deal ngay <ArrowRight size={16} /></Link><div className="promo-expiry"><Clock3 size={15} /> Chương trình cập nhật liên tục</div></div><div className="promo-art"><div className="promo-discount"><Percent size={43} /><strong>UP TO<br /><span>2 TRIỆU</span></strong></div><span className="promo-floating"><Gift size={16} /> Quà tặng build PC</span><span className="promo-zap"><Zap size={25} fill="currentColor" /></span></div></div></section>
    <section className="section container promo-benefits"><div><span><Percent /></span><strong>Giảm đến 2 triệu</strong><small>Giá tốt cho linh kiện chọn lọc</small></div><div><span><Gift /></span><strong>Quà tặng chính hãng</strong><small>Ưu đãi theo từng sản phẩm</small></div><div><span><Zap /></span><strong>Flash deal mỗi tuần</strong><small>Đừng bỏ lỡ deal mới</small></div></section>
    <section className="section products-section"><div className="container"><div className="section-heading"><div><span className="section-kicker">GIÁ TỐT TRONG THÁNG</span><h2>Deal đang <span>diễn ra.</span></h2></div><Link className="text-link" href="/products">Tất cả linh kiện <ArrowRight size={16} /></Link></div><ProductGrid products={featuredProducts} /></div></section>
  </>
}
