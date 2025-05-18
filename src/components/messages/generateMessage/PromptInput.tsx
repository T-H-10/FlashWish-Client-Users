import React from 'react';
import '../../cssPages/messages/PromptInput.css';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ prompt, setPrompt }) => {
  return (
    <div className="cosmic-prompt-input">
      <label className="prompt-label">מה תרצו שייכלל בברכה?</label>
      <div className="textarea-container">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="cosmic-textarea"
          placeholder="לדוגמה: ברכה ליום הולדת 30 לחבר טוב שאוהב לטייל בעולם"
          rows={4}
        />
        <div className="textarea-glow"></div>
      </div>
      <p className="prompt-hint">
        ככל שתספקו יותר פרטים, כך הברכה תהיה מותאמת יותר אישית
      </p>
    </div>
  );
};

export default PromptInput;

// import { TextField } from '@mui/material';

// const PromptInput = ({ prompt, setPrompt }: { prompt: string; setPrompt: (value: string) => void }) => (
//   <TextField
//     label="מה תרצו שייכלל בברכה?"
//     value={prompt}
//     onChange={(e) => setPrompt(e.target.value)}
//     fullWidth
//     multiline
//     rows={3}
//     margin="normal"
//   />
// );

// export default PromptInput;
