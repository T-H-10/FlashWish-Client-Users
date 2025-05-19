import React, { useState, useEffect } from 'react';
import FormatUnderlinedRoundedIcon from '@mui/icons-material/FormatUnderlinedRounded';
import StyleButton from '../style/StyleButton';
import '../cssPages/creatingCard/TextUnderline.css';
import * as fabric from "fabric";

interface TextUnderlineProps {
  canvas: fabric.Canvas
}

const TextUnderline: React.FC<TextUnderlineProps> = ({ canvas }) => {
  const [isUnderlined, setIsUnderlined] = useState<boolean>(false)

  useEffect(() => {
    const updateUnderlineState = () => {
      const activeObject = canvas?.getActiveObject() as fabric.IText
      if (activeObject && activeObject.type === "textbox") {
        setIsUnderlined(activeObject.underline || false)
      }
    }

    canvas.on("selection:created", updateUnderlineState)
    canvas.on("selection:updated", updateUnderlineState)

    return () => {
      canvas.off("selection:created", updateUnderlineState)
      canvas.off("selection:updated", updateUnderlineState)
    }
  }, [canvas])

  const toggleUnderline = () => {
    const activeObject = canvas?.getActiveObject() as fabric.IText
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set("underline", !isUnderlined)
      setIsUnderlined(!isUnderlined)
      canvas?.renderAll()
    }
  }

  return (
    <div className="cosmic-underline-container">
      <div className="cosmic-underline-glow"></div>
      <StyleButton onClick={toggleUnderline} isActive={isUnderlined} title="קו תחתון">
        <FormatUnderlinedRoundedIcon />
      </StyleButton>
    </div>
  )
}

export default TextUnderline;

// "use client"
// import { useState, useEffect } from "react"
// import type * as fabric from "fabric"
// import FormatUnderlinedRoundedIcon from "@mui/icons-material/FormatUnderlinedRounded"
// import StyleButton from "../style/StyleButton"

// interface TextUnderlineProps {
//   canvas: fabric.Canvas
// }

// const TextUnderline: React.FC<TextUnderlineProps> = ({ canvas }) => {
//   const [isUnderlined, setIsUnderlined] = useState<boolean>(false)

//   useEffect(() => {
//     const updateUnderlineState = () => {
//       const activeObject = canvas?.getActiveObject() as fabric.IText
//       if (activeObject && activeObject.type === "textbox") {
//         setIsUnderlined(activeObject.underline || false)
//       }
//     }

//     canvas.on("selection:created", updateUnderlineState)
//     canvas.on("selection:updated", updateUnderlineState)

//     return () => {
//       canvas.off("selection:created", updateUnderlineState)
//       canvas.off("selection:updated", updateUnderlineState)
//     }
//   }, [canvas])

//   const toggleUnderline = () => {
//     const activeObject = canvas?.getActiveObject() as fabric.IText
//     if (activeObject && activeObject.type === "textbox") {
//       activeObject.set("underline", !isUnderlined)
//       setIsUnderlined(!isUnderlined)
//       canvas?.renderAll()
//     }
//   }

//   return (
//     <div className="relative">
//     <StyleButton onClick={toggleUnderline} isActive={isUnderlined} title="קו תחתון">
//       <FormatUnderlinedRoundedIcon />
//     </StyleButton>
//     </div>
//   )
// }

// export default TextUnderline


// import { useState } from 'react';
// import FormatUnderlinedRoundedIcon from '@mui/icons-material/FormatUnderlinedRounded';
// import * as fabric from 'fabric';
// import MyOptionToStyleButton from '../style/MyOptionToStyleButton';

// interface CustomFabricText extends fabric.IText {
//     textDecoration?: 'none' | 'underline'; // הוספת מאפיין לקו תחתי
// }

// const TextUnderline = ({ canvas }: { canvas: fabric.Canvas }) => {
//     const [isUnderlined, setIsUnderlined] = useState<boolean>(false);

//     const toggleUnderline = () => {
//         const activeObject = canvas?.getActiveObject() as CustomFabricText;
//         if (activeObject && activeObject.type === 'textbox') {
//             activeObject.set('underline', !isUnderlined);
//             setIsUnderlined(!isUnderlined);
//             canvas?.renderAll();
//         }
//     };

//     return (
//         <>
//             <MyOptionToStyleButton onClick={toggleUnderline}
//                 isActive={isUnderlined}
//             >
//                 <FormatUnderlinedRoundedIcon />
//             </MyOptionToStyleButton>
//             {/* <button onClick={toggleUnderline}
//                 style={{
//                     backgroundColor: isUnderlined ? '#ddd' : '#f0f0f0',
//                     border: '1px solid #ccc',
//                     borderRadius: '5px',
//                     cursor: 'pointer',
//                     alignItems: 'center',
//                     padding: '5px'
//                 }}>
//                 <FormatUnderlinedRoundedIcon />
//             </button> */}
//         </>
//     );
// };

// export default TextUnderline;
