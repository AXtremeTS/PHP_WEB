import { useMemo, useState } from 'react'
import { Head, Link } from '@inertiajs/react'
import { ArrowRight, Check, Cpu, Monitor, PackageCheck, Sparkles, Zap } from 'lucide-react'
import { formatPrice } from '../../lib/format'
import { useCart } from '../../store/CartContext'
import type { Product } from '../../types'

const components = [
  { key: 'cpu', label: 'Bộ vi xử lý', slug: 'bo-vi-xu-ly', icon: Cpu },
  { key: 'motherboard', label: 'Bo mạch chủ', slug: 'bo-mach-chu', icon: PackageCheck },
  { key: 'gpu', label: 'Card đồ họa', slug: 'card-do-hoa', icon: Zap },
  { key: 'cooler', label: 'Tản nhiệt CPU', slug: 'tan-nhiet-cpu', icon: Sparkles },
  { key: 'ram', label: 'Bộ nhớ RAM', slug: 'ram', icon: Sparkles },
  { key: 'storage', label: 'Ổ cứng', slug: 'o-cung', icon: PackageCheck },
  { key: 'psu', label: 'Nguồn máy tính', slug: 'nguon-may-tinh', icon: Zap },
  { key: 'case', label: 'Vỏ case', slug: 'vo-case', icon: Monitor },
  { key: 'monitor', label: 'Màn hình', slug: 'man-hinh', icon: Monitor },
]

export default function Builder({ products }: { products: Product[] }) {
  const [selection, setSelection] = useState<Record<string, number>>({})
  const [budget, setBudget] = useState('all')
  const { changeQuantity, notify } = useCart()
  const selectedProducts = useMemo(() => Object.values(selection).map((id) => products.find((product) => product.id === id)).filter((product): product is Product => product !== undefined), [products, selection])
  const total = selectedProducts.reduce((sum, product) => sum + product.price, 0)
  const filteredProducts = (slug: string) => products.filter((product) => product.categorySlug === slug && (budget === 'all' || (budget === '20m' ? product.price <= 20000000 : product.price <= 10000000)))

  return <>
    <Head title="Build PC theo nhu cầu — NEXUS PC" />
    <section className="page-hero container"><div className="eyebrow"><span /> PC BUILDER</div><h1>Tạo cấu hình <span>của bạn.</span></h1><p>Chọn từng linh kiện, theo dõi ngân sách và build nên chiếc PC đúng với nhu cầu của bạn.</p><div className="breadcrumbs"><Link href="/">Trang chủ</Link><span>/</span><span>Build PC</span></div></section>
    <section className="builder-section"><div className="container builder-layout"><div className="builder-main">
      <div className="builder-toolbar"><div><span className="section-kicker">CẤU HÌNH TÙY CHỈNH</span><h2>Chọn linh kiện <span>phù hợp.</span></h2></div><label>Ngân sách linh kiện<select value={budget} onChange={(event) => setBudget(event.target.value)}><option value="all">Không giới hạn</option><option value="20m">Tối đa 20 triệu / món</option><option value="10m">Tối đa 10 triệu / món</option></select></label></div>
      {components.map(({ key, label, slug, icon: Icon }, index) => {
        const choices = filteredProducts(slug)
        const selected = products.find((product) => product.id === selection[key])
        return <section className={`builder-component ${selected ? 'is-selected' : ''}`} key={key}><div className="builder-component-icon"><Icon size={19} /></div><div className="builder-component-content"><div className="builder-component-heading"><div><small>LINH KIỆN {String(index + 1).padStart(2, '0')}</small><strong>{label}</strong></div>{selected ? <span className="builder-selected"><Check size={13} /> Đã chọn</span> : <span className="builder-optional">Tùy chọn</span>}</div><select aria-label={`Chọn ${label}`} value={selection[key] ?? ''} onChange={(event) => setSelection((current) => { const next = { ...current }; if (event.target.value) next[key] = Number(event.target.value); else delete next[key]; return next })}><option value="">Chọn linh kiện...</option>{choices.map((product) => <option key={product.id} value={product.id}>{product.name} — {formatPrice(product.price)}</option>)}</select>{selected && <div className="builder-picked"><img src={selected.image} alt="" /><span>{selected.name}</span><strong>{formatPrice(selected.price)}</strong><button aria-label={`Bỏ chọn ${selected.name}`} onClick={() => setSelection((current) => { const next = { ...current }; delete next[key]; return next })}>×</button></div>}</div></section>
      })}
      <p className="builder-note"><span>i</span> Cấu hình là gợi ý tham khảo. NEXUS sẽ kiểm tra tương thích trước khi lắp ráp.</p>
    </div><aside className="builder-summary"><div className="builder-summary-heading"><span className="section-kicker">TÓM TẮT CẤU HÌNH</span><h2>Build của bạn</h2></div><div className="builder-progress"><span style={{ width: `${selectedProducts.length / components.length * 100}%` }} /></div><p className="builder-progress-label">{selectedProducts.length} / {components.length} linh kiện đã chọn</p><div className="builder-summary-list">{components.map((item) => { const product = products.find((entry) => entry.id === selection[item.key]); return <div key={item.key}><span>{item.label}</span><strong>{product ? formatPrice(product.price) : 'Chưa chọn'}</strong></div> })}</div><div className="builder-total"><span>Tổng tạm tính</span><strong>{formatPrice(total)}</strong></div><button className="button button-dark" disabled={selectedProducts.length === 0} onClick={() => { selectedProducts.forEach((product) => changeQuantity(product.id, 1)); notify(`${selectedProducts.length} linh kiện đã được thêm vào giỏ hàng`) }}>Thêm cấu hình vào giỏ <ArrowRight size={16} /></button><Link className="builder-consult" href="/support">Cần chuyên gia tư vấn? <span>Liên hệ ngay</span></Link></aside></div></section>
  </>
}
