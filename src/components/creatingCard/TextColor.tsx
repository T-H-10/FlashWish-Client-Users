import { useState, useEffect } from "react";
import type * as fabric from "fabric";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import "../cssPages/creatingCard/TextBackground.css";

interface TextColorProps {
  canvas: fabric.Canvas
}

const TextColor: React.FC<TextColorProps> = ({ canvas }) => {
  const [color, setColor] = useState<string>("#000000")

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
    <div className="cosmic-text-color">
      <div className="cosmic-color-orbit">
        <div className="cosmic-orbit-ring"></div>
        <div className="cosmic-orbit-particles">
          {Array.from({ length: 5 }).map((_, index) => (
            <div 
              key={index}
              className="cosmic-orbit-particle"
              style={{
                transform: `rotate(${index * 72}deg) translateX(20px)`,
                backgroundColor: `hsl(${index * 72}, 70%, 60%)`,
                animationDelay: `${index * 0.2}s`
              }}
            ></div>
          ))}
        </div>
        
        <div className="cosmic-color-picker-wrapper">
          <input
            type="color"
            value={color}
            onChange={(e) => changeTextColor(e.target.value)}
            className="cosmic-color-picker"
            title="צבע טקסט"
          />
          <div 
            className="cosmic-color-preview" 
            style={{ backgroundColor: color }}
          ></div>
          <div className="cosmic-color-icon">
            <FormatColorTextIcon />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextColor;
