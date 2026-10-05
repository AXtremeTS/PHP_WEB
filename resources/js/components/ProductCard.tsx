import { Heart, Plus } from 'lucide-react'
import { Link } from '@inertiajs/react'
import type { Product } from '../types'
import { formatPrice } from '../lib/format'
import { useCart } from '../store/CartContext'
import { motion, useReducedMotion } from 'motion/react'

export function ProductCard({ product }: { product: Product }) {
  const { changeQuantity, notify, wishlist, toggleWishlist } = useCart()
  const reduceMotion = useReducedMotion()
  const isWishlisted = wishlist.includes(product.id)

  return (
    <motion.article className="product-card" initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }} transition={{ duration: reduceMotion ? 0 : 0.35 }}>
      <div className={`product-image ${product.color}`}>
        {product.label && <span className={`product-label ${product.label.startsWith('−') ? 'discount' : ''}`}>{product.label}</span>}
        <button className={`product-wishlist ${isWishlisted ? 'is-wishlisted' : ''}`} aria-label={`${isWishlisted ? 'Xóa' : 'Thêm'} ${product.name} ${isWishlisted ? 'khỏi' : 'vào'} yêu thích`} aria-pressed={isWishlisted} onClick={() => { toggleWishlist(product.id); notify(isWishlisted ? 'Đã xóa khỏi danh sách yêu thích' : 'Đã thêm vào danh sách yêu thích') }}>
          <Heart size={17} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>
        <Link href={`/products/${product.slug}`} aria-label={`Xem ${product.name}`}>
          <img src={product.image} alt={product.name} loading="lazy" />
        </Link>
        <button className="quick-add" onClick={() => { changeQuantity(product.id, 1); notify(`Đã thêm ${product.name} vào giỏ hàng`) }}>
          <Plus size={16} /> Thêm vào giỏ
        </button>
      </div>
      <div className="product-info">
        <div className="product-brand">{product.brand}</div>
        <h3><Link href={`/products/${product.slug}`}>{product.name}</Link></h3>
        <div className="product-rating"><span>★</span> {product.rating} <span className="review-count">({product.reviews} đánh giá)</span></div>
        <div className="product-price">
          <strong>{formatPrice(product.price)}</strong>
          {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
        </div>
      </div>
    </motion.article>
  )
}

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <div className="empty-results"><strong>Chưa tìm thấy sản phẩm phù hợp</strong><span>Hãy thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</span></div>
  }
  return <div className="product-grid">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div>
}
