import { useState, type FormEvent } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import { ArrowLeft, ArrowRight, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { useCustomer } from '../../store/CustomerContext'

export default function Register() {
  const { signIn } = useCustomer()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận chưa khớp.')
      return
    }
    setError('')
    signIn({ name: name.trim(), email })
    router.visit('/account')
  }

  return <>
    <Head title="Tạo tài khoản — NEXUS PC" />
    <section className="auth-page container">
      <aside className="auth-promo">
        <span className="section-kicker">NEXUS BUILDER CLUB</span><div className="auth-promo-orb"><Sparkles size={35} /></div>
        <h1>Build thông minh.<br /><span>Đặc quyền hơn.</span></h1>
        <p>Tham gia cộng đồng để lưu cấu hình, theo dõi đơn hàng và không bỏ lỡ ưu đãi linh kiện mới.</p>
        <div className="auth-trust"><ShieldCheck size={16} /> Tư vấn build PC cùng chuyên gia</div>
      </aside>
      <div className="auth-card">
        <Link className="auth-back" href="/"><ArrowLeft size={15} /> Về trang chủ</Link>
        <div className="auth-form-heading"><span className="section-kicker">THÀNH VIÊN NEXUS</span><h2>Tạo tài khoản</h2><p>Tham gia cộng đồng yêu công nghệ.</p></div>
        <form className="auth-form" onSubmit={submit}>
          <label>Họ và tên<Input autoComplete="name" required minLength={2} maxLength={80} value={name} onChange={(event) => setName(event.target.value)} placeholder="Nguyễn Minh Anh" /></label>
          <label>Email<Input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="ban@email.com" /></label>
          <label>Mật khẩu<span className="auth-password-wrap"><Input type={showPassword ? 'text' : 'password'} autoComplete="new-password" required minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Tối thiểu 8 ký tự" /><button type="button" aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'} onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></span></label>
          <label>Xác nhận mật khẩu<Input type="password" autoComplete="new-password" required minLength={8} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Nhập lại mật khẩu" /></label>
          {error && <p className="form-error" role="alert">{error}</p>}
          <Button type="submit" className="auth-submit">Tạo tài khoản demo <ArrowRight size={16} /></Button>
        </form>
        <p className="auth-switch">Đã là thành viên? <Link href="/login">Đăng nhập</Link></p>
        <p className="auth-demo-warning">Bản demo: không gửi hoặc lưu trữ email hay mật khẩu. Chưa có tài khoản thật.</p>
      </div>
    </section>
  </>
}
