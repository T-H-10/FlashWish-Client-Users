import "../cssPages/style/StyleButton.css";

interface StyleButtonProps {
  onClick: () => void
  isActive?: boolean
  children: React.ReactNode
  title?: string
}

const StyleButton: React.FC<StyleButtonProps> = ({ onClick, isActive = false, children, title }) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`style-button ${isActive ? "active" : ""}`}
    >
      {children}
    </button>
  )
}

export default StyleButton


// "use client"

// import type React from "react"
// import { COSMIC_COLORS } from "../../utils/Comsic-theme"

// interface StyleButtonProps {
//   onClick: () => void
//   isActive?: boolean
//   children: React.ReactNode
//   title?: string
// }

// const StyleButton: React.FC<StyleButtonProps> = ({ onClick, isActive = false, children, title }) => {
//   return (
//     <button
//       onClick={onClick}
//       title={title}
//       className={`
//         relative flex items-center justify-center
//         w-10 h-10 rounded-full overflow-hidden
//         transition-all duration-300 ease-in-out
//         ${
//           isActive
//             ? `bg-opacity-30 bg-[${COSMIC_COLORS.secondary}] text-[${COSMIC_COLORS.textLight}]`
//             : `bg-opacity-10 bg-[${COSMIC_COLORS.textLight}] text-[${COSMIC_COLORS.textLight}]`
//         }
//         hover:bg-opacity-20 hover:transform hover:scale-110
//         focus:outline-none focus:ring-2 focus:ring-[${COSMIC_COLORS.secondary}]
//       `}
//     >
//       {children}
//       <div
//         className={`
//           absolute inset-0 rounded-full
//           bg-gradient-to-r from-[${COSMIC_COLORS.cosmicPurple}] to-[${COSMIC_COLORS.cosmicPink}]
//           opacity-0 transition-opacity duration-300
//           ${isActive ? "opacity-20" : ""}
//           group-hover:opacity-30
//         `}
//       />
//       <div
//         className={`
//           absolute inset-0 rounded-full
//           bg-[${COSMIC_COLORS.secondary}]
//           opacity-0 transition-opacity duration-300
//           ${isActive ? "opacity-10" : ""}
//         `}
//       />
//     </button>
//   )
// }

// export default StyleButton
