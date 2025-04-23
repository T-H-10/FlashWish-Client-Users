import { useState } from 'react';
import FormatItalicRoundedIcon from '@mui/icons-material/FormatItalicRounded';
import MyOptionToStyleButton from '../style/MyOptionToStyleButton';
import * as fabric from 'fabric';
// interface CustomFabricText extends fabric.IText {
//     fontStyle?: "italic" | "normal"; // הוספת המאפיין המותאם אישית
// }

const TextItalic = ({ canvas }: { canvas: fabric.Canvas }) => {
    const [isItalic, setIsItalic] = useState<boolean>(false);

    const toggleItalic = () => {
        const activeObject = canvas?.getActiveObject() as fabric.IText | null;
        if (activeObject && activeObject.type === 'textbox') {
            const newFontStyle = isItalic ? 'italic' : 'normal';
            activeObject.set('fontStyle', newFontStyle);
            setIsItalic(!isItalic);
            canvas?.renderAll();
        }
    };

    return (
        <>
        <MyOptionToStyleButton onClick={toggleItalic} 
            isActive={!isItalic}>
            <FormatItalicRoundedIcon />
        </MyOptionToStyleButton>
        </>
    );
};

export default TextItalic;