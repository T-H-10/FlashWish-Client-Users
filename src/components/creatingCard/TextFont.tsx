import React, { useState, useEffect } from "react";
import StyleSelect from "../style/StyleSelect";
import '../cssPages/creatingCard/TextFont.css'
import * as fabric from "fabric";

interface TextFontProps {
  canvas: fabric.Canvas
}

const availableFonts = [
  // אנגליים
  "Arial", "Times New Roman", "Courier New",
  "Georgia", "Verdana", "Tahoma",
  "Impact", "Comic Sans MS",
  // עבריים
  "Rubik", "Assistant", "Heebo",
  "Alef", "Varela Round", "Secular One",
  "Frank Ruhl Libre", "David Libre",
  "Noto Sans Hebrew"
]



const TextFont: React.FC<TextFontProps> = ({ canvas }) => {
  const [fontFamily, setFontFamily] = useState<string>("Arial")

  useEffect(() => {
    const updateFontState = () => {
      const activeObject = canvas?.getActiveObject() as fabric.IText
      if (activeObject && activeObject.type === "textbox") {
        setFontFamily(activeObject.fontFamily || "Arial")
      }
    }

    canvas.on("selection:created", updateFontState)
    canvas.on("selection:updated", updateFontState)

    return () => {
      canvas.off("selection:created", updateFontState)
      canvas.off("selection:updated", updateFontState)
    }
  }, [canvas])

  const handleFontChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFont = e.target.value
    const activeObject = canvas?.getActiveObject() as fabric.IText
    if (activeObject && activeObject.type === "textbox") {
      activeObject.set("fontFamily", newFont)
      setFontFamily(newFont)
      canvas?.renderAll()
    }
  }

  return (
    <div className="cosmic-font-container">
      <div className="cosmic-font-glow"></div>
      <StyleSelect value={fontFamily} onChange={handleFontChange}
      // title="בחר גופן"
      >
        {availableFonts.map((font) => (
          <option key={font} value={font} style={{ fontFamily: font }}>
            {font}
          </option>
        ))}
      </StyleSelect>
    </div>
  )
}

export default TextFont;