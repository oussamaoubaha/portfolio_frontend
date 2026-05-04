'use client'
import { useState } from 'react'

export default function CVButton() {
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 600)
    // Téléchargement réel
    const link = document.createElement('a')
    link.href = '/cv.pdf'
    link.download = 'CV_Oussama_Oubaha.pdf'
    link.click()
  }

  return (
    <button
      onClick={handleClick}
      className={`cv-heartbeat-btn ${clicked ? 'clicked' : ''}`}
      aria-label="Télécharger le CV"
    >
      {/* Pulse rings — les ondes du coeur */}
      <span className="pulse-ring ring-1" />
      <span className="pulse-ring ring-2" />
      <span className="pulse-ring ring-3" />

      {/* Glow blob derrière le bouton */}
      <span className="btn-glow" />

      {/* Contenu du bouton */}
      <span className="btn-content">
        <span className="btn-icon">
          {/* Icône download qui bat */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
            className="download-icon">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
        </span>
        <span className="btn-text">Télécharger CV</span>
      </span>

      {/* Shimmer sweep effect */}
      <span className="btn-shimmer" />
    </button>
  )
}
