import * as fabric from "fabric";
import { useEffect, useState } from "react";
import TextAddition from "./TextAddition";
import TextColor from "./TextColor";
import TextSize from "./TextSize";
import TextBold from "./TextBold";
import TextBackground from "./TextBackGround";

const EditableCanvas = ({ imageUrl }: { imageUrl: string; }) => {
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

    useEffect(() => {
        const newCanvas = new fabric.Canvas('c');
        setCanvas(newCanvas);

        fabric.Image.fromURL(imageUrl, { crossOrigin: "anonymous" }).then((img: any) => {
            if (!img) return;

            img.scaleToWidth(500);
            newCanvas.setWidth(img.width || 500);
            newCanvas.setHeight(img.height || 500);
            newCanvas.backgroundImage = img;
            newCanvas.renderAll();
            newCanvas.hoverCursor = 'default';
        });

        return () => {
            newCanvas.dispose();
        };

    }, [imageUrl]);

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
                <canvas id="c" style={{ cursor: 'default' }} />
                {canvas &&
                    <div>
                        <div>
                            <TextAddition canvas={canvas} />
                        </div>
                        <TextBold canvas={canvas} />
                        <TextColor canvas={canvas} />
                        <TextSize canvas={canvas} />
                        <TextBackground canvas={canvas}/>
                    </div>
                }
            </div>
        </>
    );
};

export default EditableCanvas;
