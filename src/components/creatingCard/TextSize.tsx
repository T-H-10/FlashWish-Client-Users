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
