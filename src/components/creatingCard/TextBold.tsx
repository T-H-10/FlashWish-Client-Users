import * as fabric from 'fabric';
import { useState } from 'react';
import FormatBoldRoundedIcon from '@mui/icons-material/FormatBoldRounded';
import MyOptionToStyleButton from '../style/MyOptionToStyleButton';
const TextBold = ({ canvas }: { canvas: fabric.Canvas }) => {
    const [isBold, setIsBold] = useState<boolean>(false); // מצב מודגש

    const toggleBold = () => {
        const activeObject = canvas?.getActiveObject();
        if (activeObject && activeObject.type === 'text') {
            const newFontWeight = isBold ? 'normal' : 'bold';
            activeObject.set('fontWeight', newFontWeight);
            setIsBold(!isBold);
            canvas?.renderAll();
        }
    };

    return (
        <>
        <MyOptionToStyleButton onClick={toggleBold}
            isActive={isBold}
            >
                <FormatBoldRoundedIcon/>
            </MyOptionToStyleButton>
        </>
        // <button
        //     onClick={toggleBold}
        //     style={{
        //         // margin: '5px',
        //         // padding: '10px',
        //         backgroundColor: '#f0f0f0',
        //         border: '1px solid #ccc',
        //         borderRadius: '5px',
        //         cursor: 'pointer',
        //         // display: 'flex',
        //         alignItems: 'center'
        //     }}
        // >
        //     <FormatBoldRoundedIcon/>
        // </button>
    );
};

export default TextBold;
