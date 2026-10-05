import { Head, Link } from '@inertiajs/react'
import { ArrowLeft, ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, Truck, X } from 'lucide-react'
import { formatPrice } from '../../lib/format'
import { useCart } from '../../store/CartContext'
import type { Product } from '../../types'

export default function CartPage({ products }: { products: Product[] }) {
  const { cart, changeQuantity, removeItem } = useCart()
  const items = Object.entries(cart).map(([id, quantity]) => ({ product: products.find((product) => product.id === Number(id)), quantity })).filter((item): item is { product: Product; quantity: number } => item.product !== undefined)
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = total >= 5000000 || total === 0 ? 0 : 35000

  return <>
    <Head title="Giỏ hàng — NEXUS PC" />
    <section className="page-hero container compact-page-hero"><div className="breadcrumbs"><Link href="/">Trang chủ</Link><span>/</span><span>Giỏ hàng</span></div><h1>Giỏ hàng <span>của bạn.</span></h1><p>Kiểm tra lại lựa chọn trước khi tiếp tục.</p></section>
    <section className="cart-page-section"><div className="container">
      {items.length ? <div className="cart-page-layout"><div className="cart-page-items"><div className="cart-table-head"><span>SẢN PHẨM ({items.reduce((sum, item) => sum + item.quantity, 0)})</span><span>ĐƠN GIÁ</span><span>SỐ LƯỢNG</span><span>TẠM TÍNH</span></div>{items.map(({ product, quantity }) => <article className="cart-page-item" key={product.id}><Link href={`/products/${product.slug}`} className={`cart-page-image ${product.color}`}><img src={product.image} alt={product.name} /></Link><div className="cart-page-product"><span className="product-brand">{product.brand}</span><Link href={`/products/${product.slug}`}>{product.name}</Link><small>Còn {product.stock} sản phẩm</small></div><strong className="cart-unit-price">{formatPrice(product.price)}</strong><div className="quantity-control"><button aria-label={`Giảm số lượng ${product.name}`} onClick={() => changeQuantity(product.id, -1)}><Minus size={13} /></button><span>{quantity}</span><button aria-label={`Tăng số lượng ${product.name}`} onClick={() => changeQuantity(product.id, 1)}><Plus size={13} /></button></div><strong className="cart-line-price">{formatPrice(product.price * quantity)}</strong><button className="remove-item cart-page-remove" aria-label={`Xóa ${product.name}`} onClick={() => removeItem(product.id)}><X size={16} /></button></article>)}<Link className="back-link" href="/products"><ArrowLeft size={15} /> Tiếp tục mua sắm</Link></div>
        <aside className="order-summary"><span className="section-kicker">TỔNG QUAN ĐƠN HÀNG</span><h2>Thông tin đơn hàng</h2><div className="order-summary-line"><span>Tạm tính</span><strong>{formatPrice(total)}</strong></div><div className="order-summary-line"><span>Phí vận chuyển</span><strong>{shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</strong></div>{total > 0 && total < 5000000 && <p className="shipping-hint"><Truck size={14} /> Mua thêm {formatPrice(5000000 - total)} để được miễn phí giao hàng.</p>}<div className="order-summary-total"><span>Tổng cộng</span><strong>{formatPrice(total + shipping)}</strong></div><Link className="button button-dark" href="/checkout">Tiến hành đặt hàng <ArrowRight size={16} /></Link><p className="secure-note"><ShieldCheck size={14} /> Thông tin được bảo mật an toàn</p></aside></div>
        : <div className="empty-cart-page"><div className="empty-cart-icon"><ShoppingBag size={29} /></div><h2>Giỏ hàng đang trống</h2><p>Chọn những linh kiện bạn yêu thích và chúng sẽ xuất hiện ở đây.</p><Link className="button button-dark" href="/products">Khám phá sản phẩm <ArrowRight size={16} /></Link></div>}
    </div></section>
  </>
}
