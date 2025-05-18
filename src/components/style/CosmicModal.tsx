// "use client"
import type React from "react"
import { useEffect, useRef } from "react"
import { COSMIC_COLORS } from "../../utils/Comsic-theme"

interface CosmicModalProps {
  isOpen: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}

const CosmicModal: React.FC<CosmicModalProps> = ({ isOpen, title, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && isOpen) {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className={`
        fixed inset-0 z-50 
        flex items-center justify-center
        bg-black bg-opacity-70 backdrop-blur-sm
        transition-opacity duration-300
      `}
    >
      <div
        ref={modalRef}
        className={`
          relative w-full max-w-lg mx-4
          bg-gradient-to-b from-[${COSMIC_COLORS.primary}] to-[${COSMIC_COLORS.primaryDark}]
          rounded-xl overflow-hidden
          shadow-2xl shadow-[${COSMIC_COLORS.primaryDark}]
          transform transition-all duration-300
          border border-[${COSMIC_COLORS.primaryLight}]
        `}
      >
        {/* Cosmic decoration */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[${COSMIC_COLORS.cosmicPurple}] via-[${COSMIC_COLORS.cosmicPink}] to-[${COSMIC_COLORS.cosmicBlue}]"></div>

        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  opacity: Math.random() * 0.5 + 0.3,
                  animation: `twinkle ${Math.random() * 3 + 2}s infinite alternate`,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2
              className={`
                text-xl font-bold text-[${COSMIC_COLORS.textLight}]
                text-right w-full
              `}
              dir="rtl"
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className={`
                w-8 h-8 rounded-full
                flex items-center justify-center
                bg-[${COSMIC_COLORS.primaryLight}] bg-opacity-50
                text-[${COSMIC_COLORS.textLight}]
                hover:bg-opacity-80
                transition-all duration-300
              `}
            >
              ×
            </button>
          </div>

          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default CosmicModal
