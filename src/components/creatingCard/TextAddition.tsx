import * as fabric from "fabric";
import { useContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CurrentCardContext } from "../../Store/cardReducer/CardReducer";
import { selectGreetingMessages } from "../../Store/messagesStore/GreetingMessagesSlice";
import { fetchGreetingMessages } from "../../Store/messagesStore/GreetingsMessagesApi";
import { appDispatch } from "../../Store/Store";
import { initialMessage } from "../../types/GreetingMessageType";
import MyModal from "../style/MyModal";
import TextEditor from "./TextEditor";
import '../cssPages/creatingCard/TextAddition.css';

const DEFAULT_TITLE = 'כותרת ברירת מחדל';
const DEFAULT_CONTENT = 'תוכן ברירת מחדל';
const DEFAULT_SIGNATURE = 'חתימה ברירת מחדל';

const TEXT_FIELDS = [
  { key: 'title', label: 'כותרת', defaultText: DEFAULT_TITLE, fontSize: 40, top: 50 },
  { key: 'content', label: 'תוכן', defaultText: DEFAULT_CONTENT, fontSize: 30, top: 150 },
  { key: 'signature', label: 'חתימה', defaultText: DEFAULT_SIGNATURE, fontSize: 25, top: 400 },
] as const;

type TextFieldKey = typeof TEXT_FIELDS[number]['key'];

