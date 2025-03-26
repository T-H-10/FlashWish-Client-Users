import * as fabric from 'fabric';
import { useEffect, useState } from 'react';
import TextEditor from './TextEditor';
import MyModal from '../style/MyModal';
import { GreetingMessage } from '../../types/GreetingMessageType';

const DEFAULT_TITLE = 'כותרת ברירת מחדל';
const DEFAULT_CONTENT = 'תוכן ברירת מחדל';
const DEFAULT_SIGNATURE = 'חתימה ברירת מחדל';

const TextAddition = ({ canvas }: { canvas: fabric.Canvas }) => {
    // הודעת ברכה לדוגמה
    const messageCard: GreetingMessage | null = {
        textID: 4,
        categoryID: 1012,
        title: "כותרת דוגמא",
        content: "תוכן דוגמא",
        signature: "חתימה דוגמא",
        userID: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const [title, setTitle] = useState<string>(messageCard?.title || DEFAULT_TITLE);
    const [content, setContent] = useState<string>(messageCard?.content || DEFAULT_CONTENT);
    const [signature, setSignature] = useState<string>(messageCard?.signature || DEFAULT_SIGNATURE);
    const [isEditing, setIsEditing] = useState<{ field: 'title' | 'content' | 'signature' | null }>({ field: null });
    const [modalTitle, setModalTitile] = useState<string>('');
    useEffect(() => {
        const textObjects = canvas.getObjects('text') as fabric.Text[];
    
    if (textObjects.length === 0) {
        addTextToCanvas(title, 100, 50, 'title');
        addTextToCanvas(content, 100, 150, 'content');
        addTextToCanvas(signature, 100, 250, 'signature');
    }
    }, [canvas]);

    useEffect(() => updateCanvasText('title', title), [title, canvas]);
    useEffect(() => updateCanvasText('content', content), [content, canvas]);
    useEffect(() => updateCanvasText('signature', signature), [signature, canvas]);

    const updateText = (newText: string) => {
        if (isEditing.field === 'title') setTitle(newText);
        if (isEditing.field === 'content') setContent(newText);
        if (isEditing.field === 'signature') setSignature(newText);
        setIsEditing({ field: null });
    };

    const addTextToCanvas = (text: string, left: number, top: number, type: 'title' | 'content' | 'signature') => {
        const textObject = new fabric.Text(text, {
            left,
            top,
            fontSize: type === 'title' ? 40 : type === 'content' ? 30 : 25,
            fill: 'black',
            selectable: true,
            fontWeight: type === 'title' ? 'bold' : 'normal',
        });
        textObject.set('customType', type); // שומר סוג האובייקט
        canvas.add(textObject);
        canvas.renderAll();
    };

    const updateCanvasText = (type: 'title' | 'content' | 'signature', newText: string) => {
        const textObjects = canvas.getObjects('text') as fabric.Text[];
        const textObj = textObjects.find(obj => obj.get('customType') === type);
        if (textObj) {
            textObj.set({ text: newText });
            canvas.renderAll();
        }
    };

    return (
        <>
            <button onClick={() => {setIsEditing({ field: 'title' }); setModalTitile('ערוך כותרת')}}>ערוך כותרת</button>
            <button onClick={() => {setIsEditing({ field: 'content' }); setModalTitile('ערוך תוכן')}}>ערוך תוכן</button>
            <button onClick={() => {setIsEditing({ field: 'signature' }); setModalTitile('ערוך חתימה')}}>ערוך חתימה</button>

            <MyModal isOpen={isEditing.field !== null} title={modalTitle} onClose={() => setIsEditing({ field: null })}>
            {isEditing.field && (
                <TextEditor currentText={
                    isEditing.field === 'title' ? title :
                    isEditing.field === 'content' ? content :
                    signature
                } onSave={updateText} />
            )}
            </MyModal>
        </>
    );
};

export default TextAddition;