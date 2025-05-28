import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appDispatch } from "../../../Store/Store";
import { UserContext } from "../../../types/UserTypes";
import { selectTemplates } from "../../../Store/templatesStore/TemplatesSlice";
import * as fabric from "fabric";
import { fetchTemplateById } from "../../../Store/templatesStore/TemplatesApi";
import setCanvasBackground from "./setCanvasBackground";
import { addGreetingCard, updateGreetingCard } from "../../../Store/cardsStore/GreetingCardsApi";
import LoadingIndicator from "../../LoadingIndicator";
import { GreetingCard } from "../../../types/GreetingCardsTypes";
import CanvasControls from "./CanvasControls";
import MyAlert from "../../style/MyAlert";
import loadCanvasFromJSONKeepBackgroundFromTemplate from "./CanvasUtils";

export const DEFAULT_IMAGE = "v1746302666/logo.jpg.jpg";

const EditableCanvas = ({ cardData }: { cardData: GreetingCard }) => {
    const dispatch = useDispatch<appDispatch>();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricRef = useRef<fabric.Canvas | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const currentUserId = useContext(UserContext).user.id;
    const { selectedTemplate } = useSelector(selectTemplates);
    const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [typeMessage, setTypeMessage] = useState<"error" | "warning" | "info" | "success">("info");
    const [loadedFromJSON, setLoadedFromJSON] = useState<boolean>(false);

    useEffect(() => {
        const setupCanvas = async () => {
            if (!canvasRef.current) return;

            if (!fabricRef.current) {
                fabricRef.current = new fabric.Canvas(canvasRef.current, { preserveObjectStacking: true });
            }

            if (cardData && cardData.templateID) {
                let template = selectedTemplate;
                if(!template || template.templateID!==cardData.templateID){
                    const result = await dispatch(fetchTemplateById(cardData.templateID));
                    if(fetchTemplateById.fulfilled.match(result)) {
                        template = result.payload;
                    }
                }
                const imageURL = template?.imageURL || DEFAULT_IMAGE;
                if(cardData.canvasStyle) {
                    setLoadedFromJSON(true);
                    await loadCanvasFromJSONKeepBackgroundFromTemplate(cardData.canvasStyle, fabricRef, imageURL, setLoading, true);
                } else {
                    setCanvasBackground(imageURL, setLoading, fabricRef);
                }
            }
        };
        setupCanvas();
    }, [cardData, dispatch]);
    const saveDesign = () => {
        if (!fabricRef.current) return;
        try {
            const json = JSON.stringify(fabricRef.current.toJSON());
            if (cardData.cardID !== -1) {
                dispatch(
                    updateGreetingCard({
                        id: cardData.cardID,
                        updatedCard: {
                            ...cardData,
                            canvasStyle: json,
                        },
                    })
                );
                setTitle("העיצוב התעדכן בהצלחה!");
                setTypeMessage("success");
                setIsAlertOpen(true);
            } else {
                dispatch(
                    addGreetingCard({
                        userID: currentUserId || 0,
                        textID: cardData.textID,
                        categoryID: cardData.categoryID,
                        templateID: cardData.templateID,
                        canvasStyle: json,
                    })
                );
                setTitle("העיצוב נשמר בהצלחה!");
                setTypeMessage("success");
                setIsAlertOpen(true);
            }} catch (error) {
            setTitle("שגיאה!");
            setMessage("שגיאה בשמירת העיצוב. אנא נסה שוב מאוחר יותר.");
            setTypeMessage("error");
            setIsAlertOpen(true);
        }};
    return (
        <>
            <div style={{ display: "flex", flexDirection: "column-reverse" }}>
                <canvas ref={canvasRef} style={{ cursor: "default" }} />
                {fabricRef.current && !loading && <CanvasControls saveDesign={saveDesign} canvas={fabricRef.current} loadedFromJSON={loadedFromJSON} />}
                {loading && <LoadingIndicator content="טוען רקע" />}
            </div>
            <MyAlert
                isOpen={isAlertOpen}
                title={title}
                type={typeMessage}
                message={message}
                onConfirm={() => {
                    setIsAlertOpen(false);
                }}
            />
        </>
    );
}
export default EditableCanvas;


// import { useContext, useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { appDispatch } from "../../../Store/Store";
// import { UserContext } from "../../../types/UserTypes";
// import { selectTemplates } from "../../../Store/templatesStore/TemplatesSlice";
// import * as fabric from "fabric";
// import { fetchTemplateById } from "../../../Store/templatesStore/TemplatesApi";
// import setCanvasBackground from "./setCanvasBackground";
// import { addGreetingCard, updateGreetingCard } from "../../../Store/cardsStore/GreetingCardsApi";
// import LoadingIndicator from "../../LoadingIndicator";
// import { GreetingCard } from "../../../types/GreetingCardsTypes";
// import CanvasControls from "./CanvasControls";
// import MyAlert from "../../style/MyAlert";

// export const DEFAULT_IMAGE = "v1746302666/logo.jpg.jpg";

// const EditableCanvas = ({ cardData }: { cardData: GreetingCard }) => {
//     const dispatch = useDispatch<appDispatch>();
//     const canvasRef = useRef<HTMLCanvasElement>(null);
//     const fabricRef = useRef<fabric.Canvas | null>(null);
//     const [loading, setLoading] = useState<boolean>(false);
//     const currentUserId = useContext(UserContext).user.id;
//     const { selectedTemplate } = useSelector(selectTemplates);
//     const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);
//     const [title, setTitle] = useState<string>("");
//     const [message, setMessage] = useState<string>("");
//     const [typeMessage, setTypeMessage] = useState<"error" | "warning" | "info" | "success">("info");

