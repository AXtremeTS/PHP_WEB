export type Product = {
  id: number
  slug: string
  name: string
  category: string
  categorySlug: string
  brand: string
  price: number
  oldPrice: number | null
  rating: string
  reviews: number
  label: string | null
  image: string
  color: string
  stock: number
  description: string
  specs: Record<string, string>
}

export type Category = { name: string; slug: string }
