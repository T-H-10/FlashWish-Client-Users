import * as fabric from 'fabric';

const TextColor = ({ canvas }: { canvas: fabric.Canvas }) => {

    const changeTextColor = (color: string) => {
        const activeObject = canvas?.getActiveObject();
        if (activeObject && activeObject.type === 'text') {
            activeObject.set('fill', color);
            canvas?.renderAll();
        }
    };

    return (
        <>
        <input type='color' onChange={(e)=>changeTextColor(e.target.value)}></input>
        </>
    )
}
export default TextColor;