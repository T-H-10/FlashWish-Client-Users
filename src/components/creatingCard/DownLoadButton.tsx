import saveAs from "file-saver";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import MyOptionToStyleButton from "../style/MyOptionToStyleButton";

const DownloadButton = ({ canvas }: { canvas: fabric.Canvas }) => {
    const downloadImage = () => {
        if (!canvas) return;
        const canvasElement = canvas.toCanvasElement();

        canvasElement.toBlob((blob) => {
            if (blob) {
                saveAs(blob, "greeting-card-flashwish.png");
            }
        }, "image/png");
    };

    return (
        <>
            <MyOptionToStyleButton onClick={downloadImage}
                isActive={true}>
                <DownloadRoundedIcon />
            </MyOptionToStyleButton>
            {/* <button
            onClick={downloadImage}
            style={{
                backgroundColor: '#f0f0f0',
                border: '1px solid #ccc',
                borderRadius: '5px',
                cursor: 'pointer',
                alignItems: 'center'
            }}
        >
            <DownloadRoundedIcon/>
        </button> */}
        </>
    );
};

export default DownloadButton;
