'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const outerPos = useRef({ x: 0, y: 0 })
  const rafId = useRef<number>()
  const isHovering = useRef(false)

  useEffect(() => {
    // Désactiver sur mobile/touch
    if ('ontouchstart' in window) return

    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner) return

    // Suivi souris
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      // Inner suit immédiatement
      inner.style.left = e.clientX + 'px'
      inner.style.top = e.clientY + 'px'
    }

    // Lerp animation pour outer
    const animate = () => {
      const lerp = 0.1
      outerPos.current.x += (mousePos.current.x - outerPos.current.x) * lerp
      outerPos.current.y += (mousePos.current.y - outerPos.current.y) * lerp
      outer.style.left = outerPos.current.x + 'px'
      outer.style.top = outerPos.current.y + 'px'
      rafId.current = requestAnimationFrame(animate)
    }
    rafId.current = requestAnimationFrame(animate)

    // Hover sur éléments interactifs
    const interactives = document.querySelectorAll(
      'a, button, .project-card, .skill-card, .stat-card, [data-cursor="hover"]'
    )

    const onEnter = () => {
      isHovering.current = true
      outer.classList.add('cursor-hover')
      inner.classList.add('cursor-hover')
    }
    const onLeave = () => {
      isHovering.current = false
      outer.classList.remove('cursor-hover')
      inner.classList.remove('cursor-hover')
    }

    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    document.addEventListener('mousemove', onMouseMove)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      if (rafId.current) cancelAnimationFrame(rafId.current)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={outerRef} className="cursor-outer" />
      <div ref={innerRef} className="cursor-inner" />
    </>
  )
}
