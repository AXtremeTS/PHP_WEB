import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import {
  ArrowRight, ArrowUpRight, BadgeCheck, Check, ChevronDown, Cpu, Headphones,
  Heart, Menu, Monitor, PackageCheck, Search, ShieldCheck, ShoppingBag, UserRound,
  Sparkles, Truck, X, Zap,
} from 'lucide-react'
import { useCart } from '../store/CartContext'
import { motion, useReducedMotion } from 'motion/react'

const navCategories = [
  { name: 'Card đồ họa', slug: 'card-do-hoa' },
  { name: 'Bộ vi xử lý', slug: 'bo-vi-xu-ly' },
  { name: 'RAM', slug: 'ram' },
  { name: 'Ổ cứng', slug: 'o-cung' },
  { name: 'Màn hình', slug: 'man-hinh' },
]

export function AppLayout({ children }: { children: ReactNode }) {
  const { count, toast, dismissToast } = useCart()
  const { component } = usePage()
  const reduceMotion = useReducedMotion()
  const [search, setSearch] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const shortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        searchRef.current?.focus()
      }
      if (event.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', shortcut)
    return () => window.removeEventListener('keydown', shortcut)
  }, [])

  const submitSearch = (event: FormEvent) => {
    event.preventDefault()
    router.get('/products', { search: search.trim() }, { preserveState: true, preserveScroll: true })
  }

  return (
    <>
      <div className="announcement">
        <div className="announcement-inner"><span className="announcement-dot" /><span>Ưu đãi tháng 10 — Giảm đến 2 triệu khi build PC</span><Link href="/promotions">Khám phá ngay <ArrowRight size={13} /></Link></div>
      </div>
      <header className="site-header">
        <div className="header-main container">
          <button className="icon-button mobile-menu-trigger" aria-label="Mở menu" onClick={() => setMobileOpen(true)}><Menu size={22} /></button>
          <Link className="brand" href="/" aria-label="NEXUS PC trang chủ"><span className="brand-mark"><span /></span><span className="brand-word">NEXUS<span>PC</span></span></Link>
          <form className="search-box" role="search" onSubmit={submitSearch}>
            <Search size={19} />
            <input ref={searchRef} aria-label="Tìm kiếm sản phẩm" placeholder="Tìm linh kiện, thương hiệu..." value={search} onChange={(event) => setSearch(event.target.value)} />
            <kbd>⌘ K</kbd>
          </form>
          <div className="header-actions">
            <Link className="support-link" href="/support"><Headphones size={19} /><span><b>Hỗ trợ khách hàng</b><small>1900 6868</small></span></Link>
            <Link className="icon-button wishlist-button" href="/wishlist" aria-label="Danh sách yêu thích"><Heart size={21} /></Link>
            <Link className="icon-button account-button" href="/account" aria-label="Tài khoản khách hàng"><UserRound size={20} /></Link>
            <Link className="cart-button" href="/cart" aria-label={`Giỏ hàng, ${count} sản phẩm`}><ShoppingBag size={19} /><span>Giỏ hàng</span><span className="cart-count">{count}</span></Link>
          </div>
        </div>
        <nav className="category-nav" aria-label="Điều hướng chính">
          <div className="container nav-inner">
            <Link className="nav-category-button" href="/products"><Menu size={17} /> Danh mục sản phẩm <ChevronDown size={14} /></Link>
            <Link href="/products">Linh kiện PC</Link><Link href="/build-pc">Build PC</Link><Link href="/promotions">Khuyến mãi</Link><Link href="/products">Thương hiệu</Link><Link href="/support">Góc tư vấn</Link>
            <Link className="nav-promo" href="/promotions"><Zap size={14} fill="currentColor" /> Flash sale</Link>
          </div>
        </nav>
      </header>
      <motion.main
        key={component}
        initial={reduceMotion ? false : { opacity: 0, y: 7 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.22, ease: 'easeOut' }}
      >{children}</motion.main>
      {component !== 'Home' && <section className="trust-strip">
        <div className="container trust-grid">
          <div className="trust-item"><ShieldCheck /><span><strong>Chính hãng 100%</strong><small>Bảo hành toàn quốc</small></span></div>
          <div className="trust-item"><Truck /><span><strong>Giao hàng siêu tốc</strong><small>Miễn phí đơn từ 5 triệu</small></span></div>
          <div className="trust-item"><BadgeCheck /><span><strong>Đổi mới 30 ngày</strong><small>An tâm mua sắm</small></span></div>
          <div className="trust-item"><Headphones /><span><strong>Chuyên gia đồng hành</strong><small>Tư vấn tận tâm 24/7</small></span></div>
        </div>
      </section>}
      <section className="newsletter">
        <div className="container newsletter-inner">
          <div className="newsletter-mark"><Sparkles size={23} /></div>
          <div className="newsletter-copy"><span className="section-kicker">NEXUS INSIDER</span><h2>Deal ngon, gửi thẳng đến bạn.</h2><p>Nhận ưu đãi độc quyền và mẹo build PC hay — không spam, hứa luôn.</p></div>
          <NewsletterForm />
        </div>
      </section>
      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-about"><Link className="brand footer-brand" href="/"><span className="brand-mark"><span /></span><span className="brand-word">NEXUS<span>PC</span></span></Link><p>Nơi đam mê công nghệ gặp gỡ hiệu năng đỉnh cao. Cùng bạn tạo nên cỗ máy không giới hạn.</p><div className="footer-status"><span /> Cửa hàng đang mở <span className="status-hours">08:00 – 21:00 mỗi ngày</span></div></div>
          <div className="footer-column"><strong>Khám phá</strong><Link href="/products">Linh kiện PC</Link><Link href="/build-pc">Build PC theo yêu cầu</Link><Link href="/promotions">Ưu đãi tháng này</Link><Link href="/products">Thương hiệu</Link><Link href="/orders/track">Tra cứu đơn hàng</Link></div>
          <div className="footer-column"><strong>Hỗ trợ</strong><Link href="/support#shipping">Vận chuyển & giao hàng</Link><Link href="/support#warranty">Chính sách bảo hành</Link><Link href="/support#returns">Đổi trả sản phẩm</Link><Link href="/support#faq">Câu hỏi thường gặp</Link></div>
          <div className="footer-contact"><strong>Chúng tôi luôn ở đây</strong><a className="footer-phone" href="tel:19006868">1900 6868</a><span>Thứ 2 – Chủ nhật, 08:00 – 21:00</span><a href="mailto:hello@nexuspc.vn">hello@nexuspc.vn</a></div>
        </div>
        <div className="container footer-bottom"><span>© 2025 NEXUS PC. Made for builders, by builders.</span><div><Link href="/support">Chính sách bảo mật</Link><Link href="/support">Điều khoản sử dụng</Link><span className="payment-types">Thanh toán an toàn</span></div></div>
      </footer>
      {mobileOpen && <div className="mobile-menu-backdrop" onClick={() => setMobileOpen(false)}><nav className="mobile-menu" aria-label="Danh mục sản phẩm" onClick={(event) => event.stopPropagation()}>
        <div className="drawer-header"><Link className="brand" href="/"><span className="brand-mark"><span /></span><span className="brand-word">NEXUS<span>PC</span></span></Link><button className="icon-button" aria-label="Đóng menu" onClick={() => setMobileOpen(false)}><X /></button></div>
        <p className="mobile-menu-kicker">DANH MỤC SẢN PHẨM</p>
        {navCategories.map((category, index) => { const Icon = [Zap, Cpu, Sparkles, PackageCheck, Monitor][index]; return <Link className="mobile-category-link" key={category.slug} href={`/products?category=${category.slug}`} onClick={() => setMobileOpen(false)}><Icon size={18} />{category.name}<ArrowUpRight size={16} /></Link> })}
        <Link className="mobile-category-link" href="/build-pc" onClick={() => setMobileOpen(false)}><Cpu size={18} />Build PC<ArrowUpRight size={16} /></Link>
        <Link className="mobile-category-link" href="/promotions" onClick={() => setMobileOpen(false)}><Zap size={18} />Khuyến mãi<ArrowUpRight size={16} /></Link>
        <Link className="mobile-category-link" href="/wishlist" onClick={() => setMobileOpen(false)}><Heart size={18} />Yêu thích<ArrowUpRight size={16} /></Link>
        <Link className="mobile-category-link" href="/cart" onClick={() => setMobileOpen(false)}><ShoppingBag size={18} />Giỏ hàng<ArrowUpRight size={16} /></Link>
        <Link className="mobile-category-link" href="/support" onClick={() => setMobileOpen(false)}><Headphones size={18} />Hỗ trợ<ArrowUpRight size={16} /></Link>
        <Link className="mobile-category-link" href="/account" onClick={() => setMobileOpen(false)}><UserRound size={18} />Tài khoản<ArrowUpRight size={16} /></Link>
      </nav></div>}
      {toast && <div className="toast" role="status"><span><Check size={15} /></span>{toast}<button onClick={dismissToast} aria-label="Đóng thông báo"><X size={15} /></button></div>}
    </>
  )
}

function NewsletterForm() {
  const { notify } = useCart()
  return <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); notify('Đăng ký thành công! Cảm ơn bạn đã quan tâm NEXUS PC.'); event.currentTarget.reset() }}>
    <label className="sr-only" htmlFor="newsletter-email">Email của bạn</label>
    <input id="newsletter-email" name="email" type="email" placeholder="Email của bạn..." required />
    <button type="submit" aria-label="Đăng ký nhận tin"><ArrowRight size={18} /></button>
  </form>
}
