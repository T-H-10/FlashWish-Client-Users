import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Person } from '@mui/icons-material';
import '../cssPages/login & register/CosmiInputs.css';

interface CosmicNameInputProps {
  userName: string;
  setName: (name: string) => void;
}

const CosmicNameInput: React.FC<CosmicNameInputProps> = ({ userName, setName }) => {
  return (
    <div className="cosmic-input-container">
      <TextField
        label="שם משתמש"
        variant="outlined"
        fullWidth
        value={userName}
        onChange={(e) => setName(e.target.value)}
        className="cosmic-input"
        InputLabelProps={{ 
          className: "cosmic-input-label",
          shrink: true
        }}
        InputProps={{
          className: "cosmic-input-field",
          startAdornment: (
            <InputAdornment position="start">
              <Person className="cosmic-input-icon" />
            </InputAdornment>
          ),
        }}
      />
      <div className="input-glow"></div>
    </div>
  );
};

export default CosmicNameInput;