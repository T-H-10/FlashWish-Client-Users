import React from 'react';
import '../cssPages/style/StyleButton.css';

interface StyleButtonProps {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  title?: string;
}

const StyleButton: React.FC<StyleButtonProps> = ({ onClick, isActive = false, children, title }) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`cosmic-style-button ${isActive ? "cosmic-style-active" : ""}`}
      aria-pressed={isActive}
    >
      <div className="cosmic-style-icon">{children}</div>
      <div className="cosmic-style-glow"></div>
      {title && <span className="cosmic-style-tooltip">{title}</span>}
    </button>
  );
};

export default StyleButton;
