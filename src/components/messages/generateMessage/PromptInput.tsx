import { TextField } from '@mui/material';

const PromptInput = ({ prompt, setPrompt }: { prompt: string; setPrompt: (value: string) => void }) => (
  <TextField
    label="מה תרצו שייכלל בברכה?"
    value={prompt}
    onChange={(e) => setPrompt(e.target.value)}
    fullWidth
    multiline
    rows={3}
    margin="normal"
  />
);

export default PromptInput;
