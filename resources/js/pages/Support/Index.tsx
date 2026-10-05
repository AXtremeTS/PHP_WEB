import { type FormEvent } from 'react'
import { Head, Link } from '@inertiajs/react'
import { ArrowRight, Headphones, Mail, MapPin, MessageCircle, Phone, ShieldCheck, Truck } from 'lucide-react'
import { Accordion } from '../../components/ui/accordion'
import { useCart } from '../../store/CartContext'

const faqs = [
  { question: 'Sản phẩm tại NEXUS PC có phải hàng chính hãng không?', answer: 'Tất cả linh kiện tại NEXUS PC đều là hàng chính hãng, có hóa đơn mua hàng và chính sách bảo hành theo tiêu chuẩn của nhà phân phối tại Việt Nam.' },
  { question: 'Thời gian giao hàng mất bao lâu?', answer: 'Đơn hàng nội thành thường giao trong 1–2 ngày làm việc. Các tỉnh thành khác dự kiến từ 2–5 ngày tùy địa chỉ nhận hàng.' },
  { question: 'Tôi có thể đổi trả sản phẩm trong trường hợp nào?', answer: 'Sản phẩm được hỗ trợ đổi mới trong 30 ngày nếu phát sinh lỗi nhà sản xuất. Vui lòng giữ nguyên hộp, phụ kiện và liên hệ trước với đội ngũ hỗ trợ.' },
  { question: 'NEXUS có hỗ trợ lắp ráp và tư vấn cấu hình không?', answer: 'Có. Đội ngũ kỹ thuật hỗ trợ tư vấn cấu hình miễn phí và có thể lắp ráp, kiểm tra tương thích trước khi giao máy.' },
  { question: 'Tôi có thể kiểm tra đơn hàng của mình như thế nào?', answer: 'Khi hệ thống đặt hàng chính thức được kết nối, bạn có thể tra cứu bằng mã đơn hàng hoặc gọi hotline 1900 6868. Hiện tại đây là giao diện front-end demo.' },
]

export default function Support() {
  const { notify } = useCart()
  const sendMessage = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); notify('Cảm ơn bạn! Biểu mẫu demo chưa gửi dữ liệu đến cửa hàng.'); event.currentTarget.reset() }

  return <>
    <Head title="Hỗ trợ khách hàng — NEXUS PC" />
    <section className="page-hero container"><div className="eyebrow"><span /> NEXUS CUSTOMER CARE</div><h1>Chúng tôi luôn <span>ở đây.</span></h1><p>Đội ngũ NEXUS sẵn sàng hỗ trợ bạn chọn linh kiện, build PC và chăm sóc sau mua.</p><div className="breadcrumbs"><Link href="/">Trang chủ</Link><span>/</span><span>Hỗ trợ khách hàng</span></div></section>
    <section className="support-contact-strip container"><a href="tel:19006868"><span><Phone /></span><small>GỌI HOTLINE</small><strong>1900 6868</strong><em>08:00 – 21:00 mỗi ngày</em></a><a href="mailto:hello@nexuspc.vn"><span><Mail /></span><small>GỬI EMAIL</small><strong>hello@nexuspc.vn</strong><em>Phản hồi trong 24 giờ</em></a><a href="#contact-form"><span><MessageCircle /></span><small>ĐỂ LẠI LỜI NHẮN</small><strong>Liên hệ trực tuyến</strong><em>Chúng tôi sẽ gọi lại cho bạn</em></a></section>
    <section className="section support-info container"><div className="support-policies"><span className="section-kicker">MUA SẮM AN TÂM</span><h2>Chính sách <span>minh bạch.</span></h2><article id="warranty"><ShieldCheck /><div><strong>Bảo hành chính hãng</strong><p>Sản phẩm được bảo hành theo chính sách của nhà phân phối tại Việt Nam.</p></div></article><article id="shipping"><Truck /><div><strong>Giao hàng toàn quốc</strong><p>Đóng gói cẩn thận, cập nhật trạng thái giao hàng rõ ràng.</p></div></article><article id="returns"><Headphones /><div><strong>Đồng hành sau mua</strong><p>Hỗ trợ kỹ thuật, xử lý bảo hành và giải đáp xuyên suốt quá trình sử dụng.</p></div></article><div className="support-address"><MapPin size={17} /><span>Trung tâm hỗ trợ NEXUS PC<br /><small>TP. Hồ Chí Minh, Việt Nam</small></span></div></div><form id="contact-form" className="contact-form" onSubmit={sendMessage}><span className="section-kicker">LIÊN HỆ NEXUS</span><h2>Gửi lời nhắn <span>cho chúng tôi.</span></h2><p>Để lại thông tin, đội ngũ tư vấn sẽ liên hệ bạn sớm nhất.</p><label>Họ và tên<input name="name" required placeholder="Tên của bạn" autoComplete="name" /></label><label>Số điện thoại<input name="phone" required inputMode="tel" pattern="[0-9+() .-]{9,15}" placeholder="090 123 4567" autoComplete="tel" /></label><label>Bạn cần hỗ trợ gì?<select name="topic"><option>Tư vấn chọn linh kiện</option><option>Tư vấn build PC</option><option>Bảo hành / đổi trả</option><option>Khác</option></select></label><label>Lời nhắn<textarea name="message" rows={3} placeholder="Chia sẻ thêm với NEXUS..." /></label><button className="button button-dark" type="submit">Gửi yêu cầu hỗ trợ <ArrowRight size={16} /></button><small className="form-disclaimer">Bản demo: biểu mẫu chưa gửi dữ liệu tới cửa hàng.</small></form></section>
    <section className="faq-section" id="faq"><div className="container faq-layout"><div><span className="section-kicker">CẦN GIÚP ĐỠ?</span><h2>Câu hỏi <span>thường gặp.</span></h2><p>Chưa tìm thấy câu trả lời? Gọi <a href="tel:19006868">1900 6868</a>, chúng tôi sẵn sàng hỗ trợ.</p></div><Accordion className="faq-list" items={faqs.map((faq) => ({ title: faq.question, content: <p>{faq.answer}</p> }))} /></div></section>
  </>
}
