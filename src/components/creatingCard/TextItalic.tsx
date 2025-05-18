// "use client"
import { useState, useEffect } from "react"
import type * as fabric from "fabric"
import FormatItalicRoundedIcon from "@mui/icons-material/FormatItalicRounded"
import StyleButton from "../style/StyleButton"

interface TextItalicProps {
  canvas: fabric.Canvas
}

const TextItalic: React.FC<TextItalicProps> = ({ canvas }) => {
  const [isItalic, setIsItalic] = useState<boolean>(false)

  useEffect(() => {
    const updateItalicState = () => {
      const activeObject = canvas?.getActiveObject() as fabric.IText
      if (activeObject && activeObject.type === "textbox") {
        setIsItalic(activeObject.fontStyle === "italic")
      }
    }

    canvas.on("selection:created", updateItalicState)
    canvas.on("selection:updated", updateItalicState)

    return () => {
      canvas.off("selection:created", updateItalicState)
      canvas.off("selection:updated", updateItalicState)
    }
  }, [canvas])

  const toggleItalic = () => {
    const activeObject = canvas?.getActiveObject() as fabric.IText
    if (activeObject && activeObject.type === "textbox") {
      const newFontStyle = isItalic ? "normal" : "italic"
      activeObject.set("fontStyle", newFontStyle)
      setIsItalic(!isItalic)
      canvas?.renderAll()
    }
  }

  return (
    <StyleButton onClick={toggleItalic} isActive={isItalic} title="נטוי">
      <FormatItalicRoundedIcon />
    </StyleButton>
  )
}

export default TextItalic


// import { useState } from 'react';
// import FormatItalicRoundedIcon from '@mui/icons-material/FormatItalicRounded';
// import MyOptionToStyleButton from '../style/MyOptionToStyleButton';
// import * as fabric from 'fabric';
// // interface CustomFabricText extends fabric.IText {
// //     fontStyle?: "italic" | "normal"; // הוספת המאפיין המותאם אישית
// // }

// const TextItalic = ({ canvas }: { canvas: fabric.Canvas }) => {
//     const [isItalic, setIsItalic] = useState<boolean>(false);

//     const toggleItalic = () => {
//         const activeObject = canvas?.getActiveObject() as fabric.IText | null;
//         if (activeObject && activeObject.type === 'textbox') {
//             const newFontStyle = isItalic ? 'italic' : 'normal';
//             activeObject.set('fontStyle', newFontStyle);
//             setIsItalic(!isItalic);
//             canvas?.renderAll();
//         }
//     };

//     return (
//         <>
//         <MyOptionToStyleButton onClick={toggleItalic} 
//             isActive={!isItalic}>
//             <FormatItalicRoundedIcon />
//         </MyOptionToStyleButton>
//         </>
//     );
// };

// export default TextItalic;