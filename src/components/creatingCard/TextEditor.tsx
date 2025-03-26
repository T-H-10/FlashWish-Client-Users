import React, { useEffect, useState } from 'react';

interface TextEditorProps {
    currentText: string;
    onSave: (newText: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ currentText, onSave }) => {
    const [text, setText] = useState<string>(currentText);

    useEffect(() => {
        setText(currentText);
    }, [currentText]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(text);
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '16px',
                width: '100%',
                maxWidth: '400px'
            }}
        >
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
                style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    resize: 'none'
                }}
            />
            <button 
                type="submit" 
                style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    padding: '10px 16px',
                    fontSize: '16px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer'
                }}
            >
                שמור
            </button>
        </form>
    );
};

export default TextEditor;
