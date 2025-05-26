import React from 'react';
import { Send, Refresh, Close } from '@mui/icons-material';
import '../../cssPages/messages/ActionButtons.css';

interface ActionButtonsProps {
  onGenerate: () => void;
  onClose: () => void;
  disabled: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onGenerate,
  onClose,
  disabled
}) => {
  return (
    <div className="cosmic-action-buttons">
      <button 
        className="cosmic-action-button generate"
        onClick={onGenerate}
        disabled={disabled}
        title="צור ברכה"
      >
        <Send className="button-icon" />
        <span className="button-text">צור ברכה</span>
        <div className="button-glow"></div>
      </button>
      
      <button 
        className="cosmic-action-button refresh"
        onClick={onGenerate}
        disabled={disabled}
        title="נסה ברכה אחרת"
      >
        <Refresh className="button-icon" />
        <span className="button-text">נסה שוב</span>
        <div className="button-glow"></div>
      </button>
      
      <button 
        className="cosmic-action-button cancel"
        onClick={onClose}
        title="סגור"
      >
        <Close className="button-icon" />
        <span className="button-text">סגור</span>
        <div className="button-glow"></div>
      </button>
    </div>
  );
};

export default ActionButtons;