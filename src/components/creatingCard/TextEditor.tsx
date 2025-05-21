import React, { useState, useEffect } from 'react';
import '../cssPages/creatingCard/TextEditor.css';

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
    <div className="cosmic-editor-wrapper">
      <div className="cosmic-editor-stars">
        {Array.from({ length: 20 }).map((_, index) => (
          <div 
            key={index}
            className="cosmic-editor-star"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="cosmic-editor-form" dir="rtl">
        <div className="cosmic-editor-field">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            className="cosmic-editor-textarea"
            placeholder="הזן טקסט כאן..."
            dir="rtl"
          />
          <div className="cosmic-editor-glow"></div>
        </div>

        <div className="cosmic-editor-actions">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="cosmic-editor-button cosmic-editor-cancel"
            >
              <span className="cosmic-button-text">ביטול</span>
              <div className="cosmic-button-glow"></div>
            </button>
          )}

          <button
            type="submit"
            className="cosmic-editor-button cosmic-editor-save"
          >
            <span className="cosmic-button-text">שמור</span>
            <div className="cosmic-button-glow"></div>
          </button>
        </div>
      </form>
    </div>
  )
}

export default TextEditor;