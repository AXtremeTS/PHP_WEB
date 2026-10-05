import { useState } from 'react'
import { Head, Link } from '@inertiajs/react'
import { router } from '@inertiajs/react'
import { ArrowLeft, ArrowRight, Check, Minus, Plus, ShieldCheck, ShoppingBag, Truck } from 'lucide-react'
import { ProductGrid } from '../../components/ProductCard'
import { formatPrice } from '../../lib/format'
import { useCart } from '../../store/CartContext'
import type { Product } from '../../types'

export default function ProductShow({ product, relatedProducts }: { product: Product; relatedProducts: Product[] }) {
  const [quantity, setQuantity] = useState(1)
  const { changeQuantity, notify } = useCart()
  const addToCart = (buyNow = false) => {
    changeQuantity(product.id, quantity)
    notify(`Đã thêm ${quantity} × ${product.name} vào giỏ hàng`)
    if (buyNow) router.visit('/checkout')
  }

  return <>
    <Head title={`${product.name} — NEXUS PC`} />
    <div className="container product-detail-page">
      <div className="breadcrumbs"><Link href="/">Trang chủ</Link><span>/</span><Link href="/products">Linh kiện PC</Link><span>/</span><Link href={`/products?category=${product.categorySlug}`}>{product.category}</Link><span>/</span><span>{product.name}</span></div>
      <div className="detail-layout">
        <div className={`detail-image ${product.color}`}><span className="product-label">{product.label ?? 'CHÍNH HÃNG'}</span><img src={product.image} alt={product.name} /></div>
        <section className="detail-info"><span className="product-brand">{product.brand}</span><h1>{product.name}</h1><div className="detail-rating"><span>★★★★★</span> {product.rating} <span>({product.reviews} đánh giá)</span></div><div className="detail-price"><strong>{formatPrice(product.price)}</strong>{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}{product.oldPrice && <span>Tiết kiệm {formatPrice(product.oldPrice - product.price)}</span>}</div><p className="detail-description">{product.description}</p>
          <div className="stock-line"><span /> Còn {product.stock} sản phẩm sẵn sàng giao</div>
          <div className="detail-quantity"><span>Số lượng</span><div><button aria-label="Giảm số lượng" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={14} /></button><strong>{quantity}</strong><button aria-label="Tăng số lượng" onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}><Plus size={14} /></button></div></div>
          <div className="detail-actions"><button className="button button-dark" onClick={() => addToCart(true)}><ShoppingBag size={17} /> Mua ngay</button><button className="button button-outline" onClick={() => addToCart()}>Thêm vào giỏ hàng <Plus size={16} /></button></div>
          <div className="detail-perks"><div><ShieldCheck size={17} /><span><strong>Chính hãng 100%</strong><small>Bảo hành theo nhà sản xuất</small></span></div><div><Truck size={17} /><span><strong>Giao hàng toàn quốc</strong><small>Miễn phí đơn từ 5 triệu</small></span></div><div><Check size={17} /><span><strong>Đổi mới trong 30 ngày</strong><small>Yên tâm mua sắm</small></span></div></div>
        </section>
      </div>
      <section className="spec-section"><div className="section-heading"><div><span className="section-kicker">THÔNG TIN SẢN PHẨM</span><h2>Thông số <span>kỹ thuật.</span></h2></div></div><dl className="spec-table">{Object.entries(product.specs).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></section>
      {relatedProducts.length > 0 && <section className="section products-section related-section"><div className="section-heading"><div><span className="section-kicker">CÙNG DANH MỤC</span><h2>Bạn có thể <span>quan tâm.</span></h2></div><Link className="text-link" href={`/products?category=${product.categorySlug}`}>Xem thêm <ArrowRight size={16} /></Link></div><ProductGrid products={relatedProducts} /></section>}
      <Link className="back-link" href="/products"><ArrowLeft size={15} /> Quay lại cửa hàng</Link>
    </div>
  </>
}
