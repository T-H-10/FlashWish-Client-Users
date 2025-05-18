// "use client"
import { useState, useEffect } from "react"
import { COSMIC_COLORS } from "../../utils/Comsic-theme"

interface TextEditorProps {
  currentText: string
  onSave: (newText: string) => void
  onCancel?: () => void
}

const TextEditor: React.FC<TextEditorProps> = ({ currentText, onSave, onCancel }) => {
  const [text, setText] = useState<string>(currentText)

  useEffect(() => {
    setText(currentText)
  }, [currentText])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(text)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full max-w-md" dir="rtl">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        className={`
          w-full p-4 rounded-lg
          bg-[${COSMIC_COLORS.primaryDark}]
          text-[${COSMIC_COLORS.textLight}]
          border border-[${COSMIC_COLORS.primaryLight}]
          focus:outline-none focus:ring-2 focus:ring-[${COSMIC_COLORS.secondary}]
          resize-none transition-all duration-300
          placeholder-[${COSMIC_COLORS.textLight}] placeholder-opacity-50
        `}
        placeholder="הזן טקסט כאן..."
        dir="rtl"
      />

      <div className="flex justify-between space-x-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className={`
              px-6 py-2 rounded-lg
              bg-transparent
              text-[${COSMIC_COLORS.textLight}]
              border border-[${COSMIC_COLORS.primaryLight}]
              hover:bg-[${COSMIC_COLORS.primaryLight}]
              transition-all duration-300
              flex-1
            `}
          >
            ביטול
          </button>
        )}

        <button
          type="submit"
          className={`
            px-6 py-2 rounded-lg
            bg-gradient-to-r from-[${COSMIC_COLORS.cosmicPurple}] to-[${COSMIC_COLORS.cosmicPink}]
            text-[${COSMIC_COLORS.textLight}]
            hover:shadow-lg hover:shadow-[${COSMIC_COLORS.glowColor}]
            hover:transform hover:scale-105
            transition-all duration-300
            flex-1
          `}
        >
          שמור
        </button>
      </div>
    </form>
  )
}

export default TextEditor


// import React, { useEffect, useState } from 'react';
// interface TextEditorProps {
//     currentText: string;
//     onSave: (newText: string) => void;
// }

// const TextEditor: React.FC<TextEditorProps> = ({ currentText, onSave }) => {
//     const [text, setText] = useState<string>(currentText);

//     useEffect(() => {
//         setText(currentText);
//     }, [currentText]);

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         onSave(text);
//     };

//     return (
//         <form 
//             onSubmit={handleSubmit} 
//             style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 gap: '12px',
//                 padding: '16px',
//                 width: '100%',
//                 maxWidth: '400px'
//             }}
//         >
//             <textarea
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 rows={6}
//                 style={{
//                     width: '90%',
//                     padding: '10px',
//                     fontSize: '16px',
//                     borderRadius: '8px',
//                     border: '1px solid #ccc',
//                     resize: 'none'
//                 }}
//             />
//             <button 
//                 type="submit" 
//                 style={{
//                     backgroundColor: '#4CAF50',
//                     color: 'white',
//                     padding: '10px 16px',
//                     fontSize: '16px',
//                     border: 'none',
//                     borderRadius: '8px',
//                     cursor: 'pointer'
//                 }}
//             >
//                 שמור
//             </button>
//         </form>
//     );
// };

// export default TextEditor;
