import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'

export type DemoCustomer = { name: string; email: string }

type CustomerContextValue = {
  customer: DemoCustomer | null
  signIn: (customer: DemoCustomer) => void
  signOut: () => void
}

const CustomerContext = createContext<CustomerContextValue | null>(null)

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<DemoCustomer | null>(null)
  const value = useMemo(() => ({
    customer,
    signIn: (nextCustomer: DemoCustomer) => setCustomer(nextCustomer),
    signOut: () => setCustomer(null),
  }), [customer])

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>
}

export function useCustomer() {
  const context = useContext(CustomerContext)
  if (!context) throw new Error('useCustomer must be used inside CustomerProvider')
  return context
}
