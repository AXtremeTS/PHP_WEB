import { useMemo, useState, type FormEvent } from 'react'
import { Head, Link, router } from '@inertiajs/react'
import { ArrowRight, ChevronDown, Search, SlidersHorizontal } from 'lucide-react'
import { ProductGrid } from '../../components/ProductCard'
import type { Category, Product } from '../../types'

type Filters = { search: string; category: string; sort: string }

export default function ProductIndex({ products, categories, filters }: { products: Product[]; categories: Category[]; filters: Filters }) {
  const [search, setSearch] = useState(filters.search)
  const [category, setCategory] = useState(filters.category)
  const [sort, setSort] = useState(filters.sort)

  const filtered = useMemo(() => {
    const term = search.trim().toLocaleLowerCase('vi')
    const result = products.filter((product) =>
      (!category || product.categorySlug === category) &&
      (!term || `${product.name} ${product.brand} ${product.category}`.toLocaleLowerCase('vi').includes(term)),
    )
    if (sort === 'price_asc') return [...result].sort((a, b) => a.price - b.price)
    if (sort === 'price_desc') return [...result].sort((a, b) => b.price - a.price)
    return result
  }, [category, products, search, sort])

  const applyFilters = (event?: FormEvent) => {
    event?.preventDefault()
    router.get('/products', { search: search || undefined, category: category || undefined, sort }, { preserveState: true, preserveScroll: true, replace: true })
  }

  return <>
    <Head title="Linh kiện PC chính hãng" />
    <section className="page-hero container"><div className="eyebrow"><span /> NEXUS COMPONENTS</div><h1>Linh kiện <span>chính hãng.</span></h1><p>Tìm đúng linh kiện cho bộ PC của bạn — hàng chính hãng, giá tốt, bảo hành an tâm.</p><div className="breadcrumbs"><Link href="/">Trang chủ</Link><span>/</span><span>Linh kiện PC</span></div></section>
    <section className="section products-section catalog-section"><div className="container">
      <form className="catalog-toolbar" onSubmit={applyFilters}>
        <div className="catalog-search"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Tên sản phẩm, thương hiệu..." aria-label="Tìm sản phẩm" /><button type="submit">Tìm kiếm</button></div>
        <label className="sort-control"><SlidersHorizontal size={15} /><span>Sắp xếp:</span><select value={sort} onChange={(event) => { setSort(event.target.value); router.get('/products', { search: search || undefined, category: category || undefined, sort: event.target.value }, { preserveState: true, preserveScroll: true, replace: true }) }} aria-label="Sắp xếp"><option value="recommended">Đề xuất</option><option value="price_asc">Giá thấp đến cao</option><option value="price_desc">Giá cao đến thấp</option></select><ChevronDown size={14} /></label>
      </form>
      <div className="catalog-layout">
        <aside className="catalog-sidebar"><h2>Danh mục <SlidersHorizontal size={15} /></h2><button className={!category ? 'selected' : ''} onClick={() => { setCategory(''); router.get('/products', { search: search || undefined }, { preserveState: true, preserveScroll: true, replace: true }) }}>Tất cả linh kiện<span>{products.length}</span></button>{categories.map((item) => <button className={category === item.slug ? 'selected' : ''} key={item.slug} onClick={() => { setCategory(item.slug); router.get('/products', { search: search || undefined, category: item.slug, sort }, { preserveState: true, preserveScroll: true, replace: true }) }}>{item.name}<span>{products.filter((product) => product.categorySlug === item.slug).length}</span></button>)}
          <div className="sidebar-promo"><span>BUILD PC DỄ DÀNG</span><strong>Chưa biết chọn gì?</strong><p>Để chuyên gia NEXUS tư vấn cấu hình phù hợp.</p><Link href="/build-pc">Tư vấn build PC <ArrowRight size={14} /></Link></div>
        </aside>
        <div className="catalog-results"><div className="catalog-result-heading"><strong>{category ? categories.find((item) => item.slug === category)?.name : 'Tất cả sản phẩm'}</strong><span>{filtered.length} sản phẩm</span></div><ProductGrid products={filtered} /></div>
      </div>
    </div></section>
  </>
}
