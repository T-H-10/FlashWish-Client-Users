import React, { useEffect, useState } from 'react';
import * as fabric from 'fabric';
import FormatColorFillRoundedIcon from '@mui/icons-material/FormatColorFillRounded';

const TextBackground = ({ canvas }: { canvas: fabric.Canvas }) => {
    const [color, setColor] = useState<string>('#ff0000'); 
    const [alpha, setAlpha] = useState<number>(1);

    useEffect(() => {
        updateBackgroundColor(color, alpha);
    }, [color, alpha]); 

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setColor(event.target.value);
    };

    const handleAlphaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedAlpha = Number(event.target.value);
        setAlpha(selectedAlpha);
    };

    const updateBackgroundColor = (color: string, alpha: number) => {
        const activeObject = canvas?.getActiveObject();
        if (activeObject && activeObject.type === 'text') {
            activeObject.set('backgroundColor', hexToRgba(color, alpha));
            canvas?.renderAll(); 
        }
    };

    const hexToRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    return (
        <>
        <span style={{ position: 'relative' }}>
            <span
                                    
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 13,
                    color: '#25173b',
                    backgroundColor: 'transparent',
                    pointerEvents: 'none',
                    opacity: 1,
                    transition: 'opacity 0.3s ease',
                }}
            >
                <FormatColorFillRoundedIcon/>
            </span>
            <input
                type="color"
                value={color}
                onChange={handleColorChange}
                style={{height:'40px', marginRight: '5px' }} 
            />
            </span>
             <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={alpha}
                onChange={handleAlphaChange}
            />
        </>
    );
};

export default TextBackground;
