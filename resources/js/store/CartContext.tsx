import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

type Cart = Record<number, number>
type CartContextValue = {
  cart: Cart
  count: number
  changeQuantity: (id: number, change: number) => void
  removeItem: (id: number) => void
  clearCart: () => void
  wishlist: number[]
  toggleWishlist: (id: number) => void
  notify: (message: string) => void
  toast: string
  dismissToast: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'nexus-pc-cart'
const WISHLIST_KEY = 'nexus-pc-wishlist'

function readCart(): Cart {
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (!saved) return {}
  let parsed: unknown
  try {
    parsed = JSON.parse(saved)
  } catch (error) {
    if (error instanceof SyntaxError) {
      window.localStorage.removeItem(STORAGE_KEY)
      return {}
    }
    throw error
  }
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {}

  return Object.fromEntries(
    Object.entries(parsed).filter(
      ([id, quantity]) =>
        Number.isInteger(Number(id)) && Number(id) > 0 && Number.isInteger(quantity) && Number(quantity) > 0,
    ),
  )
}

function readWishlist(): number[] {
  const saved = window.localStorage.getItem(WISHLIST_KEY)
  if (!saved) return []
  let parsed: unknown
  try {
    parsed = JSON.parse(saved)
  } catch (error) {
    if (error instanceof SyntaxError) {
      window.localStorage.removeItem(WISHLIST_KEY)
      return []
    }
    throw error
  }
  return Array.isArray(parsed) ? parsed.filter((id): id is number => Number.isInteger(id) && id > 0) : []
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(() => readCart())
  const [wishlist, setWishlist] = useState<number[]>(() => readWishlist())
  const [toast, setToast] = useState('')

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(''), 2800)
    return () => window.clearTimeout(timeout)
  }, [toast])

  const value = useMemo<CartContextValue>(() => ({
    cart,
    count: Object.values(cart).reduce((sum, quantity) => sum + quantity, 0),
    changeQuantity: (id, change) => setCart((current) => {
      const quantity = (current[id] ?? 0) + change
      if (quantity <= 0) {
        const next = { ...current }
        delete next[id]
        return next
      }
      return { ...current, [id]: quantity }
    }),
    removeItem: (id) => setCart((current) => {
      const next = { ...current }
      delete next[id]
      return next
    }),
    clearCart: () => setCart({}),
    wishlist,
    toggleWishlist: (id) => setWishlist((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]),
    notify: setToast,
    toast,
    dismissToast: () => setToast(''),
  }), [cart, toast, wishlist])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
