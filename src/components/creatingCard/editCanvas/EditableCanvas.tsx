import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CanvasControls from "./CanvasControls";
import Swal from "sweetalert2";
import { appDispatch } from "../../../Store/Store";
import { UserContext } from "../../../types/UserTypes";
import { selectTemplates } from "../../../Store/templatesStore/TemplatesSlice";
import * as fabric from "fabric";
import { fetchTemplateById } from "../../../Store/templatesStore/TemplatesApi";
import setCanvasBackground from "./setCanvasBackground";
import { addGreetingCard, updateGreetingCard } from "../../../Store/cardsStore/GreetingCardsApi";
import LoadingIndicator from "../../LoadingIndicator";
import { GreetingCard } from "../../../types/GreetingCardsTypes";

export const DEFAULT_IMAGE = "v1746302666/logo.jpg.jpg";

const EditableCanvas = ({ cardData }: { cardData: GreetingCard }) => {
    const dispatch = useDispatch<appDispatch>();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricRef = useRef<fabric.Canvas | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const currentUserId = useContext(UserContext).user.id;
    const { selectedTemplate } = useSelector(selectTemplates);

    const loadCanvasFromJSON = (json: string, fabricRef: React.RefObject<fabric.Canvas | null>) => {
        if (!fabricRef.current) return;
        fabricRef.current.setHeight(500); // גובה הקנבס
        fabricRef.current.setWidth(500); // רוחב הקנבס
        let parsedJSON;
        try {
            parsedJSON = JSON.parse(json);
        } catch (e) {
            console.log("שגיאה בטעינת הJSON", e);
            return;
        }
        fabricRef.current.loadFromJSON(parsedJSON, () => {
            parsedJSON.objects.forEach((obj: any) => {
                if (obj.type === "Textbox") {
                    const { left, top, width, height, fontSize, fontWeight, fontFamily, fill, text, textAlign, angle } = obj;

                    const textObject = new fabric.Textbox(text, {
                        left,
                        top,
                        width,
                        height,
                        fontSize,
                        fontWeight,
                        fontFamily,
                        fill,
                        textAlign,
                        angle,
                        originX: 'left',
                        originY: 'top',
                    });
                    if (fabricRef.current) {
                        fabricRef.current.add(textObject);
                    }
                }
            });

            fabricRef.current?.renderAll();
        });
    };

    useEffect(() => {
        const setupCanvas = async () => {
            const element = canvasRef.current;
            if (!element) return;

            if (!fabricRef.current) {
                const canvas = new fabric.Canvas(element, { preserveObjectStacking: true });
                fabricRef.current = canvas;
            }
            // אם יש תבנית, נוודא שטוענים את הרקע והתבנית כראוי
            if (cardData && cardData.templateID) {
                const { canvasStyle, templateID } = cardData;
                // אם התבנית לא טעונה, נבקש לטעון אותה
                if (!selectedTemplate || selectedTemplate.templateID !== templateID) {
                    // console.log("טעינה מחדש של התבנית...");
                    await dispatch(fetchTemplateById(templateID));
                }
                const imageURL = selectedTemplate.imageURL || DEFAULT_IMAGE;
                // אם יש סגנון קנבס, נטען אותו. אחרת נטען את התמונה מהתבנית או דיפולטיבית
                if (canvasStyle) {
                    loadCanvasFromJSON(canvasStyle, fabricRef);
                } else {
                    setCanvasBackground(imageURL, setLoading, fabricRef);
                }
            }
        };
        setupCanvas();
        return () => {
            fabricRef.current?.dispose();
            fabricRef.current = null;
        };
    }, [cardData, dispatch, selectedTemplate]);

    const saveDesign = () => {
        if (fabricRef.current) {
            try {
                const json = JSON.stringify(fabricRef.current.toJSON());
                // try{
                // dispatch(fetchGreetingCardById(cardData.cardID));
                // }catch(e: any){
                //     if(e.status===404){
                //         console.log(e);
                //     }
                // }
                // console.log(selectedCard);
                // if (selectedCard) 
                if (cardData.cardID != -1) {
                    dispatch(updateGreetingCard({
                        id: cardData.cardID,
                        updatedCard: {
                            ...cardData,
                            canvasStyle: json
                        }
                    }));
                    Swal.fire({ icon: 'success', title: 'העיצוב עודכן בהצלחה!' });
                } else {
                    dispatch(addGreetingCard({
                        userID: currentUserId,
                        textID: cardData.textID,
                        categoryID: cardData.categoryID,
                        templateID: cardData.templateID,
                        canvasStyle: json,
                    }));
                    Swal.fire({ icon: 'success', title: 'העיצוב נשמר בהצלחה!' });
                }

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'שגיאה',
                    text: 'שגיאה בשמירת העיצוב. אנא נסה שוב מאוחר יותר.',
                });
            }
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column-reverse' }}>
            <canvas ref={canvasRef} style={{ cursor: 'default' }} />
            {fabricRef.current && !loading && <CanvasControls saveDesign={saveDesign} canvas={fabricRef.current} />}
            {loading && <LoadingIndicator content="טוען רקע..." />}
        </div>
    );
};

export default EditableCanvas;
