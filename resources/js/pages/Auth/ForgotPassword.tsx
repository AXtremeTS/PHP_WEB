import { useState, type FormEvent } from 'react'
import { Head, Link } from '@inertiajs/react'
import { ArrowLeft, ArrowRight, MailCheck } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { useCart } from '../../store/CartContext'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { notify } = useCart()

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
    notify('Bản demo không gửi email khôi phục.')
  }

  return <>
    <Head title="Khôi phục mật khẩu — NEXUS PC" />
    <section className="auth-page auth-page-simple container">
      <div className="auth-card">
        <Link className="auth-back" href="/login"><ArrowLeft size={15} /> Quay lại đăng nhập</Link>
        <div className="auth-icon-large"><MailCheck size={25} /></div>
        <div className="auth-form-heading"><span className="section-kicker">KHÔI PHỤC TÀI KHOẢN</span><h2>Quên mật khẩu?</h2><p>Nhập email đã đăng ký, hướng dẫn khôi phục sẽ được gửi đến bạn.</p></div>
        {submitted ? <div className="demo-result" role="status"><strong>Đã ghi nhận yêu cầu demo.</strong><p>Chức năng gửi email chưa được kết nối. Hãy quay lại đăng nhập để thử giao diện.</p><Link href="/login">Đến trang đăng nhập <ArrowRight size={14} /></Link></div> :
          <form className="auth-form" onSubmit={submit}><label>Email<Input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="ban@email.com" /></label><Button type="submit" className="auth-submit">Gửi hướng dẫn <ArrowRight size={16} /></Button></form>}
        <p className="auth-demo-warning">Bản demo giao diện — không gửi email hoặc lưu địa chỉ của bạn.</p>
      </div>
    </section>
  </>
}
