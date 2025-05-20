import { useState, useEffect } from "react"
import type * as fabric from "fabric"
import TextIncreaseRoundedIcon from "@mui/icons-material/TextIncreaseRounded"
import TextDecreaseRoundedIcon from "@mui/icons-material/TextDecreaseRounded"
import StyleButton from "../style/StyleButton"
import "../cssPages/creatingCard/TextSize.css"

interface TextSizeProps {
  canvas: fabric.Canvas
}

const TextSize: React.FC<TextSizeProps> = ({ canvas }) => {
  const [fontSize, setFontSize] = useState<number>(30)
  const FONT_SIZE_CHANGE = 3

  useEffect(() => {
    const updateFontSizeState = () => {
      const activeObject = canvas?.getActiveObject() as fabric.IText
      if (activeObject && activeObject.type === "textbox") {
        setFontSize((activeObject.fontSize as number) || 30)
      }
    }

    canvas.on("selection:created", updateFontSizeState)
    canvas.on("selection:updated", updateFontSizeState)

    return () => {
      canvas.off("selection:created", updateFontSizeState)
      canvas.off("selection:updated", updateFontSizeState)
    }
  }, [canvas])

  const changeTextSize = (size: number) => {
    const activeObject = canvas?.getActiveObject() as fabric.IText
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set("fontSize", size)
      canvas?.renderAll()
    }
  }

  const increaseFontSize = () => {
    const newSize = fontSize + FONT_SIZE_CHANGE
    setFontSize(newSize)
    changeTextSize(newSize)
  }

  const decreaseFontSize = () => {
    const newSize = fontSize > FONT_SIZE_CHANGE ? fontSize - FONT_SIZE_CHANGE : 1
    setFontSize(newSize)
    changeTextSize(newSize)
  }

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = Number.parseInt(event.target.value, 10)
    if (!isNaN(newSize) && newSize > 0) {
      setFontSize(newSize)
      changeTextSize(newSize)
    }
  }

  return (
    <div className="cosmic-text-size">
      <div className="cosmic-size-container">
        <div className="cosmic-size-stars">
          {Array.from({ length: 5 }).map((_, index) => (
            <div 
              key={index}
              className="cosmic-size-star"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="cosmic-size-controls">
          <div className="cosmic-size-button-wrapper">
            <StyleButton onClick={increaseFontSize} title="הגדל טקסט">
              <TextIncreaseRoundedIcon />
            </StyleButton>
          </div>

          <div className="cosmic-size-button-wrapper">
            <StyleButton onClick={decreaseFontSize} title="הקטן טקסט">
              <TextDecreaseRoundedIcon />
            </StyleButton>
          </div>

          <div className="cosmic-size-input-wrapper">
            <input
              type="number"
              value={fontSize}
              onChange={handleFontSizeChange}
              min={1}
              max={80}
              className="cosmic-size-input"
              title="גודל טקסט"
            />
            <div className="cosmic-size-input-glow"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextSize

// // "use client"
// import { useState, useEffect } from "react"
// import type * as fabric from "fabric"
// import TextDecreaseRoundedIcon from "@mui/icons-material/TextDecreaseRounded"
// import TextIncreaseRoundedIcon from "@mui/icons-material/TextIncreaseRounded"
// import StyleButton from "../style/StyleButton"
// import { COSMIC_COLORS } from "../../utils/Comsic-theme"

// interface TextSizeProps {
//   canvas: fabric.Canvas
// }

// const TextSize: React.FC<TextSizeProps> = ({ canvas }) => {
//   const [fontSize, setFontSize] = useState<number>(30)
//   const FONT_SIZE_CHANGE = 3

//   useEffect(() => {
//     const updateFontSizeState = () => {
//       const activeObject = canvas?.getActiveObject() as fabric.IText
//       if (activeObject && activeObject.type === "textbox") {
//         setFontSize((activeObject.fontSize as number) || 30)
//       }
//     }

//     canvas.on("selection:created", updateFontSizeState)
//     canvas.on("selection:updated", updateFontSizeState)

//     return () => {
//       canvas.off("selection:created", updateFontSizeState)
//       canvas.off("selection:updated", updateFontSizeState)
//     }
//   }, [canvas])

//   const changeTextSize = (size: number) => {
//     const activeObject = canvas?.getActiveObject() as fabric.IText
//     if (activeObject && activeObject.type === "textbox") {
//       activeObject.set("fontSize", size)
//       canvas?.renderAll()
//     }
//   }

//   const increaseFontSize = () => {
//     const newSize = fontSize + FONT_SIZE_CHANGE
//     setFontSize(newSize)
//     changeTextSize(newSize)
//   }

//   const decreaseFontSize = () => {
//     const newSize = fontSize > FONT_SIZE_CHANGE ? fontSize - FONT_SIZE_CHANGE : 1
//     setFontSize(newSize)
//     changeTextSize(newSize)
//   }

//   const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const newSize = Number.parseInt(event.target.value, 10)
//     if (!isNaN(newSize) && newSize > 0) {
//       setFontSize(newSize)
//       changeTextSize(newSize)
//     }
//   }

//   return (
//     <>
//         <div className="relative">
//       <StyleButton onClick={increaseFontSize} title="הגדל טקסט">
//         <TextIncreaseRoundedIcon />
//       </StyleButton>
//       </div>

//       <div className="relative">
//       <StyleButton onClick={decreaseFontSize} title="הקטן טקסט">
//         <TextDecreaseRoundedIcon />
//       </StyleButton>
//       </div>

//       <input
//         type="number"
//         value={fontSize}
//         onChange={handleFontSizeChange}
//         min={1}
//         className={`
//           w-16 h-10 px-2 text-center rounded-md
//           bg-[${COSMIC_COLORS.primaryDark}] 
//           text-[${COSMIC_COLORS.textLight}]
//           border border-[${COSMIC_COLORS.primaryLight}]
//           focus:outline-none focus:ring-2 focus:ring-[${COSMIC_COLORS.secondary}]
//           transition-all duration-300
//         `}
//       />
//     </>
//   )
// }

// export default TextSize


// // import { TextField } from '@mui/material';
// // import * as fabric from 'fabric';
// // import { useState } from 'react';
// // import MyOptionToStyleButton from '../style/MyOptionToStyleButton';
// // import TextDecreaseRoundedIcon from '@mui/icons-material/TextDecreaseRounded';
// // import TextIncreaseRoundedIcon from '@mui/icons-material/TextIncreaseRounded';

// // const TextSize = ({ canvas }: { canvas: fabric.Canvas }) => {
// //     const [fontSize, setFontSize] = useState<number>(30);
// //     const FONT_SIZE_CHANGE = 3;

// //     const changeTextSize = (size: number) => {
// //         const activeObject = canvas?.getActiveObject();
// //         if (activeObject && activeObject.type === 'textbox') {
// //             activeObject.set('fontSize', size);
// //             canvas?.renderAll();
// //         }
// //     };
// //     const increaseFontSize = () => {
// //         const newSize = fontSize + FONT_SIZE_CHANGE; 
// //         setFontSize(newSize);
// //         changeTextSize(newSize);
// //     };

// //     const decreaseFontSize = () => {
// //         const newSize = fontSize > FONT_SIZE_CHANGE ? fontSize - FONT_SIZE_CHANGE : 1; 
// //         setFontSize(newSize);
// //         changeTextSize(newSize);
// //     };

// //     const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //         const newSize = parseInt(event.target.value, 10);
// //         if (!isNaN(newSize) && newSize > 0) {
// //             setFontSize(newSize);
// //             changeTextSize(newSize);
// //         }
// //     };
// //     return (
// //         <>
// //         <MyOptionToStyleButton onClick={increaseFontSize}
// //             isActive={false}>
// //             <TextIncreaseRoundedIcon/>
// //         </MyOptionToStyleButton>
// //         <MyOptionToStyleButton onClick={decreaseFontSize}
// //             isActive={false}>
// //                 <TextDecreaseRoundedIcon/>
// //             </MyOptionToStyleButton>
// //         {/* <button
// //                     onClick={() => increaseFontSize()}
// //                     style={{
// //                         margin: '5px',
// //                         padding: '10px',
// //                         backgroundColor: '#f0f0f0',
// //                         border: '1px solid #ccc',
// //                         borderRadius: '5px',
// //                         cursor: 'pointer'
// //                     }}
// //                 >
// //                     A
// //                 </button> */}
// //                 {/* <button
// //                     onClick={() => decreaseFontSize()}
// //                     style={{
// //                         margin: '5px',
// //                         padding: '10px',
// //                         backgroundColor: '#f0f0f0',
// //                         border: '1px solid #ccc',
// //                         borderRadius: '5px',
// //                         cursor: 'pointer'
// //                     }}
// //                 >
// //                     a
// //                 </button> */}
// //             <TextField
// //                 type="number"
// //                 value={fontSize}
// //                 onChange={handleFontSizeChange}
// //                 inputProps={{ min: 1 }}
// //                 style={{ width: '60px', marginTop: '7px' }}
// //                 variant="outlined"
// //                 size="small"
// //             />
// //         </>
// //     )
// // };
// // export default TextSize;
