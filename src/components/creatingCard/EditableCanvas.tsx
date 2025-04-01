import * as fabric from "fabric";
import { useEffect, useState } from "react";
import TextAddition from "./TextAddition";
import TextColor from "./TextColor";
import TextSize from "./TextSize";
import TextBold from "./TextBold";
import TextBackground from "./TextBackgroundColor";
import DownloadButton from "./DownLoadButton";
import TextItalic from "./TextItalic";
import TextUnderline from "./TextUnderline";

const EditableCanvas = ({ imageUrl }: { imageUrl: string}) => {
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
    // console.log('in editable canvas');
    // console.log(imageUrl);
    
const loadImage = async (url: string, newCanvas: fabric.Canvas)=>{
    try{
        // const response = await fetch(url, {mode: "cors"});
        // const blob = await response.blob();
        // const imgURL = URL.createObjectURL(blob);

        fabric.Image.fromURL(url, { crossOrigin: "anonymous" }).then((img: any) => {
            if (!img) return;

            img.scaleToWidth(500);
            newCanvas.setWidth(img.width || 500);
            newCanvas.setHeight(img.height || 500);
            newCanvas.backgroundImage = img;
            newCanvas.renderAll();
            newCanvas.hoverCursor = 'default';
        });
    }catch (error) {
        console.error("Error loading image:", error);
    }
}

    useEffect(() => {
        const newCanvas = new fabric.Canvas('c');
        setCanvas(newCanvas);
        if(imageUrl){
            loadImage(imageUrl, newCanvas);
        } else {
            console.error("imageUrl is not defined");
        }

        return () => {
            newCanvas.dispose();
        };
    }, [imageUrl]);

    
    const saveDesign = () => {
        if (canvas) {
            const json = canvas.toJSON();
            // dispatch(addCard({ id: Date.now(), design: json })); // Save the design
            console.log("Design saved:", json);
        }
    };

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                <canvas id="c" style={{ cursor: 'default' }} />
                {canvas && (
                    <div>
                        <div>
                            <TextAddition canvas={canvas} />
                        </div>
                        <TextBold canvas={canvas} />
                        <TextSize canvas={canvas} />
                        <TextItalic canvas={canvas}/>
                        <TextUnderline canvas={canvas}/>
                        <TextColor canvas={canvas} />
                        <TextBackground canvas={canvas}/>
                        <DownloadButton canvas={canvas} />
                        <button onClick={saveDesign}>שמור עיצוב</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default EditableCanvas;
