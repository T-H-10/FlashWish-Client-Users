import * as fabric from 'fabric';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';

const TextColor = ({ canvas }: { canvas: fabric.Canvas }) => {

    const changeTextColor = (color: string) => {
        const activeObject = canvas?.getActiveObject();
        if (activeObject && activeObject.type === 'textbox') {
            activeObject.set('fill', color);
            canvas?.renderAll();
        }
    };

    return (
        <>
 <span style={{ position: 'relative' }}>
            <span
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 13,
                    color: '#aaa',
                    backgroundColor: 'transparent',
                    pointerEvents: 'none',
                    opacity: 1,
                    transition: 'opacity 0.3s ease',
                }}
            >
                <FormatColorTextIcon/>
            </span>
            <input
                type="color"
                color='white'
                onChange={(e)=>changeTextColor(e.target.value)}
                style={{height:'40px', marginRight: '5px' }} 
            />
            </span>

        </>
    )
}
export default TextColor;