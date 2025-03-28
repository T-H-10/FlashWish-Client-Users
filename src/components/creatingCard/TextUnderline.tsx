import { useState } from 'react';
import FormatUnderlinedRoundedIcon from '@mui/icons-material/FormatUnderlinedRounded';
import * as fabric from 'fabric';

interface CustomFabricText extends fabric.IText {
    textDecoration?: 'none' | 'underline'; // הוספת מאפיין לקו תחתי
}

const TextUnderline = ({ canvas }: { canvas: fabric.Canvas }) => {
    const [isUnderlined, setIsUnderlined] = useState<boolean>(false);

    const toggleUnderline = () => {
        console.log(isUnderlined);
        const activeObject = canvas?.getActiveObject() as CustomFabricText;
        if (activeObject && activeObject.type === 'text') {
            const newTextDecoration = isUnderlined ? 'none' : 'underline';
            activeObject.set('textDecoration', newTextDecoration);
            setIsUnderlined(!isUnderlined);
            canvas?.renderAll();
        }
    };

    return (
        <>
            <button onClick={toggleUnderline}
                style={{
                    backgroundColor: '#f0f0f0',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    alignItems: 'center',
                }}>
                <FormatUnderlinedRoundedIcon />
            </button>
        </>
    );
};

export default TextUnderline;
