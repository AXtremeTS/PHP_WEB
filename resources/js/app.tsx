import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import type { ComponentType, ReactNode } from 'react'
import { CartProvider } from './store/CartContext'
import { CustomerProvider } from './store/CustomerContext'
import { AppLayout } from './layouts/AppLayout'
import './styles.css'

const pages = import.meta.glob<{ default: ComponentType & { layout?: (page: ReactNode) => ReactNode } }>('./pages/**/*.tsx')

createInertiaApp({
  resolve: async (name) => {
    const loadPage = pages[`./pages/${name}.tsx`]
    if (!loadPage) throw new Error(`Inertia page "${name}" was not found.`)
    const page = await loadPage()
    page.default.layout ??= (content: ReactNode) => <AppLayout>{content}</AppLayout>
    return page
  },
  setup({ el, App, props }) {
    createRoot(el).render(<CartProvider><CustomerProvider><App {...props} /></CustomerProvider></CartProvider>)
  },
  progress: { color: '#b8e653', showSpinner: false },
})
