// "use client"
// import { useContext } from "react"
// import type * as fabric from "fabric"
// import { IsLogin } from "../../../App"
// import { COSMIC_COLORS } from "../../../utils/Comsic-theme"
// import DownloadButton from "../DownLoadButton"
// import TextBackground from "../TextBackgroundColor"
// import TextBold from "../TextBold"
// import TextColor from "../TextColor"
// import TextItalic from "../TextItalic"
// import TextSize from "../TextSize"
// import TextUnderline from "../TextUnderline"
// import TextAddition from "../TextAddition"

// interface CanvasControlsProps {
//   canvas: fabric.Canvas
//   saveDesign: () => void
// }

// const CanvasControls: React.FC<CanvasControlsProps> = ({ canvas, saveDesign }) => {
//   const [isLogin] = useContext(IsLogin)

//   return (
//     <div className="flex flex-col space-y-6 p-4">
//       <div className="text-center">
//         <h3 className={`text-xl font-bold text-[${COSMIC_COLORS.secondary}] mb-4`}>עריכת טקסט</h3>
//         <TextAddition canvas={canvas} />
//       </div>

//       <div className="border-t border-b border-[${COSMIC_COLORS.primaryLight}] py-4">
//         <h3 className={`text-lg font-bold text-[${COSMIC_COLORS.secondary}] mb-3 text-center`}>עיצוב טקסט</h3>
//         <div className="flex flex-wrap justify-center gap-3">
//           <TextBold canvas={canvas} />
//           <TextItalic canvas={canvas} />
//           <TextUnderline canvas={canvas} />
//           <TextSize canvas={canvas} />
//           <TextColor canvas={canvas} />
//           <TextBackground canvas={canvas} />
//         </div>
//       </div>

//       <div className="flex justify-center gap-4">
//         <DownloadButton canvas={canvas} />

//         {isLogin && (
//           <button
//             onClick={saveDesign}
//             className={`
//               px-6 py-2 rounded-lg
//               bg-gradient-to-r from-[${COSMIC_COLORS.cosmicPurple}] to-[${COSMIC_COLORS.cosmicPink}]
//               text-[${COSMIC_COLORS.textLight}]
//               hover:shadow-lg hover:shadow-[${COSMIC_COLORS.glowColor}]
//               hover:transform hover:scale-105
//               transition-all duration-300
//             `}
//           >
//             שמור עיצוב
//           </button>
//         )}
//       </div>
//     </div>
//   )
// }

// export default CanvasControls


import { useContext } from "react";
import DownloadButton from "../DownLoadButton";
import TextAddition from "../TextAddition";
import TextBackground from "../TextBackgroundColor";
import TextBold from "../TextBold";
import TextColor from "../TextColor";
import TextItalic from "../TextItalic";
import TextSize from "../TextSize";
import TextUnderline from "../TextUnderline";
import * as fabric from "fabric";
import { IsLogin } from "../../../App";

const CanvasControls = ({ canvas, saveDesign }: { canvas: fabric.Canvas, saveDesign: ()=>void }) => {
    const [isLogin] = useContext(IsLogin);
    return (
        <div>
            <TextAddition canvas={canvas} />
            <TextBold canvas={canvas} />
            <TextSize canvas={canvas} />
            <TextItalic canvas={canvas} />
            <TextUnderline canvas={canvas} />
            <TextColor canvas={canvas} />
            <TextBackground canvas={canvas} />
            <DownloadButton canvas={canvas} />
            {isLogin &&
             <button onClick={() => saveDesign()}>שמור עיצוב</button>}
        </div>
    );
};

export default CanvasControls;