const TextAddition = ({ canvas, loadedFromJSON }: { canvas: fabric.Canvas, loadedFromJSON: boolean }) => {
  const { currentCard } = useContext(CurrentCardContext);
  const { greetingMessagesList, loading } = useSelector(selectGreetingMessages);
  const dispatch = useDispatch<appDispatch>();

  useEffect(() => {
    if (!loading) return;
    dispatch(fetchGreetingMessages());
  }, [dispatch, loading]);

  const currentMessage = !loading
    ? greetingMessagesList.find((m) => m.textID === currentCard.textID) || initialMessage
    : initialMessage;

  const [textState, setTextState] = useState(() => ({
    title: currentMessage.title || DEFAULT_TITLE,
    content: currentMessage.content || DEFAULT_CONTENT,
    signature: currentMessage.signature || DEFAULT_SIGNATURE
  }));

  const [editingField, setEditingField] = useState<TextFieldKey | null>(null);

  const updateText = (key: TextFieldKey, value: string) => {
    setTextState(prev => ({ ...prev, [key]: value }));
    setEditingField(null);
  };

  const addTextToCanvas = (key: TextFieldKey, text: string, top: number, fontSize: number) => {
    const textbox = new fabric.Textbox(text, {
      left: 50,
      top,
      width: (canvas.width ?? 800) - 200,
      fontSize,
      fill: 'black',
      selectable: true,
      fontWeight: key === 'title' ? 'bold' : 'normal',
      direction: 'rtl',
      textAlign: 'right',
    });
    (textbox as any).set('customType', key);
    canvas.add(textbox);
    canvas.renderAll();
  };

  // הוספת טקסטים רק אם אין קיימים
  useEffect(() => {
    if (loadedFromJSON) return;

    const hasAnyText = canvas.getObjects('textbox').some(obj => {
      const type = (obj as any).get('customType');
      return ['title', 'content', 'signature'].includes(type);
    });

    if (!hasAnyText) {
      TEXT_FIELDS.forEach(({ key, fontSize, top }) => {
        addTextToCanvas(key, textState[key], top, fontSize);
      });
    }
  }, [canvas, loadedFromJSON]);

  // עדכון טקסט קיים בקנבס אם הטקסט ב-state משתנה
  useEffect(() => {
    TEXT_FIELDS.forEach(({ key }) => {
      const obj = canvas.getObjects('textbox').find(o => (o as any).get('customType') === key) as fabric.Textbox;
      if (obj) {
        obj.set({ text: textState[key], width: canvas.getWidth() - 200 });
        canvas.renderAll();
      }
    });
  }, [textState, canvas]);

  return (
    <div className="cosmic-text-addition">
      <div className="cosmic-text-addition-background">
        <div className="cosmic-nebula" />
        <div className="cosmic-stars">
          {Array.from({ length: 15 }).map((_, index) => (
            <div key={index} className="cosmic-star" style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 3}s`
            }} />
          ))}
        </div>
      </div>

      <div className="cosmic-text-controls">
        {TEXT_FIELDS.map(({ key, label }) => (
          <button key={key} className={`cosmic-text-button cosmic-${key}-button`}
            onClick={() => setEditingField(key)}>
            <span className="cosmic-button-text">{`ערוך ${label}`}</span>
            <div className="cosmic-button-glow"></div>
          </button>
        ))}
      </div>

      <MyModal isOpen={editingField !== null} title={`ערוך ${TEXT_FIELDS.find(f => f.key === editingField)?.label || ''}`} onClose={() => setEditingField(null)}>
        {editingField && (
          <TextEditor
            currentText={textState[editingField]}
            onSave={(newText) => updateText(editingField, newText)}
          />
        )}
      </MyModal>
    </div>
  );
};

export default TextAddition;


// import { useState, useEffect, useContext } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { CurrentCardContext } from '../../Store/cardReducer/CardReducer';
// import { appDispatch } from '../../Store/Store';
// import * as fabric from "fabric"
// import { selectGreetingMessages } from '../../Store/messagesStore/GreetingMessagesSlice';
// import { GreetingMessage } from '../../types/GreetingMessageType';
// import TextEditor from './TextEditor';
// import { fetchGreetingMessages } from '../../Store/messagesStore/GreetingsMessagesApi';
// import MyModal from '../style/MyModal';
// import '../cssPages/creatingCard/TextAddition.css';

// const DEFAULT_TITLE = 'כותרת ברירת מחדל';
// const DEFAULT_CONTENT = 'תוכן ברירת מחדל';
// const DEFAULT_SIGNATURE = 'חתימה ברירת מחדל';

// const initialMessage = {
//   title: DEFAULT_TITLE,
//   content: DEFAULT_CONTENT,
//   signature: DEFAULT_SIGNATURE
// };

// const TextAddition = ({ canvas, loadedFromJSON }: { canvas: fabric.Canvas, loadedFromJSON: boolean }) => {
//     const { currentCard } = useContext(CurrentCardContext);
//     const { greetingMessagesList, loading } = useSelector(selectGreetingMessages);
//     const dispatch = useDispatch<appDispatch>();
    
//     useEffect(() => {
//         if (!loading) return;
//         dispatch(fetchGreetingMessages());
//     }, [dispatch, loading]);

//     let currentMessage = initialMessage;
//     if (!loading) {
//         currentMessage = greetingMessagesList.find((message: GreetingMessage) => message.textID === currentCard.textID) || initialMessage;
//     }
    
//     const [title, setTitle] = useState<string>(currentMessage?.title || DEFAULT_TITLE);
//     const [content, setContent] = useState<string>(currentMessage?.content || DEFAULT_CONTENT);
//     const [signature, setSignature] = useState<string>(currentMessage?.signature || DEFAULT_SIGNATURE);
//     const [isEditing, setIsEditing] = useState<{ field: 'title' | 'content' | 'signature' | null }>({ field: null });
//     const [modalTitle, setModalTitle] = useState<string>('');
    
//     useEffect(() => {
//       const hasTextType = (type: string) =>
//         canvas.getObjects('textbox').some((obj) => (obj as any).get('customType') === type);

//       const alreadyHasText = ['title', 'content', 'signature'].some(hasTextType);
//       if(!loadedFromJSON && !alreadyHasText){;
//         // if (!hasTextType('title')) {
//             addTextToCanvas(title, 50, 50, 'title');
//         // }
//         // if (!hasTextType('content')) {
//             addTextToCanvas(content, 100, 150, 'content');
//         // }
//         // if (!hasTextType('signature')) {
//             addTextToCanvas(signature, 10, 400, 'signature');
//         // }
//       }
//     }, [canvas, loadedFromJSON]);

//     useEffect(() => updateCanvasText('title', title), [title, canvas]);
//     useEffect(() => updateCanvasText('content', content), [content, canvas]);
//     useEffect(() => updateCanvasText('signature', signature), [signature, canvas]);

//     const updateText = (newText: string) => {
//         if (isEditing.field === 'title') setTitle(newText);
//         if (isEditing.field === 'content') setContent(newText);
//         if (isEditing.field === 'signature') setSignature(newText);
//         setIsEditing({ field: null });
//     };

//     const addTextToCanvas = (text: string, left: number, top: number, type: 'title' | 'content' | 'signature') => {
//         const textObject = new fabric.Textbox(text, {
//             left,
//             top,
//             width: (canvas.width ?? 800) - 200,
//             fontSize: type === 'title' ? 40 : type === 'content' ? 30 : 25,
//             fill: 'black',
//             selectable: true,
//             fontWeight: type === 'title' ? 'bold' : 'normal',
//             direction: 'rtl',
//             textAlign: 'right',
//         });
//         (textObject as any).set('customType', type);
//         canvas.add(textObject);
//         canvas.renderAll();
//     };

//     const updateCanvasText = (type: 'title' | 'content' | 'signature', newText: string) => {
//         const textObjects = canvas.getObjects('textbox') as fabric.Textbox[];
//         const textObj = textObjects.find(obj => (obj as any).get('customType') === type);
//         if (textObj) {
//             textObj.set({ text: newText, width: canvas.getWidth()-200 });
//             canvas.renderAll();
//         }
//     };

//     return (
//         <div className="cosmic-text-addition">
//             <div className="cosmic-text-addition-background">
//                 <div className="cosmic-nebula"></div>
//                 <div className="cosmic-stars">
//                     {Array.from({ length: 15 }).map((_, index) => (
//                         <div 
//                             key={index}
//                             className="cosmic-star"
//                             style={{
//                                 top: `${Math.random() * 100}%`,
//                                 left: `${Math.random() * 100}%`,
//                                 width: `${Math.random() * 2 + 1}px`,
//                                 height: `${Math.random() * 2 + 1}px`,
//                                 animationDelay: `${Math.random() * 3}s`
//                             }}
//                         />
//                     ))}
//                 </div>
//             </div>
            
//             <div className="cosmic-text-controls">
//                 <button 
//                     className="cosmic-text-button cosmic-title-button"
//                     onClick={() => { setIsEditing({ field: 'title' }); setModalTitle('ערוך כותרת') }}
//                 >
//                     <span className="cosmic-button-text">ערוך כותרת</span>
//                     <div className="cosmic-button-glow"></div>
//                 </button>
                
//                 <button 
//                     className="cosmic-text-button cosmic-content-button"
//                     onClick={() => { setIsEditing({ field: 'content' }); setModalTitle('ערוך תוכן') }}
//                 >
//                     <span className="cosmic-button-text">ערוך תוכן</span>
//                     <div className="cosmic-button-glow"></div>
//                 </button>
                
//                 <button 
//                     className="cosmic-text-button cosmic-signature-button"
//                     onClick={() => { setIsEditing({ field: 'signature' }); setModalTitle('ערוך חתימה') }}
//                 >
//                     <span className="cosmic-button-text">ערוך חתימה</span>
//                     <div className="cosmic-button-glow"></div>
//                 </button>
//             </div>

//             <MyModal isOpen={isEditing.field !== null} title={modalTitle} onClose={() => setIsEditing({ field: null })}>
//                 {isEditing.field && (
//                     <TextEditor 
//                         currentText={
//                             isEditing.field === 'title' ? title :
//                             isEditing.field === 'content' ? content :
//                             signature
//                         } 
//                         onSave={updateText} 
//                     />
//                 )}
//             </MyModal>
//         </div>
//     );
// };

// export default TextAddition;