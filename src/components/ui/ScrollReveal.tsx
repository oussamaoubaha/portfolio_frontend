'use client'
import { useEffect, useRef, ReactNode } from 'react'

interface Props {
  children: ReactNode
  direction?: 'up' | 'left' | 'right' | 'fade'
  delay?: number
  className?: string
}

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  className = '',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const animMap = {
      up:    'fade-up',
      left:  'slide-left',
      right: 'slide-right',
      fade:  'fade-in',
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animation = `${animMap[direction]} 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both` 
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 }
    )

    // État initial invisible
    el.style.opacity = '0'
    observer.observe(el)

    return () => observer.disconnect()
  }, [direction, delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
