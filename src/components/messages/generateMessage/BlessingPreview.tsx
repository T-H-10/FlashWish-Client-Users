import React, { useState } from 'react';
import { Celebration, ContentCopy, Done } from '@mui/icons-material';
import { GreetingMessagePostModel } from '../../../types/GreetingMessageType';
import '../../cssPages/messages/BlessingPreview.css';

interface BlessingPreviewProps {
  blessing: GreetingMessagePostModel;
  onSave: () => void;
}

const BlessingPreview: React.FC<BlessingPreviewProps> = ({ blessing, onSave }) => {
  const [copied, setCopied] = useState(false);
  
  const copyToClipboard = () => {
    const content = `${blessing.title}\n\n${blessing.content}\n\n${blessing.signature}`;
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  return (
    <div className="cosmic-blessing-preview">
      <div className="preview-header">
        <Celebration className="preview-icon" />
        <h3 className="preview-title">הברכה שלך מוכנה!</h3>
      </div>
      
      <div className="preview-content">
        <div className="blessing-card">
          <div className="blessing-background">
            <div className="nebula-layer"></div>
            <div className="stars-layer">
              {Array.from({ length: 10 }).map((_, index) => (
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
          
          <div className="blessing-content">
            <h3 className="blessing-title">{blessing.title}</h3>
            <div className="blessing-body">
              {blessing.content.split('\n').map((line, index) => (
                <p key={index} className="blessing-text">{line}</p>
              ))}
            </div>
            <p className="blessing-signature">{blessing.signature}</p>
          </div>
          <div className="blessing-decoration">
            <div className="decoration-star ds1"></div>
            <div className="decoration-star ds2"></div>
            <div className="decoration-star ds3"></div>
          </div>
        </div>
      </div>
      
      <div className="preview-actions">
        <button className="cosmic-save-button" onClick={onSave}>
          <Done className="button-icon" />
          <span className="button-text">שמור ברכה</span>
          <div className="button-glow"></div>
        </button>
        <button className="cosmic-copy-button" onClick={copyToClipboard}>
          <ContentCopy className="button-icon" />
          <span className="button-text">{copied ? 'הועתק!' : 'העתק לזכרון'}</span>
          <div className="button-glow"></div>
        </button>
      </div>
    </div>
  );
};

export default BlessingPreview;