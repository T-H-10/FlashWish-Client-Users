import { useState, useEffect } from "react"
import type * as fabric from "fabric"
import FormatColorFillRoundedIcon from "@mui/icons-material/FormatColorFillRounded"
import "../cssPages/creatingCard/TextBackground.css"

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
    <div className="cosmic-text-background">
      <div className="cosmic-color-picker-container">
        <div className="cosmic-color-picker-wrapper">
          <input
            type="color"
            value={color}
            onChange={handleColorChange}
            className="cosmic-color-picker"
            title="צבע רקע"
          />
          <div
            className="cosmic-color-preview"
            style={{ backgroundColor: color }}
          ></div>
          <div className="cosmic-color-icon">
            <FormatColorFillRoundedIcon />
          </div>
        </div>

        <div className="cosmic-alpha-slider-container">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={alpha}
            onChange={handleAlphaChange}
            className="cosmic-alpha-slider"
            title="שקיפות רקע"
            style={{
              background: `linear-gradient(to right, ${color} 0%, transparent 100%)`,
              ["--thumb-color" as any]: color,
              ["--thumb-opacity" as any]: alpha
            }}
          />
          <div className="cosmic-alpha-track"></div>
          {/* <div
            className="cosmic-alpha-thumb"
            style={{
              left: `calc(${(1 - alpha) * 100}% - ${(1 - alpha) * 10}px)`
            }}> */}
            {/* <div className="thumb-inner"
              style={{ backgroundColor: color, opacity: alpha }} /> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  )
}

export default TextBackground