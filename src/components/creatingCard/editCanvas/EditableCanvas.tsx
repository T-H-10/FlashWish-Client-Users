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