import { useState, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/utils'

export type AccordionItem = { title: string; content: ReactNode }

export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [openItem, setOpenItem] = useState<number | null>(0)

  return (
    <div className={cn('ui-accordion', className)}>
      {items.map((item, index) => {
        const isOpen = openItem === index
        const panelId = `accordion-panel-${index}`
        return (
          <section className={cn('ui-accordion-item', isOpen && 'is-open')} key={item.title}>
            <h3>
              <button
                className="ui-accordion-trigger"
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenItem(isOpen ? null : index)}
              >
                {item.title}<ChevronDown size={17} aria-hidden="true" />
              </button>
            </h3>
            {isOpen && <div className="ui-accordion-content" id={panelId}>{item.content}</div>}
          </section>
        )
      })}
    </div>
  )
}
