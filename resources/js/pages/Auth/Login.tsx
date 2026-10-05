import { useState, type FormEvent } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import { ArrowLeft, ArrowRight, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { useCustomer } from '../../store/CustomerContext'

export default function Login() {
  const { signIn } = useCustomer()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    signIn({ name: email.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()), email })
    router.visit('/account')
  }

  return <>
    <Head title="Đăng nhập — NEXUS PC" />
    <section className="auth-page container">
      <aside className="auth-promo">
        <span className="section-kicker">NEXUS BUILDER CLUB</span>
        <div className="auth-promo-orb"><Sparkles size={35} /></div>
        <h1>Cỗ máy mơ ước,<br /><span>giờ là của bạn.</span></h1>
        <p>Quản lý cấu hình đã lưu, theo dõi đơn hàng và nhận ưu đãi dành riêng cho thành viên NEXUS.</p>
        <div className="auth-trust"><ShieldCheck size={16} /> Thông tin tài khoản được bảo vệ</div>
      </aside>
      <div className="auth-card">
        <Link className="auth-back" href="/"><ArrowLeft size={15} /> Về trang chủ</Link>
        <div className="auth-form-heading"><span className="section-kicker">CHÀO MỪNG TRỞ LẠI</span><h2>Đăng nhập</h2><p>Đăng nhập để tiếp tục hành trình build PC.</p></div>
        <form className="auth-form" onSubmit={submit}>
          <label>Email<Input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="ban@email.com" /></label>
          <label>Mật khẩu<span className="auth-password-wrap"><Input type={showPassword ? 'text' : 'password'} autoComplete="current-password" required minLength={6} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Nhập mật khẩu" /><button type="button" aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></span></label>
          <div className="auth-inline-link"><span>Giữ trải nghiệm liền mạch</span><Link href="/forgot-password">Quên mật khẩu?</Link></div>
          <Button type="submit" className="auth-submit">Đăng nhập bản demo <ArrowRight size={16} /></Button>
        </form>
        <p className="auth-switch">Chưa có tài khoản? <Link href="/register">Tạo tài khoản mới</Link></p>
        <p className="auth-demo-warning">Bản giao diện demo: thông tin không được gửi hoặc lưu trữ. Chưa có xác thực tài khoản thật.</p>
      </div>
    </section>
  </>
}
