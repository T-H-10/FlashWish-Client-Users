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