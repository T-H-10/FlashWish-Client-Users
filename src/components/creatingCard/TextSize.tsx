import { TextField } from '@mui/material';
import * as fabric from 'fabric';
import { useState } from 'react';
import MyOptionToStyleButton from '../style/MyOptionToStyleButton';
import TextDecreaseRoundedIcon from '@mui/icons-material/TextDecreaseRounded';
import TextIncreaseRoundedIcon from '@mui/icons-material/TextIncreaseRounded';

const TextSize = ({ canvas }: { canvas: fabric.Canvas }) => {
    const [fontSize, setFontSize] = useState<number>(30);
    const FONT_SIZE_CHANGE = 3;

    const changeTextSize = (size: number) => {
        const activeObject = canvas?.getActiveObject();
        if (activeObject && activeObject.type === 'textbox') {
            activeObject.set('fontSize', size);
            canvas?.renderAll();
        }
    };
    const increaseFontSize = () => {
        const newSize = fontSize + FONT_SIZE_CHANGE; 
        setFontSize(newSize);
        changeTextSize(newSize);
    };

    const decreaseFontSize = () => {
        const newSize = fontSize > FONT_SIZE_CHANGE ? fontSize - FONT_SIZE_CHANGE : 1; 
        setFontSize(newSize);
        changeTextSize(newSize);
    };

    const handleFontSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newSize = parseInt(event.target.value, 10);
        if (!isNaN(newSize) && newSize > 0) {
            setFontSize(newSize);
            changeTextSize(newSize);
        }
    };
    return (
        <>
        <MyOptionToStyleButton onClick={increaseFontSize}
            isActive={false}>
            <TextIncreaseRoundedIcon/>
        </MyOptionToStyleButton>
        <MyOptionToStyleButton onClick={decreaseFontSize}
            isActive={false}>
                <TextDecreaseRoundedIcon/>
            </MyOptionToStyleButton>
        {/* <button
                    onClick={() => increaseFontSize()}
                    style={{
                        margin: '5px',
                        padding: '10px',
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    A
                </button> */}
                {/* <button
                    onClick={() => decreaseFontSize()}
                    style={{
                        margin: '5px',
                        padding: '10px',
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    a
                </button> */}
            <TextField
                type="number"
                value={fontSize}
                onChange={handleFontSizeChange}
                inputProps={{ min: 1 }}
                style={{ width: '60px', marginTop: '7px' }}
                variant="outlined"
                size="small"
            />
        </>
    )
};
export default TextSize;
