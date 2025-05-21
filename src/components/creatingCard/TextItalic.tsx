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
    <div className="relative">
      <StyleButton onClick={toggleItalic} isActive={isItalic} title="נטוי">
        <FormatItalicRoundedIcon />
      </StyleButton>
    </div>

  )
}

export default TextItalic

