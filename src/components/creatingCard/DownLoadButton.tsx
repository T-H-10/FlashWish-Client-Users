"use client"

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
      const canvasElement = canvas.toCanvasElement()

      // Add a small delay to ensure the canvas is fully rendered
      await new Promise((resolve) => setTimeout(resolve, 100))

      canvasElement.toBlob((blob) => {
        if (blob) {
          saveAs(blob, "greeting-card-flashwish.png")
        }
        setIsDownloading(false)
      }, "image/png")
    } catch (error) {
      console.error("Error downloading image:", error)
      setIsDownloading(false)
    }
  }

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


// import saveAs from "file-saver";
// import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
// import MyOptionToStyleButton from "../style/MyOptionToStyleButton";
// import * as fabric from 'fabric';

// const DownloadButton = ({ canvas }: { canvas: fabric.Canvas }) => {
//     const downloadImage = () => {
//         if (!canvas) return;
//         const canvasElement = canvas.toCanvasElement();

//         canvasElement.toBlob((blob) => {
//             if (blob) {
//                 saveAs(blob, "greeting-card-flashwish.png");
//             }
//         }, "image/png");
//     };

//     return (
//         <>
//             <MyOptionToStyleButton onClick={downloadImage}
//                 isActive={true}>
//                 <DownloadRoundedIcon />
//             </MyOptionToStyleButton>
//             {/* <button
//             onClick={downloadImage}
//             style={{
//                 backgroundColor: '#f0f0f0',
//                 border: '1px solid #ccc',
//                 borderRadius: '5px',
//                 cursor: 'pointer',
//                 alignItems: 'center'
//             }}
//         >
//             <DownloadRoundedIcon/>
//         </button> */}
//         </>
//     );
// };

// export default DownloadButton;
