import React, { useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import '../cssPages/style/MyModal.css';

interface MyModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const MyModal: React.FC<MyModalProps> = ({ isOpen, title, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;

  return (
    <div className="cosmic-modal-overlay">
      <div className="cosmic-modal-stars">
        {Array.from({ length: 30 }).map((_, index) => (
          <div 
            key={index}
            className="cosmic-modal-star"
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
      
      <div className="cosmic-modal-container">
        <div className="cosmic-modal-header">
          <h2 className="cosmic-modal-title">{title}</h2>
          <button className="cosmic-modal-close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        
        <div className="cosmic-modal-content">
          {children}
        </div>
        
        <div className="cosmic-modal-glow"></div>
      </div>
    </div>
  );
};

export default MyModal;
