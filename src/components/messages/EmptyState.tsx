import React from 'react';
import { AutoAwesome } from '@mui/icons-material';
import '../cssPages/messages/EmptyState.css';

interface EmptyStateProps {
  message: string;
  subMessage?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message, subMessage }) => {
  return (
    <div className="cosmic-empty-state">
      <div className="empty-state-background">
        <div className="nebula-layer"></div>
        <div className="stars-layer">
          {Array.from({ length: 20 }).map((_, index) => (
            <div 
              key={index}
              className="cosmic-particle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 3}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="empty-state-content">
        <div className="empty-icon-container">
          <AutoAwesome className="empty-icon" />
          <div className="icon-glow"></div>
        </div>
        
        <h3 className="empty-message">{message}</h3>
        
        {subMessage && (
          <p className="empty-sub-message">{subMessage}</p>
        )}
      </div>
    </div>
  );
};

export default EmptyState;