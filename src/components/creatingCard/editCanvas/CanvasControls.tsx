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
