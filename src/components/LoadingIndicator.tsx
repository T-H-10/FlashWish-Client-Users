import React from 'react';
import './cssPages/LoadingIndicator.css';

interface LoadingIndicatorProps {
  content: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ content }) => {
  return (
    <div className="cosmic-loading-container">
      <div className="cosmic-loading-animation">
        <div className="cosmic-orbit">
          <div className="planet"></div>
          <div className="satellite s1"></div>
          <div className="satellite s2"></div>
          <div className="satellite s3"></div>
        </div>
      </div>
      
      <div className="loading-text">
        <span className="loading-content">{content}</span>
        <span className="loading-dots">
          <span className="dot dot1">.</span>
          <span className="dot dot2">.</span>
          <span className="dot dot3">.</span>
        </span>
      </div>
    </div>
  );
};

export default LoadingIndicator;
