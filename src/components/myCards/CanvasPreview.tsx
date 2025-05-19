import { useState } from 'react';
import ActionsOnCards from './ActionsOnCard';
import { GreetingCard } from '../../types/GreetingCardsTypes';

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

const CanvasPreview = ({ card ,index}: { card:GreetingCard, index: number }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  let parsed: CanvasStyle;

  try {
    parsed = typeof card.canvasStyle === 'string' ? JSON.parse(card.canvasStyle) : card.canvasStyle;
  } catch (err) {
    return <div>שגיאה בטעינת הכרטיס</div>;
  }

  return (
    <div
      style={{
        margin: '5px',
        borderRadius: '10px',
        position: 'relative',
        width: parsed.backgroundImage.width || 500, 
        height: parsed.backgroundImage.height || 500,
        backgroundImage: `url(${parsed.backgroundImage.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
        boxShadow: hoveredIndex === index ? '0 4px 20px rgba(0, 0, 0, 0.3)' : 'none',
        transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
        zIndex: hoveredIndex === index ? 1 : 0,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {parsed.objects.map((obj, i) => (
        <div
          key={i}
          
          style={{
            position: 'absolute',
            left: `${obj.left}px`,
            top: `${obj.top}px`,
            fontSize: `${obj.fontSize}px`,
            fontWeight: obj.fontWeight,
            fontFamily: obj.fontFamily,
            color: obj.fill,
            width: `${obj.width}px`,
            height: `${obj.height}px`,
            direction: obj.direction,
            // transform: `rotate(${obj.angle}deg)`,
            textDecoration: obj.underline ? 'underline' : 'none',
          }}
        >
          {obj.text}
          
        </div>

      ))}
      {hoveredIndex === index && (
            <ActionsOnCards card={card}/>
          )}
    </div>
  );
};

export default CanvasPreview;
