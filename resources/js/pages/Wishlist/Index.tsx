import { Head, Link } from '@inertiajs/react'
import { ArrowRight, Heart } from 'lucide-react'
import { ProductGrid } from '../../components/ProductCard'
import { useCart } from '../../store/CartContext'
import type { Product } from '../../types'

export default function WishlistPage({ products }: { products: Product[] }) {
  const { wishlist } = useCart()
  const savedProducts = products.filter((product) => wishlist.includes(product.id))

  return <>
    <Head title="Sản phẩm yêu thích — NEXUS PC" />
    <section className="page-hero container compact-page-hero">
      <div className="breadcrumbs"><Link href="/">Trang chủ</Link><span>/</span><span>Yêu thích</span></div>
      <h1>Sản phẩm <span>yêu thích.</span></h1>
      <p>Lưu lại những linh kiện bạn đang cân nhắc để dễ dàng tìm thấy sau này.</p>
    </section>
    <section className="section products-section"><div className="container">
      <div className="section-heading">
        <div><span className="section-kicker">ĐÃ LƯU CHO BẠN</span><h2>Danh sách <span>của bạn.</span></h2></div>
        <span className="wishlist-count"><Heart size={15} /> {savedProducts.length} sản phẩm</span>
      </div>
      {savedProducts.length
        ? <ProductGrid products={savedProducts} />
        : <div className="empty-cart-page"><div className="empty-cart-icon"><Heart size={28} /></div><h2>Danh sách đang trống</h2><p>Chạm vào biểu tượng trái tim trên sản phẩm để lưu lại linh kiện bạn yêu thích.</p><Link className="button button-dark" href="/products">Khám phá sản phẩm <ArrowRight size={15} /></Link></div>}
    </div></section>
  </>
}
