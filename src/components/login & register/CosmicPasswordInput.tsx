import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import '../cssPages/login & register/CosmiInputs.css';

interface CosmicPasswordInputProps {
  password: string;
  setPassword: (password: string) => void;
}

const CosmicPasswordInput: React.FC<CosmicPasswordInputProps> = ({ password, setPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="cosmic-input-container">
      <TextField
        label="סיסמה"
        type={showPassword ? 'text' : 'password'}
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="cosmic-input"
        InputLabelProps={{ 
          className: "cosmic-input-label",
          shrink: true
        }}
        InputProps={{
          className: "cosmic-input-field",
          startAdornment: (
            <InputAdornment position="start">
              <Lock className="cosmic-input-icon" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                edge="end"
                className="cosmic-visibility-toggle"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <div className="input-glow"></div>
    </div>
  );
};

export default CosmicPasswordInput;