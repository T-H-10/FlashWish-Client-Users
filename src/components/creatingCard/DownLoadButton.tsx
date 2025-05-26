import type React from "react"
import { useState } from "react"
import type * as fabric from "fabric"
import saveAs from "file-saver"
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded"
import StyleButton from "../style/StyleButton"

interface DownloadButtonProps {
  canvas: fabric.Canvas
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ canvas }) => {
  const [isDownloading, setIsDownloading] = useState(false)

  const downloadImage = async () => {
    if (!canvas) return

    setIsDownloading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const dataUrl = canvas.toDataURL({
        format: "png",
        quality: 1,
        multiplier: 2 // תמונה באיכות גבוהה
      });
      console.log(dataUrl);
      
      const blob = await (await fetch(dataUrl)).blob();
      saveAs(blob, "greeting-card-flashwish.png");
      } catch (error) {
        console.error("Error downloading image:", error)
      } finally {
        setIsDownloading(false)
    }
  };

  // const downloadImage = async () => {
  //   if (!canvas) return

  //   setIsDownloading(true)
  //   try {
  //     const canvasElement = canvas.toCanvasElement()

  //     // Add a small delay to ensure the canvas is fully rendered
  //     await new Promise((resolve) => setTimeout(resolve, 100))

  //     canvasElement.toBlob((blob) => {
  //       if (blob) {
  //         saveAs(blob, "greeting-card-flashwish.png")
  //       }
  //       setIsDownloading(false)
  //     }, "image/png")
  //   } catch (error) {
  //     console.error("Error downloading image:", error)
  //     setIsDownloading(false)
  //   }
  // }

  return (
    <div className="relative">
      <StyleButton onClick={downloadImage} title="הורד כתמונה">
        <DownloadRoundedIcon />
      </StyleButton>

      {isDownloading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
          <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  )
}

export default DownloadButton