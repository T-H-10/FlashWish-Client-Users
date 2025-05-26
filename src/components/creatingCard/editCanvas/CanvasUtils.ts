import * as fabric from "fabric";
import setCanvasBackground from "./setCanvasBackground";

const loadCanvasFromJSONKeepBackgroundFromTemplate = async (
    json: string,
    fabricRef: React.RefObject<fabric.Canvas | null>,
    backgroundImageURL: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    if(!fabricRef.current) return;
    setLoading(true);

    fabricRef.current.clear();

    let parsedJSON;
    try {
        parsedJSON = JSON.parse(json);
    } catch (e) {
        console.log("שגיאה בטעינת הJSON", e);
        setLoading(false);
        return;
    }

    const objectsToLoad = parsedJSON.objects.filter((obj: any) =>
         obj.type !== "image" && obj.type !== "background");

    fabricRef.current.loadFromJSON({...parsedJSON, objects: objectsToLoad }, 
        () => {
            fabricRef.current?.renderAll();
            setCanvasBackground(backgroundImageURL, setLoading, fabricRef);
        }
        )



};
export default loadCanvasFromJSONKeepBackgroundFromTemplate;