import { useContext } from "react";
import DownloadButton from "../DownLoadButton";
import TextBackground from "../TextBackgroundColor";
import TextBold from "../TextBold";
import TextColor from "../TextColor";
import TextItalic from "../TextItalic";
import TextSize from "../TextSize";
import TextUnderline from "../TextUnderline";
import * as fabric from "fabric";
import { IsLogin } from "../../../App";
import "../../cssPages/creatingCard/CanvasControls.css";
import TextAlign from "../TextAlign";
import TextAddition from "../TextAddition";
import TextFont from "../TextFont";

const CanvasControls = ({ canvas, saveDesign }: { canvas: fabric.Canvas, saveDesign: () => void }) => {
  const [isLogin] = useContext(IsLogin);

  return (
    <div className="canvas-controls">
      <TextAddition canvas={canvas} />
      <TextAlign canvas={canvas}/>
      <TextSize canvas={canvas} />
      <TextFont canvas={canvas}/>
      <TextBold canvas={canvas} />
      <TextItalic canvas={canvas} />
      <TextUnderline canvas={canvas} />
      <TextColor canvas={canvas} />
      <TextBackground canvas={canvas} />
      <DownloadButton canvas={canvas} />
      {isLogin && (
        <button className="save-button" onClick={saveDesign}>שמור עיצוב</button>
      )}
    </div>
  );
};

export default CanvasControls;