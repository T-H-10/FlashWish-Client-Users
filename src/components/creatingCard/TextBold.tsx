import * as fabric from 'fabric';
import { useState } from 'react';
import FormatBoldRoundedIcon from '@mui/icons-material/FormatBoldRounded';
import MyOptionToStyleButton from '../style/MyOptionToStyleButton';
const TextBold = ({ canvas }: { canvas: fabric.Canvas }) => {
    const [isBold, setIsBold] = useState<boolean>(false);

    const toggleBold = () => {
        const activeObject = canvas?.getActiveObject();
        if (activeObject && activeObject.type === 'textbox') {
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
    );
};

export default TextBold;
