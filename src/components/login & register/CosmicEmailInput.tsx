import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Email } from '@mui/icons-material';
import '../cssPages/login & register/CosmiInputs.css';

interface CosmicEmailInputProps {
  email: string;
  setEmail: (email: string) => void;
}

const CosmicEmailInput: React.FC<CosmicEmailInputProps> = ({ email, setEmail }) => {
  return (
    <div className="cosmic-input-container">
      <TextField
        label="אימייל"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="cosmic-input"
        InputLabelProps={{ 
          className: "cosmic-input-label",
          shrink: true
        }}
        InputProps={{
          className: "cosmic-input-field",
          startAdornment: (
            <InputAdornment position="start">
              <Email className="cosmic-input-icon" />
            </InputAdornment>
          ),
        }}
      />
      <div className="input-glow"></div>
    </div>
  );
};

export default CosmicEmailInput;