// "use client"
import { useState, useEffect } from "react"
import type * as fabric from "fabric"
import FormatColorTextIcon from "@mui/icons-material/FormatColorText"
import { COSMIC_COLORS } from "../../utils/Comsic-theme"

interface TextColorProps {
  canvas: fabric.Canvas
}

const TextColor: React.FC<TextColorProps> = ({ canvas }) => {
  const [color, setColor] = useState<string>("#ffffff")

  useEffect(() => {
    const updateColorState = () => {
      const activeObject = canvas?.getActiveObject() as fabric.IText
      if (activeObject && activeObject.type === "textbox") {
        setColor((activeObject.fill as string) || "#ffffff")
      }
    }

    canvas.on("selection:created", updateColorState)
    canvas.on("selection:updated", updateColorState)

    return () => {
      canvas.off("selection:created", updateColorState)
      canvas.off("selection:updated", updateColorState)
    }
  }, [canvas])

  const changeTextColor = (newColor: string) => {
    setColor(newColor)
    const activeObject = canvas?.getActiveObject() as fabric.IText
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set("fill", newColor)
      canvas?.renderAll()
    }
  }

  return (
    <div className="relative inline-block">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <FormatColorTextIcon style={{ color: COSMIC_COLORS.primaryDark }} />
      </div>
      <input
        type="color"
        value={color}
        onChange={(e) => changeTextColor(e.target.value)}
        className={`
          w-10 h-10 rounded-full cursor-pointer
          opacity-0
          border-2 border-[${COSMIC_COLORS.primaryDark}]
          transition-all duration-300
          hover:scale-110
        `}
        title="צבע טקסט"
      />
      <div
        className={`
          absolute inset-0 rounded-full
          transition-all duration-300
          hover:shadow-lg hover:shadow-[${COSMIC_COLORS.primaryDark}]
        `}
        style={{ backgroundColor: color }}
      />
    </div>
  )
}

export default TextColor;


// import * as fabric from 'fabric';
// import FormatColorTextIcon from '@mui/icons-material/FormatColorText';

// const TextColor = ({ canvas }: { canvas: fabric.Canvas }) => {

//     const changeTextColor = (color: string) => {
//         const activeObject = canvas?.getActiveObject();
//         if (activeObject && activeObject.type === 'textbox') {
//             activeObject.set('fill', color);
//             canvas?.renderAll();
//         }
//     };

//     return (
//         <>
//  <span style={{ position: 'relative' }}>
//             <span
//                 style={{
//                     position: 'absolute',
//                     bottom: 0,
//                     left: 13,
//                     color: '#aaa',
//                     backgroundColor: 'transparent',
//                     pointerEvents: 'none',
//                     opacity: 1,
//                     transition: 'opacity 0.3s ease',
//                 }}
//             >
//                 <FormatColorTextIcon/>
//             </span>
//             <input
//                 type="color"
//                 color='white'
//                 onChange={(e)=>changeTextColor(e.target.value)}
//                 style={{height:'40px', marginRight: '5px' }} 
//             />
//             </span>

//         </>
//     )
// }
// export default TextColor;