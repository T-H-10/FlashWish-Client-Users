import * as fabric from "fabric";
import { useContext, useEffect, useRef, useState } from "react";
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
import { addGreetingCard } from "../../Store/cardsStore/GreetingCardsApi";
import { UserContext } from "../../types/UserTypes";
import { CLOUDE_URL_START } from "../templates/TemplateItem";
import Swal from "sweetalert2";
import { CurrentCardContext } from "../../Store/cardReducer/CardReducer";

// נתיב לרקע דיפולטיבי
const DEFAULT_IMAGE = "v1746302666/logo.jpg.jpg";

const EditableCanvas = ({ imageUrl }: { imageUrl: string }) => {
    const dispatch = useDispatch<appDispatch>();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fabricRef = useRef<fabric.Canvas | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { currentCard } = useContext(CurrentCardContext);
    const currentUserId = useContext(UserContext).user.id;
    // const { selectedCategoryId }: { selectedCategoryId: number } = useOutletContext();
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
            canvas.backgroundImage = img;
            canvas.renderAll.bind(canvas);
        } catch (err) {
            console.error("Error setting background:", err);
            // alert("הרקע נכשל בטעינה – ייתכן שיש בעיית קישור או תמונה לא זמינה");
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

        if(currentCard && currentCard.canvasStyle) {
            const {canvasStyle} = currentCard;
            fabricRef.current.loadFromJSON(canvasStyle, canvas.renderAll.bind(canvas));
        }
        else{
        // טען רקע דיפולטיבי כשנוצר הקנבס
        setCanvasBackground(DEFAULT_IMAGE);
        }
        return () => {
            canvas.dispose();
            fabricRef.current = null;
        };
    }, [currentCard]);

    // בכל פעם ש-imageUrl משתנה, נעדכן רקע
    useEffect(() => {
        if (fabricRef.current && imageUrl) {
            if (imageUrl.includes("http")) {
                setCanvasBackground(imageUrl);
            } else {
                setCanvasBackground(CLOUDE_URL_START + imageUrl);
            }
        }
    }, [imageUrl]);

    const saveDesign = () => {
        if (fabricRef.current) {
            const json = JSON.stringify(fabricRef.current.toJSON());
            console.log("Design saved:", json);
            console.log(currentUserId);
            
            try {
                const response = dispatch(addGreetingCard(
                    {
                        userID: currentUserId,
                        textID: currentCard.textID,
                        categoryID: currentCard.categoryID,
                        templateID: currentCard.templateID,
                        canvasStyle: json,
                    }));
                    Swal.fire({
                        icon: 'success',
                        title: 'העיצוב נשמר בהצלחה!',
                    });
                console.log(response);

            }
            catch (error) {
                console.error("Error saving design:", error);
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

            {fabricRef.current && !loading && (
                <div>
                    <TextAddition canvas={fabricRef.current} />
                    <TextBold canvas={fabricRef.current} />
                    <TextSize canvas={fabricRef.current} />
                    <TextItalic canvas={fabricRef.current} />
                    <TextUnderline canvas={fabricRef.current} />
                    <TextColor canvas={fabricRef.current} />
                    <TextBackground canvas={fabricRef.current} />
                    <DownloadButton canvas={fabricRef.current} />
            {sessionStorage.getItem('userId') && 
                    <button onClick={saveDesign}>שמור עיצוב</button>
            }
                </div>
            )}

            {loading && <LoadingIndicator content="טוען רקע..." />}
        </div>
    );
};

export default EditableCanvas;
