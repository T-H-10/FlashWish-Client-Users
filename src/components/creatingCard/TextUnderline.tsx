import { useState } from 'react';
import FormatUnderlinedRoundedIcon from '@mui/icons-material/FormatUnderlinedRounded';
import * as fabric from 'fabric';
import MyOptionToStyleButton from '../style/MyOptionToStyleButton';

interface CustomFabricText extends fabric.IText {
    textDecoration?: 'none' | 'underline'; // הוספת מאפיין לקו תחתי
}

const TextUnderline = ({ canvas }: { canvas: fabric.Canvas }) => {
    const [isUnderlined, setIsUnderlined] = useState<boolean>(false);

    const toggleUnderline = () => {
        const activeObject = canvas?.getActiveObject() as CustomFabricText;
        if (activeObject && activeObject.type === 'textbox') {
            activeObject.set('underline', !isUnderlined);
            setIsUnderlined(!isUnderlined);
            canvas?.renderAll();
        }
    };

    return (
        <>
            <MyOptionToStyleButton onClick={toggleUnderline}
                isActive={isUnderlined}
            >
                <FormatUnderlinedRoundedIcon />
            </MyOptionToStyleButton>
            {/* <button onClick={toggleUnderline}
                style={{
                    backgroundColor: isUnderlined ? '#ddd' : '#f0f0f0',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    alignItems: 'center',
                    padding: '5px'
                }}>
                <FormatUnderlinedRoundedIcon />
            </button> */}
        </>
    );
};

export default TextUnderline;
