import saveAs from "file-saver";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

const DownloadButton = ({ canvas }: { canvas: fabric.Canvas }) => {
    const downloadImage = () => {
        if (!canvas) return;
        const canvasElement = canvas.toCanvasElement();

        canvasElement.toBlob((blob) => {
            if (blob) {
                saveAs(blob, "greeting-card.png");
            }
        }, "image/png");
    };

    return (
        <>
        <button
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
        </button>
        </>
    );
};

export default DownloadButton;
