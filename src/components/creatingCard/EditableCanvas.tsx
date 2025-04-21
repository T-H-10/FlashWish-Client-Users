import * as fabric from "fabric";
import { useEffect, useRef, useState } from "react";
import TextAddition from "./TextAddition";
import TextColor from "./TextColor";
import TextSize from "./TextSize";
import TextBold from "./TextBold";
import TextBackground from "./TextBackgroundColor";
import DownloadButton from "./DownLoadButton";
import TextItalic from "./TextItalic";
import TextUnderline from "./TextUnderline";
import { appDispatch } from "../../Store/Store";
import { useDispatch } from "react-redux";
import LoadingIndicator from "../LoadingIndicator";

// נתיב לרקע דיפולטיבי
const DEFAULT_IMAGE = "https://res.cloudinary.com/dnschz6cr/image/upload/v1745242362/Flux_Schnell_Create_a_rich_and_textured_background_for_Passove_0.jpeg.jpg";

const EditableCanvas = ({ imageUrl }: { imageUrl: string }) => {
    const dispatch = useDispatch<appDispatch>();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricRef = useRef<fabric.Canvas | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    // מעלה תמונה ומציבה כרקע בקנבס
    const setCanvasBackground = async (url: string) => {
        if (!fabricRef.current) return;
        setLoading(true);
        try { 
             // קודם נוודא שהתמונה אכן זמינה
        const loadedImage = await new Promise<HTMLImageElement>((resolve, reject) => {
            const testImg = new Image();
            testImg.crossOrigin = "anonymous";
            testImg.onload = () => resolve(testImg);
            testImg.onerror = () => reject(new Error("Image failed to load"));
            testImg.src = url;
        });
        // רק לאחר שהטעינה הצליחה, נטען לפבריק
        const img = new fabric.Image(loadedImage);
        img.scaleToWidth(500);

        const canvas = fabricRef.current;
        canvas.setWidth(img.width || 500);
        canvas.setHeight(img.height || 500);
        canvas.backgroundImage=img;
        canvas.renderAll.bind(canvas);
    } catch (err) {
            console.error("Error setting background:", err);
            alert("הרקע נכשל בטעינה – ייתכן שיש בעיית קישור או תמונה לא זמינה");
        } finally {
            setLoading(false);
        }
    };

    // יוצר את הקנבס פעם אחת בלבד
    useEffect(() => {
        const element = canvasRef.current;
        if (!element) return;
        const canvas = new fabric.Canvas(element, {
            preserveObjectStacking: true,
        });
        fabricRef.current = canvas;

        // טען רקע דיפולטיבי כשנוצר הקנבס
        setCanvasBackground(DEFAULT_IMAGE);
        return () => {
            canvas.dispose();
            fabricRef.current = null;
        };
    }, []);

    // בכל פעם ש-imageUrl משתנה, נעדכן רקע
    useEffect(() => {
        if (fabricRef.current && imageUrl) {
            setCanvasBackground(imageUrl);
        }
    }, [imageUrl]);

    const saveDesign = () => {
        if (fabricRef.current) {
            const json = fabricRef.current.toJSON();
            console.log("Design saved:", json);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <canvas ref={canvasRef} style={{ cursor: 'default' }} />

            {fabricRef.current && !loading && (
                <div>
                    <div>
                    <TextAddition canvas={fabricRef.current} />
                    </div>
                    <TextBold canvas={fabricRef.current} />
                    <TextSize canvas={fabricRef.current} />
                    <TextItalic canvas={fabricRef.current} />
                    <TextUnderline canvas={fabricRef.current} />
                    <TextColor canvas={fabricRef.current} />
                    <TextBackground canvas={fabricRef.current} />
                    <DownloadButton canvas={fabricRef.current} />
                    <button onClick={saveDesign}>שמור עיצוב</button>
                </div>
            )}

            {loading && <LoadingIndicator content="טוען רקע..." />}
        </div>
    );
};

export default EditableCanvas;


// import * as fabric from "fabric";
// import { useEffect, useRef, useState } from "react";
// import TextAddition from "./TextAddition";
// import TextColor from "./TextColor";
// import TextSize from "./TextSize";
// import TextBold from "./TextBold";
// import TextBackground from "./TextBackgroundColor";
// import DownloadButton from "./DownLoadButton";
// import TextItalic from "./TextItalic";
// import TextUnderline from "./TextUnderline";
// import { appDispatch } from "../../Store/Store";
// import { useDispatch } from "react-redux";
// import LoadingIndicator from "../LoadingIndicator";

// const EditableCanvas = ({ imageUrl }: { imageUrl: string }) => {
//     console.log("imageUrl in EditableCanvas:", imageUrl);

//     const dispatch = useDispatch<appDispatch>();
//     // const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const fabricRef = useRef<fabric.Canvas | null>(null);
//     const [loading, setLoading] = useState<boolean>(false);

//     // טוען תמונה ומציב כרקע בקנבס
//     const loadImage = async (url: string, fabricCanvas: fabric.Canvas) => {
//         setLoading(true);
//         try {
//             // const response = await fetch(url, {mode: "cors"});
//             // const blob = await response.blob();
//             // const imgURL = URL.createObjectURL(blob);

//             const img= await fabric.Image.fromURL(url, { crossOrigin: "anonymous" });
//                 if (!img) {
//                     throw new Error("Image could not be loaded");
//                 }
//                 fabricCanvas.clear();
                
//                 img.scaleToWidth(500);
//                 fabricCanvas.setWidth(img.width || 500);
//                 fabricCanvas.setHeight(img.height || 500);
//                 fabricCanvas.backgroundImage = img;
//                 fabricCanvas.renderAll();
//                 fabricCanvas.hoverCursor = 'default';
//                 setLoading(false);
//         } catch (error) {
//             console.error("Error loading image:", error);
//             setLoading(false);
//         }
//     }

//     // useEffect(() => {
//     //     console.log("imageUrl changed:", imageUrl);
//     //     if(canvasRef.current) {
//     //         if (canvas) {
//     //             canvas.dispose();
//     //         }
//     //         const newCanvas = new fabric.Canvas(canvasRef.current);
//     //         setCanvas(newCanvas);
//     //     }
//     //     if (canvas && imageUrl) {
//     //         setLoading(true);
//     //         loadImage(imageUrl, canvas);
//     //     }
//     //     return () => {
//     //         if(canvas) {
//     //         canvas.dispose();
//     //         }
//     //         setCanvas(null);
//     //     };
//     // }, [canvas, imageUrl]);
//     useEffect(() => {
//         const canvasElement = canvasRef.current;
//         if (!canvasElement) {
//             return;
//         }
//         if(fabricRef.current) {
//             fabricRef.current.dispose();
//             fabricRef.current = null;
//         }
//         const fabricCanvas = new fabric.Canvas(canvasElement,{
//             preserveObjectStacking: true,
//         });
//         fabricRef.current = fabricCanvas;
//         return()=>{
//             fabricCanvas.dispose();
//             fabricRef.current = null;
//         };
//     }, []); 

//     useEffect(() => {
//         if (fabricRef.current && imageUrl) {
//             loadImage(imageUrl, fabricRef.current);
//         }
//     }, [imageUrl]);
    
//     const saveDesign = () => {
//         if (fabricRef.current) {
//             const json = fabricRef.current.toJSON();
//             // dispatch(addCard({ id: Date.now(), design: json })); // Save the design
//             console.log("Design saved:", json);
//         }
//     };

//     return (
//         <>
//             <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
//                 <canvas ref={canvasRef} id={`canvas-${imageUrl}`} key={imageUrl} style={{ cursor: 'default' }} />
//                 {fabricRef.current && !loading && (
//                     <div>
//                         <div>
//                             <TextAddition canvas={fabricRef.current} />
//                         </div>
//                         <TextBold canvas={fabricRef.current} />
//                         <TextSize canvas={fabricRef.current} />
//                         <TextItalic canvas={fabricRef.current} />
//                         <TextUnderline canvas={fabricRef.current} />
//                         <TextColor canvas={fabricRef.current} />
//                         <TextBackground canvas={fabricRef.current} />
//                         <DownloadButton canvas={fabricRef.current} />
//                         <button onClick={saveDesign}>שמור עיצוב</button>
//                     </div>
//                 )}
//                 { loading && <LoadingIndicator content='טוען רקע...' /> }
//             </div>
//         </>
//     );
// };

// export default EditableCanvas;
