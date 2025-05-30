// "use client"

// import type React from "react"

import { useState, useEffect } from "react"
import type * as fabric from "fabric"
import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded"
import StyleButton from "../style/StyleButton"

interface TextBoldProps {
  canvas: fabric.Canvas
}

const TextBold: React.FC<TextBoldProps> = ({ canvas }) => {
  const [isBold, setIsBold] = useState<boolean>(false)

  useEffect(() => {
    const updateBoldState = () => {
      const activeObject = canvas?.getActiveObject() as fabric.IText
      if (activeObject && activeObject.type === "textbox") {
        setIsBold(activeObject.fontWeight === "bold")
      }
    }

    canvas.on("selection:created", updateBoldState)
    canvas.on("selection:updated", updateBoldState)

    return () => {
      canvas.off("selection:created", updateBoldState)
      canvas.off("selection:updated", updateBoldState)
    }
  }, [canvas])

  const toggleBold = () => {
    const activeObject = canvas?.getActiveObject() as fabric.IText
    if (activeObject && activeObject.type === "textbox") {
      const newFontWeight = isBold ? "normal" : "bold"
      activeObject.set("fontWeight", newFontWeight)
      setIsBold(!isBold)
      canvas?.renderAll()
    }
  }

  return (
    <div className="relative">
    <StyleButton onClick={toggleBold} isActive={isBold} title="הדגשה">
      <FormatBoldRoundedIcon />
    </StyleButton>
  </div>
  )
}

export default TextBold