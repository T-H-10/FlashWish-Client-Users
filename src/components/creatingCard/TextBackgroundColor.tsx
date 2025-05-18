// "use client"
import { useState, useEffect } from "react"
import type * as fabric from "fabric"
import FormatColorFillRoundedIcon from "@mui/icons-material/FormatColorFillRounded"
import { COSMIC_COLORS } from "../../utils/Comsic-theme"

interface TextBackgroundProps {
  canvas: fabric.Canvas
}

const TextBackground: React.FC<TextBackgroundProps> = ({ canvas }) => {
  const [color, setColor] = useState<string>("#ff0000")
  const [alpha, setAlpha] = useState<number>(0)

  useEffect(() => {
    const updateBackgroundState = () => {
      const activeObject = canvas?.getActiveObject() as fabric.IText
      if (activeObject && activeObject.type === "textbox" && activeObject.backgroundColor) {
        try {
          // Try to extract color and alpha from rgba
          const bgColor = activeObject.backgroundColor.toString()
          const match = bgColor.match(/rgba$$(\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)$$/)

          if (match) {
            const r = Number.parseInt(match[1])
            const g = Number.parseInt(match[2])
            const b = Number.parseInt(match[3])
            const a = Number.parseFloat(match[4])

            setColor(rgbToHex(r, g, b))
            setAlpha(a)
          }
        } catch (e) {
          // If parsing fails, keep current values
        }
      }
    }

    canvas.on("selection:created", updateBackgroundState)
    canvas.on("selection:updated", updateBackgroundState)

    return () => {
      canvas.off("selection:created", updateBackgroundState)
      canvas.off("selection:updated", updateBackgroundState)
    }
  }, [canvas])

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  const hexToRgba = (hex: string, alpha: number) => {
    const r = Number.parseInt(hex.slice(1, 3), 16)
    const g = Number.parseInt(hex.slice(3, 5), 16)
    const b = Number.parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  const updateBackgroundColor = (newColor: string, newAlpha: number) => {
    const activeObject = canvas?.getActiveObject() as fabric.IText
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set("backgroundColor", hexToRgba(newColor, newAlpha))
      canvas?.renderAll()
    }
  }

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value
    setColor(newColor)
    updateBackgroundColor(newColor, alpha)
  }

  const handleAlphaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAlpha = Number(event.target.value)
    setAlpha(newAlpha)
    updateBackgroundColor(color, newAlpha)
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="relative inline-block">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <FormatColorFillRoundedIcon style={{ color: COSMIC_COLORS.primaryDark }} />
        </div>
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className={`
            w-10 h-10 rounded-full cursor-pointer
            opacity-0
            border-2 border-[${COSMIC_COLORS.primaryLight}]
            transition-all duration-300
            hover:scale-110
          `}
          title="צבע רקע"
        />
        <div
          className={`
            absolute inset-0 rounded-full
            transition-all duration-300
            hover:shadow-lg hover:shadow-[${COSMIC_COLORS.glowColor}]
          `}
          style={{ backgroundColor: color }}
        />
      </div>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={alpha}
        onChange={handleAlphaChange}
        className={`
          w-24 h-2 appearance-none rounded-full
          bg-gradient-to-r from-transparent to-[${color}]
          cursor-pointer
        `}
        title="שקיפות רקע"
      />
    </div>
  )
}

export default TextBackground


// import React, { useEffect, useState } from 'react';
// import * as fabric from 'fabric';
// import FormatColorFillRoundedIcon from '@mui/icons-material/FormatColorFillRounded';

// const TextBackground = ({ canvas }: { canvas: fabric.Canvas }) => {
//     const [color, setColor] = useState<string>('#ff0000'); 
//     const [alpha, setAlpha] = useState<number>(0);

//     useEffect(() => {
//         updateBackgroundColor(color, alpha);
//     }, [color, alpha]); 

//     const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         setColor(event.target.value);
//     };

//     const handleAlphaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const selectedAlpha = Number(event.target.value);
//         setAlpha(selectedAlpha);
//     };

//     const updateBackgroundColor = (color: string, alpha: number) => {
//         const activeObject = canvas?.getActiveObject();
//         if (activeObject && activeObject.type === 'textbox') {
//             activeObject.set('backgroundColor', hexToRgba(color, alpha));
//             canvas?.renderAll(); 
//         }
//     };

//     const hexToRgba = (hex: string, alpha: number) => {
//         const r = parseInt(hex.slice(1, 3), 16);
//         const g = parseInt(hex.slice(3, 5), 16);
//         const b = parseInt(hex.slice(5, 7), 16);
//         return `rgba(${r}, ${g}, ${b}, ${alpha})`;
//     };

//     return (
//         <>
//         <span style={{ position: 'relative' }}>
//             <span
                                    
//                 style={{
//                     position: 'absolute',
//                     bottom: 0,
//                     left: 13,
//                     color: '#25173b',
//                     backgroundColor: 'transparent',
//                     pointerEvents: 'none',
//                     opacity: 1,
//                     transition: 'opacity 0.3s ease',
//                 }}
//             >
//                 <FormatColorFillRoundedIcon/>
//             </span>
//             <input
//                 type="color"
//                 value={color}
//                 onChange={handleColorChange}
//                 style={{height:'40px', marginRight: '5px' }} 
//             />
//             </span>
//              <input
//                 type="range"
//                 min="0"
//                 max="1"
//                 step="0.01"
//                 value={alpha}
//                 onChange={handleAlphaChange}
//             />
//         </>
//     );
// };

// export default TextBackground;
