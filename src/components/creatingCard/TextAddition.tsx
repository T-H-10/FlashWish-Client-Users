"use client"

import type React from "react"

import { useContext, useEffect, useState } from "react"
import * as fabric from "fabric"
import { useDispatch, useSelector } from "react-redux"
import type { appDispatch } from "../../Store/Store"
import { CurrentCardContext } from "../../Store/cardReducer/CardReducer"
import { selectGreetingMessages } from "../../Store/messagesStore/GreetingMessagesSlice"
import { fetchGreetingMessages } from "../../Store/messagesStore/GreetingsMessagesApi"
import { type GreetingMessage, initialMessage } from "../../types/GreetingMessageType"
import TextEditor from "./TextEditor"
import { COSMIC_COLORS } from "../../utils/Comsic-theme"
import CosmicModal from "../style/CosmicModal"

const DEFAULT_TITLE = "כותרת ברירת מחדל"
const DEFAULT_CONTENT = "תוכן ברירת מחדל"
const DEFAULT_SIGNATURE = "חתימה ברירת מחדל"

interface TextAdditionProps {
  canvas: fabric.Canvas
}

const TextAddition: React.FC<TextAdditionProps> = ({ canvas }) => {
  const { currentCard } = useContext(CurrentCardContext)
  const { greetingMessagesList, loading } = useSelector(selectGreetingMessages)
  const dispatch = useDispatch<appDispatch>()

  const [title, setTitle] = useState<string>(DEFAULT_TITLE)
  const [content, setContent] = useState<string>(DEFAULT_CONTENT)
  const [signature, setSignature] = useState<string>(DEFAULT_SIGNATURE)
  const [isEditing, setIsEditing] = useState<{ field: "title" | "content" | "signature" | null }>({ field: null })
  const [modalTitle, setModalTitle] = useState<string>("")

  useEffect(() => {
    if (loading) {
      dispatch(fetchGreetingMessages())
    }
  }, [dispatch, loading])

  useEffect(() => {
    if (!loading && greetingMessagesList.length > 0) {
      const currentMessage =
        greetingMessagesList.find((message: GreetingMessage) => message.textID === currentCard.textID) || initialMessage

      setTitle(currentMessage?.title || DEFAULT_TITLE)
      setContent(currentMessage?.content || DEFAULT_CONTENT)
      setSignature(currentMessage?.signature || DEFAULT_SIGNATURE)
    }
  }, [loading, greetingMessagesList, currentCard.textID])

  useEffect(() => {
    const hasTextType = (type: string) => canvas.getObjects("textbox").some((obj) => obj.get("customType") === type)

    if (!hasTextType("title")) {
      addTextToCanvas(title, 100, 50, "title")
    }
    if (!hasTextType("content")) {
      addTextToCanvas(content, 100, 150, "content")
    }
    if (!hasTextType("signature")) {
      addTextToCanvas(signature, 100, 250, "signature")
    }
  }, [canvas, title, content, signature])

  useEffect(() => updateCanvasText("title", title), [title, canvas])
  useEffect(() => updateCanvasText("content", content), [content, canvas])
  useEffect(() => updateCanvasText("signature", signature), [signature, canvas])

  const updateText = (newText: string) => {
    if (isEditing.field === "title") setTitle(newText)
    if (isEditing.field === "content") setContent(newText)
    if (isEditing.field === "signature") setSignature(newText)
    setIsEditing({ field: null })
  }

  const addTextToCanvas = (text: string, left: number, top: number, type: "title" | "content" | "signature") => {
    const textObject = new fabric.Textbox(text, {
      left,
      top,
      width: canvas.width ? canvas.width - 200 : 300,
      fontSize: type === "title" ? 40 : type === "content" ? 30 : 25,
      fill: "white",
      selectable: true,
      fontWeight: type === "title" ? "bold" : "normal",
      direction: "rtl",
      textAlign: "right",
    })
    textObject.set("customType", type)
    canvas.add(textObject)
    canvas.renderAll()
  }

  const updateCanvasText = (type: "title" | "content" | "signature", newText: string) => {
    const textObjects = canvas.getObjects("textbox") as fabric.Textbox[]
    const textObj = textObjects.find((obj) => obj.get("customType") === type)
    if (textObj) {
      textObj.set({ text: newText })
      canvas.renderAll()
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4 justify-center">
        <button
          onClick={() => {
            setIsEditing({ field: "title" })
            setModalTitle("ערוך כותרת")
          }}
          className={`
            px-4 py-2 rounded-lg
            bg-gradient-to-r from-[${COSMIC_COLORS.cosmicPurple}] to-[${COSMIC_COLORS.cosmicPink}]
            text-[${COSMIC_COLORS.textLight}]
            hover:shadow-lg hover:shadow-[${COSMIC_COLORS.glowColor}]
            transition-all duration-300
          `}
        >
          ערוך כותרת
        </button>

        <button
          onClick={() => {
            setIsEditing({ field: "content" })
            setModalTitle("ערוך תוכן")
          }}
          className={`
            px-4 py-2 rounded-lg
            bg-gradient-to-r from-[${COSMIC_COLORS.cosmicPurple}] to-[${COSMIC_COLORS.cosmicPink}]
            text-[${COSMIC_COLORS.textLight}]
            hover:shadow-lg hover:shadow-[${COSMIC_COLORS.glowColor}]
            transition-all duration-300
          `}
        >
          ערוך תוכן
        </button>

        <button
          onClick={() => {
            setIsEditing({ field: "signature" })
            setModalTitle("ערוך חתימה")
          }}
          className={`
            px-4 py-2 rounded-lg
            bg-gradient-to-r from-[${COSMIC_COLORS.cosmicPurple}] to-[${COSMIC_COLORS.cosmicPink}]
            text-[${COSMIC_COLORS.textLight}]
            hover:shadow-lg hover:shadow-[${COSMIC_COLORS.glowColor}]
            transition-all duration-300
          `}
        >
          ערוך חתימה
        </button>
      </div>

      <CosmicModal isOpen={isEditing.field !== null} title={modalTitle} onClose={() => setIsEditing({ field: null })}>
        {isEditing.field && (
          <TextEditor
            currentText={isEditing.field === "title" ? title : isEditing.field === "content" ? content : signature}
            onSave={updateText}
            onCancel={() => setIsEditing({ field: null })}
          />
        )}
      </CosmicModal>
    </>
  )
}

export default TextAddition


// import * as fabric from 'fabric';
// import { useContext, useEffect, useState } from 'react';
// import TextEditor from './TextEditor';
// import MyModal from '../style/MyModal';
// import { GreetingMessage, initialMessage } from '../../types/GreetingMessageType';
// import { CurrentCardContext } from '../../Store/cardReducer/CardReducer';
// import { appDispatch } from '../../Store/Store';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectGreetingMessages } from '../../Store/messagesStore/GreetingMessagesSlice';
// import { fetchGreetingMessages } from '../../Store/messagesStore/GreetingsMessagesApi';

// const DEFAULT_TITLE = 'כותרת ברירת מחדל';
// const DEFAULT_CONTENT = 'תוכן ברירת מחדל';
// const DEFAULT_SIGNATURE = 'חתימה ברירת מחדל';

// const TextAddition = ({ canvas }: { canvas: fabric.Canvas }) => {
//     const { currentCard } = useContext(CurrentCardContext);
//     const { greetingMessagesList, loading } = useSelector(selectGreetingMessages);
//     const dispatch = useDispatch<appDispatch>();
//     useEffect(() => {
//         if (!loading) return;
//         dispatch(fetchGreetingMessages());
//     }, [dispatch, loading]);

//     let currentMessage: GreetingMessage = initialMessage;
//     if (!loading) {
//         currentMessage = greetingMessagesList.find((message: GreetingMessage) => message.textID === currentCard.textID) || initialMessage;
//     }
//     const [title, setTitle] = useState<string>(currentMessage?.title || DEFAULT_TITLE);
//     const [content, setContent] = useState<string>(currentMessage?.content || DEFAULT_CONTENT);
//     const [signature, setSignature] = useState<string>(currentMessage?.signature || DEFAULT_SIGNATURE);
//     const [isEditing, setIsEditing] = useState<{ field: 'title' | 'content' | 'signature' | null }>({ field: null });
//     const [modalTitle, setModalTitile] = useState<string>('');
//     useEffect(() => {
//         const hasTextType = (type: string) =>
//             canvas.getObjects('textbox').some((obj) => obj.get('customType') === type);

//         if (!hasTextType('title')) {
//             addTextToCanvas(title, 100, 50, 'title');
//         }
//         if (!hasTextType('content')) {
//             addTextToCanvas(content, 100, 150, 'content');
//         }
//         if (!hasTextType('signature')) {
//             addTextToCanvas(signature, 100, 250, 'signature');
//         }
//     }, [canvas]);

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
//             width: canvas.width - 200,
//             fontSize: type === 'title' ? 40 : type === 'content' ? 30 : 25,
//             fill: 'black',
//             selectable: true,
//             fontWeight: type === 'title' ? 'bold' : 'normal',
//             direction: 'rtl',
//             textAlign: 'right',
//         });
//         textObject.set('customType', type);
//         canvas.add(textObject);
//         canvas.renderAll();
//     };

//     const updateCanvasText = (type: 'title' | 'content' | 'signature', newText: string) => {
//         const textObjects = canvas.getObjects('textbox') as fabric.Textbox[];
//         const textObj = textObjects.find(obj => obj.get('customType') === type);
//         if (textObj) {
//             textObj.set({ text: newText });
//             canvas.renderAll();
//         }
//     };

//     return (
//         <>
//             <div>
//                 <button onClick={() => { setIsEditing({ field: 'title' }); setModalTitile('ערוך כותרת') }}>ערוך כותרת</button>
//                 <button onClick={() => { setIsEditing({ field: 'content' }); setModalTitile('ערוך תוכן') }}>ערוך תוכן</button>
//                 <button onClick={() => { setIsEditing({ field: 'signature' }); setModalTitile('ערוך חתימה') }}>ערוך חתימה</button>

//                 <MyModal isOpen={isEditing.field !== null} title={modalTitle} onClose={() => setIsEditing({ field: null })}>
//                     {isEditing.field && (
//                         <TextEditor currentText={
//                             isEditing.field === 'title' ? title :
//                                 isEditing.field === 'content' ? content :
//                                     signature
//                         } onSave={updateText} />
//                     )}
//                 </MyModal>
//             </div>
//         </>
//     );
// };

// export default TextAddition;