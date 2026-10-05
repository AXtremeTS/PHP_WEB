import { useState, type FormEvent } from 'react'
import { Head, Link } from '@inertiajs/react'
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Truck } from 'lucide-react'
import { formatPrice } from '../../lib/format'
import { useCart } from '../../store/CartContext'
import type { Product } from '../../types'

type CheckoutData = { name: string; phone: string; email: string; address: string; city: string; note: string; payment: string }
const initial: CheckoutData = { name: '', phone: '', email: '', address: '', city: '', note: '', payment: 'cod' }

export default function Checkout({ products }: { products: Product[] }) {
  const { cart, clearCart } = useCart()
  const items = Object.entries(cart).map(([id, quantity]) => ({ product: products.find((product) => product.id === Number(id)), quantity })).filter((item): item is { product: Product; quantity: number } => item.product !== undefined)
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal >= 5000000 || subtotal === 0 ? 0 : 35000
  const [form, setForm] = useState(initial)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const update = (key: keyof CheckoutData, value: string) => setForm((current) => ({ ...current, [key]: value }))
  const submit = (event: FormEvent) => {
    event.preventDefault()
    setOrderPlaced(true)
    clearCart()
  }

  if (orderPlaced) return <><Head title="Đặt hàng thành công — NEXUS PC" /><section className="checkout-success container"><div className="success-check"><Check size={31} /></div><span className="section-kicker">CẢM ƠN BẠN ĐÃ TIN CHỌN NEXUS PC</span><h1>Đặt hàng <span>thành công!</span></h1><p>Đây là bản giao diện thử nghiệm — thông tin chưa được gửi đến cửa hàng và chưa phát sinh giao dịch thật.</p><Link className="button button-dark" href="/products">Tiếp tục mua sắm <ArrowRight size={16} /></Link></section></>

  return <>
    <Head title="Thanh toán — NEXUS PC" />
    <section className="page-hero container compact-page-hero"><div className="breadcrumbs"><Link href="/">Trang chủ</Link><span>/</span><Link href="/cart">Giỏ hàng</Link><span>/</span><span>Thanh toán</span></div><h1>Hoàn tất <span>đơn hàng.</span></h1><p>Điền thông tin nhận hàng, chúng tôi sẽ chăm sóc phần còn lại.</p></section>
    <section className="checkout-section"><div className="container">
      {items.length === 0 ? <div className="empty-cart-page"><h2>Chưa có sản phẩm để thanh toán</h2><p>Hãy thêm sản phẩm vào giỏ trước khi tiếp tục.</p><Link className="button button-dark" href="/products">Khám phá sản phẩm <ArrowRight size={16} /></Link></div> :
        <form className="checkout-layout" onSubmit={submit}><div className="checkout-form"><div className="checkout-panel"><div className="checkout-panel-title"><span>01</span><div><h2>Thông tin nhận hàng</h2><p>Nhập thông tin để nhân viên giao hàng có thể liên hệ bạn.</p></div></div><div className="form-grid"><label>Họ và tên <span>*</span><input required autoComplete="name" value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Nguyễn Văn A" /></label><label>Số điện thoại <span>*</span><input required autoComplete="tel" inputMode="tel" pattern="[0-9+() .-]{9,15}" value={form.phone} onChange={(event) => update('phone', event.target.value)} placeholder="090 123 4567" /></label><label>Email<input type="email" autoComplete="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="ban@email.com" /></label><label>Tỉnh / Thành phố <span>*</span><input required autoComplete="address-level1" value={form.city} onChange={(event) => update('city', event.target.value)} placeholder="TP. Hồ Chí Minh" /></label><label className="form-full">Địa chỉ giao hàng <span>*</span><input required autoComplete="street-address" value={form.address} onChange={(event) => update('address', event.target.value)} placeholder="Số nhà, tên đường, phường / xã..." /></label><label className="form-full">Ghi chú đơn hàng<textarea rows={3} value={form.note} onChange={(event) => update('note', event.target.value)} placeholder="Hướng dẫn giao hàng (nếu có)" /></label></div></div>
          <div className="checkout-panel"><div className="checkout-panel-title"><span>02</span><div><h2>Phương thức thanh toán</h2><p>Chọn cách thanh toán thuận tiện cho bạn.</p></div></div><label className={`payment-option ${form.payment === 'cod' ? 'selected' : ''}`}><input type="radio" name="payment" value="cod" checked={form.payment === 'cod'} onChange={(event) => update('payment', event.target.value)} /><span className="payment-radio" /><span><strong>Thanh toán khi nhận hàng (COD)</strong><small>Kiểm tra hàng trước khi thanh toán</small></span></label><label className={`payment-option ${form.payment === 'bank' ? 'selected' : ''}`}><input type="radio" name="payment" value="bank" checked={form.payment === 'bank'} onChange={(event) => update('payment', event.target.value)} /><span className="payment-radio" /><span><strong>Chuyển khoản ngân hàng</strong><small>Thông tin chuyển khoản sẽ được cung cấp sau</small></span></label></div></div>
          <aside className="order-summary checkout-summary"><span className="section-kicker">ĐƠN HÀNG CỦA BẠN</span><h2>Tóm tắt đơn hàng</h2>{items.map(({ product, quantity }) => <div className="checkout-product" key={product.id}><img src={product.image} alt="" /><span><strong>{product.name}</strong><small>Số lượng: {quantity}</small></span><b>{formatPrice(product.price * quantity)}</b></div>)}<div className="order-summary-line"><span>Tạm tính</span><strong>{formatPrice(subtotal)}</strong></div><div className="order-summary-line"><span>Giao hàng</span><strong>{shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}</strong></div><div className="order-summary-total"><span>Tổng cộng</span><strong>{formatPrice(subtotal + shipping)}</strong></div><button className="button button-dark" type="submit">Xác nhận đặt hàng <ArrowRight size={16} /></button><p className="secure-note"><ShieldCheck size={14} /> Giao diện demo — chưa xử lý thanh toán thật</p><div className="checkout-delivery"><Truck size={15} /> Dự kiến giao hàng trong 1–3 ngày</div></aside>
          <Link className="back-link checkout-back" href="/cart"><ArrowLeft size={15} /> Quay lại giỏ hàng</Link>
        </form>}
    </div></section>
  </>
}
