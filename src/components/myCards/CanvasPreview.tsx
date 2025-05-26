import { useState } from 'react';
import { GreetingCard } from '../../types/GreetingCardsTypes';
import ActionsOnCards from './ActionsOnCard';
import '../cssPages/myCards/CanvasPreview.css';

interface CanvasObject {
  type: string;
  text: string;
  left: number;
  top: number;
  width: number;
  height: number;
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  fontStyle: string;
  textAlign: string;
  direction: 'rtl' | 'ltr';
  fill: string;
  backgroundColor?: string;
  textBackgroundColor?: string;
  angle: number;
  scaleX: number;
  scaleY: number;
  underline?: boolean;
  linethrough?: boolean;
  overline?: boolean;
  shadow?: {
    color: string;
    blur: number;
    offsetX: number;
    offsetY: number;
  };
}

interface BackgroundImage {
  src: string;
  width: number;
  height: number;
}

interface CanvasStyle {
  backgroundImage: BackgroundImage;
  objects: CanvasObject[];
}

const CanvasPreview = ({ card, index }: { card: GreetingCard, index: number }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  let parsed: CanvasStyle;
 
  const renderErrorCard = () => (
    <div className="cosmic-error-card">
      <div className="cosmic-error-icon">!</div>
      <p className="cosmic-error-text">שגיאה בטעינת הכרטיס</p>
    </div>
  );
  
  try {
    parsed = typeof card.canvasStyle === 'string' ? JSON.parse(card.canvasStyle) : card.canvasStyle;
  } catch (err) {
    return renderErrorCard();
  }

  if(!parsed?.backgroundImage || !parsed?.objects){
    return renderErrorCard();
  }

  return (
    <div
      className={`cosmic-card ${hoveredIndex === index ? 'cosmic-card-hovered' : ''}`}
      style={{
        width: parsed.backgroundImage?.width || 500,
        height: parsed.backgroundImage?.height || 500,
        backgroundImage: `url(${parsed.backgroundImage.src})`,
      }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className="cosmic-card-glow"></div>
      
      {parsed.objects.map((obj, i) => (
        <div
          key={i}
          className="cosmic-card-text"
          style={{
            left: `${obj.left}px`,
            top: `${obj.top}px`,
            fontSize: `${obj.fontSize}px`,
            fontWeight: obj.fontWeight,
            fontFamily: obj.fontFamily,
            color: obj.fill,
            width: `${obj.width}px`,
            height: `${obj.height}px`,
            direction: obj.direction,
            transform: `rotate(${obj.angle}deg)`,
            textDecoration: obj.underline ? 'underline' : 'none',
          }}
        >
          {obj.text}
        </div>
      ))}
      
      {hoveredIndex === index && (
        <div className="cosmic-card-actions-container">
          <ActionsOnCards card={card} />
        </div>
      )}
      
      {hoveredIndex === index && (
        <div className="cosmic-card-overlay"></div>
      )}
    </div>
  );
};

export default CanvasPreview;