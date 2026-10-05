import { useState, type FormEvent } from 'react'
import { Head, Link } from '@inertiajs/react'
import { ArrowRight, Check, CircleDot, Package, PackageCheck, Search, Truck } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'

const sampleCode = 'NX-2026-1048'

export default function TrackOrder() {
  const [code, setCode] = useState('')
  const [searched, setSearched] = useState(false)
  const [found, setFound] = useState(false)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFound(code.trim().toUpperCase() === sampleCode)
    setSearched(true)
  }

  return <>
    <Head title="Tra cứu đơn hàng — NEXUS PC" />
    <section className="page-hero container compact-page-hero"><div className="breadcrumbs"><Link href="/">Trang chủ</Link><span>/</span><span>Tra cứu đơn hàng</span></div><h1>Theo dõi <span>đơn hàng.</span></h1><p>Cập nhật hành trình đơn hàng đến tận tay bạn.</p></section>
    <section className="track-section"><div className="track-card"><div className="track-icon"><PackageCheck size={26} /></div><span className="section-kicker">ORDER TRACKING</span><h2>Đơn hàng đang ở đâu?</h2><p>Nhập mã đơn hàng trong email xác nhận để tra cứu trạng thái.</p><form onSubmit={submit}><label className="sr-only" htmlFor="order-code">Mã đơn hàng</label><Input id="order-code" required minLength={5} maxLength={32} value={code} onChange={(event) => setCode(event.target.value)} placeholder="Ví dụ: NX-2026-1048" /><Button type="submit" variant="default"><Search size={15} /> Tra cứu</Button></form><small className="track-demo-hint">Thử mã mẫu: <button onClick={() => setCode(sampleCode)}>{sampleCode}</button></small></div>
      {searched && (found ? <div className="track-result"><div className="track-result-head"><div><span className="section-kicker">ĐƠN HÀNG DEMO</span><h2>{sampleCode}</h2></div><span className="order-status">Đang giao hàng</span></div><p className="track-result-note">Đơn hàng mẫu — trạng thái thực tế chưa được kết nối với hệ thống giao vận.</p><div className="tracking-steps">{[{ title: 'Đã xác nhận', text: 'Đơn hàng đã được tiếp nhận', done: true, icon: Check }, { title: 'Đang chuẩn bị hàng', text: 'Linh kiện đang được đóng gói', done: true, icon: Package }, { title: 'Đang giao đến bạn', text: 'Dự kiến giao trong 1–2 ngày', done: true, icon: Truck }, { title: 'Giao hàng thành công', text: 'Chờ xác nhận', done: false, icon: CircleDot }].map(({ title, text, done, icon: Icon }, index) => <div className={`tracking-step ${done ? 'done' : ''}`} key={title}><span className="tracking-step-icon"><Icon size={15} /></span>{index < 3 && <i /> }<div><strong>{title}</strong><small>{text}</small></div></div>)}</div><Link className="text-link" href="/support">Cần hỗ trợ về đơn hàng? <ArrowRight size={14} /></Link></div> : <div className="track-not-found" role="alert">Không tìm thấy mã đơn hàng này trong dữ liệu demo. Vui lòng kiểm tra lại mã.</div>)}
      <p className="track-support">Cần hỗ trợ? Gọi <a href="tel:19006868">1900 6868</a></p>
    </section>
  </>
}
