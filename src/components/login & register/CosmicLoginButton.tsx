import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import '../cssPages/login & register/CosmicLoginButton.css';

interface CosmicLoginButtonProps {
  content: string;
  onClick: (e: React.FormEvent) => Promise<void>;
  isLoading?: boolean;
}

const CosmicLoginButton: React.FC<CosmicLoginButtonProps> = ({ 
  content, 
  onClick,
  isLoading = false
}) => {
  return (
    <div className="cosmic-button-container">
      <Button
        variant="contained"
        onClick={onClick}
        fullWidth
        disabled={isLoading}
        className="cosmic-login-button"
        type="submit"
      >
        {isLoading ? (
          <CircularProgress size={24} className="button-loader" />
        ) : (
          <span className="button-text">{content}</span>
        )}
      </Button>
      <div className="button-glow"></div>
      
      <div className="cosmic-button-decoration">
        <div className="decoration-star star1"></div>
        <div className="decoration-star star2"></div>
        <div className="decoration-star star3"></div>
        <div className="decoration-line"></div>
      </div>
    </div>
  );
};

export default CosmicLoginButton;