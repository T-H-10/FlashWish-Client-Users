import { useState, useEffect } from "react"
import type * as fabric from "fabric"
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight"
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter"
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft"
import StyleButton from "../style/StyleButton"

interface TextAlignProps {
  canvas: fabric.Canvas
}

// const alignments: ("right" | "center" | "left")[] = ["right", "center", "left"]

const TextAlign: React.FC<TextAlignProps> = ({ canvas }) => {
  const [currentAlign, setCurrentAlign] = useState<"right" | "center" | "left">("right")

  useEffect(() => {
    const updateAlignState = () => {
      const activeObject = canvas?.getActiveObject() as fabric.IText
      if (activeObject && activeObject.type === "textbox") {
        const textAlign = activeObject.textAlign as "right" | "center" | "left"
        setCurrentAlign(textAlign)
      }
    }

    canvas.on("selection:created", updateAlignState)
    canvas.on("selection:updated", updateAlignState)

    return () => {
      canvas.off("selection:created", updateAlignState)
      canvas.off("selection:updated", updateAlignState)
    }
  }, [canvas])

  const handleChangeAlign = (align: "right" | "center" | "left") => {
    const activeObject = canvas?.getActiveObject() as fabric.IText
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set("textAlign", align)
      setCurrentAlign(align)
      canvas?.renderAll()
    }
  }

  return (
    <div className="flex gap-1">
      <StyleButton
        onClick={() => handleChangeAlign("right")}
        isActive={currentAlign === "right"}
        title="יישור לימין"
      >
        <FormatAlignRightIcon />
      </StyleButton>

      <StyleButton
        onClick={() => handleChangeAlign("center")}
        isActive={currentAlign === "center"}
        title="יישור למרכז"
      >
        <FormatAlignCenterIcon />
      </StyleButton>

      <StyleButton
        onClick={() => handleChangeAlign("left")}
        isActive={currentAlign === "left"}
        title="יישור לשמאל"
      >
        <FormatAlignLeftIcon />
      </StyleButton>
    </div>
  )
}

export default TextAlign
