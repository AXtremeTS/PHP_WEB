import { useState, type FormEvent } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import { ArrowRight, ClipboardList, Heart, LogOut, PackageCheck, Pencil, ShieldCheck, UserRound } from 'lucide-react'
import { ProductGrid } from '../../components/ProductCard'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { useCart } from '../../store/CartContext'
import { useCustomer } from '../../store/CustomerContext'
import type { Product } from '../../types'

type Tab = 'overview' | 'profile' | 'orders'

export default function Account({ products }: { products: Product[] }) {
  const { customer, signOut } = useCustomer()
  const { wishlist } = useCart()
  const [tab, setTab] = useState<Tab>('overview')
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState(customer?.name ?? '')
  const [phone, setPhone] = useState('')
  const savedProducts = products.filter((product) => wishlist.includes(product.id))

  const saveProfile = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setEditing(false)
  }

  if (!customer) return <>
    <Head title="Tài khoản khách hàng — NEXUS PC" />
    <section className="account-guest container"><div className="account-avatar"><UserRound size={26} /></div><span className="section-kicker">NEXUS BUILDER CLUB</span><h1>Chào mừng bạn <span>đến với NEXUS.</span></h1><p>Đăng nhập để xem hồ sơ và các tính năng thành viên. Bản demo không có hệ thống tài khoản thật.</p><div><Link className="button button-dark" href="/login">Đăng nhập <ArrowRight size={16} /></Link><Link className="button button-outline" href="/register">Tạo tài khoản</Link></div><Link className="account-track-link" href="/orders/track">Bạn đã đặt hàng? Tra cứu đơn hàng <ArrowRight size={14} /></Link></section>
  </>

  return <>
    <Head title="Tài khoản của tôi — NEXUS PC" />
    <section className="page-hero container compact-page-hero"><div className="breadcrumbs"><Link href="/">Trang chủ</Link><span>/</span><span>Tài khoản của tôi</span></div><h1>Khu vực <span>thành viên.</span></h1><p>Quản lý hồ sơ, cấu hình và những đơn hàng gần đây.</p></section>
    <section className="account-section"><div className="container account-layout"><aside className="account-sidebar"><div className="account-mini-profile"><div className="account-avatar"><UserRound size={22} /></div><span><strong>{customer.name}</strong><small>{customer.email}</small></span></div><div className="account-tabs" role="tablist" aria-label="Khu vực tài khoản">{([{ id: 'overview', name: 'Tổng quan', icon: UserRound }, { id: 'profile', name: 'Thông tin cá nhân', icon: Pencil }, { id: 'orders', name: 'Đơn hàng của tôi', icon: ClipboardList }] as const).map(({ id, name, icon: Icon }) => <button key={id} className={tab === id ? 'active' : ''} role="tab" aria-selected={tab === id} onClick={() => setTab(id)}><Icon size={16} />{name}</button>)}<Link href="/wishlist"><Heart size={16} />Sản phẩm yêu thích<span>{wishlist.length}</span></Link><button className="account-signout" onClick={() => { signOut(); router.visit('/login') }}><LogOut size={16} />Đăng xuất demo</button></div></aside>
      <div className="account-content">
        {tab === 'overview' && <><div className="account-welcome"><span className="section-kicker">TÀI KHOẢN DEMO</span><h2>Xin chào, {customer.name.split(' ')[0]} 👋</h2><p>Đây là hồ sơ xem trước trong phiên này. Thông tin tài khoản chưa được lưu ở máy chủ.</p></div><div className="account-quick-stats"><div><PackageCheck /><span><strong>01</strong><small>Đơn hàng mẫu</small></span></div><div><Heart /><span><strong>{wishlist.length}</strong><small>Sản phẩm yêu thích</small></span></div><div><ShieldCheck /><span><strong>Member</strong><small>Hạng thành viên</small></span></div></div><div className="account-order-card"><div className="account-subheading"><div><span className="section-kicker">ĐƠN HÀNG GẦN ĐÂY</span><h3>Đơn hàng của bạn</h3></div><button className="text-link account-tab-link" onClick={() => setTab('orders')}>Xem tất cả <ArrowRight size={14} /></button></div><DemoOrder /></div><section className="account-saved"><div className="account-subheading"><div><span className="section-kicker">ĐÃ LƯU</span><h3>Sản phẩm yêu thích</h3></div><Link className="text-link" href="/wishlist">Xem tất cả <ArrowRight size={14} /></Link></div>{savedProducts.length ? <ProductGrid products={savedProducts.slice(0, 2)} /> : <p className="account-empty-copy">Nhấn biểu tượng trái tim để lưu sản phẩm bạn quan tâm.</p>}</section></>}
        {tab === 'profile' && <section className="account-panel"><div className="account-subheading"><div><span className="section-kicker">HỒ SƠ THÀNH VIÊN</span><h3>Thông tin cá nhân</h3></div>{!editing && <button className="button button-outline account-edit-button" onClick={() => setEditing(true)}><Pencil size={14} /> Chỉnh sửa</button>}</div><form className="account-profile-form" onSubmit={saveProfile}><label>Họ và tên<Input disabled={!editing} required minLength={2} value={name} onChange={(event) => setName(event.target.value)} /></label><label>Email<Input type="email" disabled value={customer.email} /></label><label>Số điện thoại<Input disabled={!editing} inputMode="tel" pattern="[0-9+() .-]{9,15}" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="Chưa cập nhật" /></label><label>Địa chỉ mặc định<Input disabled value="Chưa cập nhật" /></label>{editing && <div className="account-form-actions"><Button variant="outline" type="button" onClick={() => { setName(customer.name); setEditing(false) }}>Hủy</Button><Button type="submit">Lưu trong phiên demo</Button></div>}</form><p className="auth-demo-warning">Các thay đổi chỉ tồn tại trong giao diện hiện tại; hồ sơ chưa được lưu vào máy chủ.</p></section>}
        {tab === 'orders' && <section className="account-panel"><div className="account-subheading"><div><span className="section-kicker">LỊCH SỬ MUA SẮM</span><h3>Đơn hàng của tôi</h3></div><Link className="text-link" href="/orders/track">Tra cứu đơn hàng <ArrowRight size={14} /></Link></div><p className="auth-demo-warning">Đơn hàng bên dưới là dữ liệu mẫu để xem trước giao diện.</p><DemoOrder /></section>}
      </div></div></section>
  </>
}

function DemoOrder() {
  return <article className="demo-order"><div><span className="order-id">#NX-2026-1048</span><small>Đặt ngày 05/10/2026 · 2 sản phẩm</small></div><span className="order-status">Đang giao</span><strong>20.180.000 ₫</strong><Link href="/orders/track">Chi tiết <ArrowRight size={14} /></Link></article>
}
