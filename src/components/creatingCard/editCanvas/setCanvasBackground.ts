import * as fabric from "fabric";
import { CLOUD_URL_START } from "../../templates/TemplateItem";

const setCanvasBackground = async (url: string, setLoading: React.Dispatch<React.SetStateAction<boolean>>, fabricRef: React.RefObject<fabric.Canvas | null>) => {
    if(!url.includes("http")) {
        url=CLOUD_URL_START+url;
    }
    if (!fabricRef.current) return;
    setLoading(true);
    try {
        const loadedImage = await new Promise<HTMLImageElement>((resolve, reject) => {
            const testImg = new Image();
            testImg.crossOrigin = "anonymous";
            testImg.onload = () => resolve(testImg);
            testImg.onerror = () => reject(new Error("Image failed to load"));
            testImg.src = url;
        });
        const img = new fabric.Image(loadedImage);
        img.scaleToWidth(500);
        const canvas = fabricRef.current;
        canvas.setWidth(img.width || 500);
        canvas.setHeight(img.height || 500);
        canvas.backgroundImage = img;
        canvas.renderAll();
    } catch (err) {
        console.error("Error setting background:", err);
    } finally {
        setLoading(false);
    }
};

export default setCanvasBackground;