//     const loadCanvasFromJSON = (json: string, fabricRef: React.RefObject<fabric.Canvas | null>) => {
//         if (!fabricRef.current) return;
//         fabricRef.current.setHeight(500); // גובה הקנבס
//         fabricRef.current.setWidth(500); // רוחב הקנבס
//         let parsedJSON;
//         try {
//             parsedJSON = JSON.parse(json);
//         } catch (e) {
//             console.log("שגיאה בטעינת הJSON", e);
//             return;
//         }
//         fabricRef.current.loadFromJSON(parsedJSON, () => {
//             parsedJSON.objects.forEach((obj: any) => {
//                 if (obj.type === "Textbox") {
//                     const { left, top, width, height, fontSize, fontWeight, fontFamily, fill, text, textAlign, angle } = obj;

//                     const textObject = new fabric.Textbox(text, {
//                         left,
//                         top,
//                         width,
//                         height,
//                         fontSize,
//                         fontWeight,
//                         fontFamily,
//                         fill,
//                         textAlign,
//                         angle,
//                         originX: 'left',
//                         originY: 'top',
//                     });
//                     if (fabricRef.current) {
//                         fabricRef.current.add(textObject);
//                     }
//                 }
//             });

//             fabricRef.current?.renderAll();
//         });
//     };

//     useEffect(() => {
//         const setupCanvas = async () => {
//             const element = canvasRef.current;
//             if (!element) return;

//             if (!fabricRef.current) {
//                 const canvas = new fabric.Canvas(element, { preserveObjectStacking: true });
//                 fabricRef.current = canvas;
//             }
//             // אם יש תבנית, נוודא שטוענים את הרקע והתבנית כראוי
//             if (cardData && cardData.templateID) {
//                 const { canvasStyle, templateID } = cardData;
//                 // אם התבנית לא טעונה, נבקש לטעון אותה
//                 if (!selectedTemplate || selectedTemplate.templateID !== templateID) {
//                     await dispatch(fetchTemplateById(templateID));
//                 }
//                 const imageURL = selectedTemplate.imageURL || DEFAULT_IMAGE;
//                 // אם יש סגנון קנבס, נטען אותו. אחרת נטען את התמונה מהתבנית או דיפולטיבית
//                 if (canvasStyle) {
//                     loadCanvasFromJSON(canvasStyle, fabricRef);
//                 } else {
//                     setCanvasBackground(imageURL, setLoading, fabricRef);
//                 }
//             }
//         };
//         setupCanvas();
//         return () => {
//             fabricRef.current?.dispose();
//             fabricRef.current = null;
//         };
//     }, [cardData, dispatch, selectedTemplate]);

//     const saveDesign = () => {
//         if (fabricRef.current) {
//             try {
//                 const json = JSON.stringify(fabricRef.current.toJSON());
//                 // try{
//                 // dispatch(fetchGreetingCardById(cardData.cardID));
//                 // }catch(e: any){
//                 //     if(e.status===404){
//                 //         console.log(e);
//                 //     }
//                 // }
//                 // if (selectedCard)
//                 if (cardData.cardID != -1) {
//                     dispatch(updateGreetingCard({
//                         id: cardData.cardID,
//                         updatedCard: {
//                             ...cardData,
//                             canvasStyle: json
//                         }
//                     }));
//                     setTitle("העיצוב התעדכן בהצלחה!");
//                     setTypeMessage("success");
//                     setIsAlertOpen(true);

//                     // Swal.fire({ icon: 'success', title: 'העיצוב עודכן בהצלחה!' });
//                 } else {
//                     dispatch(addGreetingCard({
//                         userID: currentUserId || 0,
//                         textID: cardData.textID,
//                         categoryID: cardData.categoryID,
//                         templateID: cardData.templateID,
//                         canvasStyle: json,
//                     }));
//                     setTitle("העיצוב נשמר בהצלחה!");
//                     setTypeMessage("success");
//                     setIsAlertOpen(true);
//                     // Swal.fire({ icon: 'success', title: 'העיצוב נשמר בהצלחה!' });
//                 }

//             } catch (error) {
//                 setTitle("שגיאה!");
//                 setMessage("שגיאה בשמירת העיצוב.  אנא נסה שוב מאוחר יותר.");
//                 setTypeMessage("error");
//                 setIsAlertOpen(true);
//                 // Swal.fire({
//                 //     icon: 'error',
//                 //     title: 'שגיאה',
//                 //     text: 'שגיאה בשמירת העיצוב. אנא נסה שוב מאוחר יותר.',
//                 // });
//             }
//         }
//     };

//     return (
//         <>
//             <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
//                 <canvas ref={canvasRef} style={{ cursor: 'default' }} />
//                 {fabricRef.current && !loading && <CanvasControls saveDesign={saveDesign} canvas={fabricRef.current} />}
//                 {loading && <LoadingIndicator content="טוען רקע..." />}
//             </div>
//             <MyAlert
//                 isOpen={isAlertOpen}
//                 title={title}
//                 type={typeMessage}
//                 message={message}
//                 onConfirm={
//                     () => {
//                         setIsAlertOpen(false)
//                     }}
//             />
//         </>
//     );
// };

// export default EditableCanvas;
