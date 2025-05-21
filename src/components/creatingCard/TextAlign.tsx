import { useState, useEffect } from "react"
import type * as fabric from "fabric"
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight"
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter"
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft"
import StyleButton from "../style/StyleButton"
import "../cssPages/creatingCard/TextAlign.css"

interface TextAlignProps {
  canvas: fabric.Canvas
}

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
    <div className="cosmic-text-align">
      <div className="cosmic-align-container">
        <div className="cosmic-align-stars">
          {Array.from({ length: 5 }).map((_, index) => (
            <div 
              key={index}
              className="cosmic-align-star"
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
        
        <div className="cosmic-align-buttons">
          <div className="cosmic-align-button-wrapper">
            <StyleButton
              onClick={() => handleChangeAlign("right")}
              isActive={currentAlign === "right"}
              title="יישור לימין"
            >
              <FormatAlignRightIcon />
            </StyleButton>
          </div>

          <div className="cosmic-align-button-wrapper">
            <StyleButton
              onClick={() => handleChangeAlign("center")}
              isActive={currentAlign === "center"}
              title="יישור למרכז"
            >
              <FormatAlignCenterIcon />
            </StyleButton>
          </div>

          <div className="cosmic-align-button-wrapper">
            <StyleButton
              onClick={() => handleChangeAlign("left")}
              isActive={currentAlign === "left"}
              title="יישור לשמאל"
            >
              <FormatAlignLeftIcon />
            </StyleButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextAlign
