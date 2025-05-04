// import React from 'react';

// interface CanvasObject {
//   type: string;
//   text: string;
//   left: number;
//   top: number;
//   width: number;
//   height: number;
//   fontSize: number;
//   fontWeight: string;
//   fontFamily: string;
//   fontStyle: string;
//   textAlign: string;
//   direction: 'rtl' | 'ltr';
//   fill: string;
//   backgroundColor?: string;
//   textBackgroundColor?: string;
//   angle: number;
//   scaleX: number;
//   scaleY: number;
//   underline?: boolean;
//   linethrough?: boolean;
//   overline?: boolean;
//   shadow?: {
//     color: string;
//     blur: number;
//     offsetX: number;
//     offsetY: number;
//   };
// }

// interface BackgroundImage {
//   src: string;
//   width: number;
//   height: number;
// }

// interface CanvasStyle {
//   backgroundImage: BackgroundImage;
//   objects: CanvasObject[];
// }

// interface GreetingCardPreviewProps {
//   canvasStyle: string | CanvasStyle;
//   width?: number;
//   height?: number;
// }

// const GreetingCardPreview: React.FC<GreetingCardPreviewProps> = ({ canvasStyle, width, height }) => {
//   let parsed: CanvasStyle;

//   try {
//     parsed = typeof canvasStyle === 'string' ? JSON.parse(canvasStyle) : canvasStyle;
//   } catch (err) {
//     return <div>שגיאה בטעינת הכרטיס</div>;
//   }

//   const bg = parsed.backgroundImage;
//   const w = width ?? bg.width;
//   const h = height ?? bg.height;
//   console.log(bg.src);
  
//   return (
//     <div
//       style={{
//         position: 'relative',
//         width: w,
//         height: h,
//         overflow: 'hidden',
//         direction: 'rtl',
//         borderRadius: 12,
//         boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',  // צל גדול יותר
//         transition: 'transform 0.3s ease, box-shadow 0.3s ease',  // מעבר חלק כשעוברים עם העכבר
//         cursor: 'pointer',
//         // ':hover': {
//         //   transform: 'scale(1.05)',  // הגדלה כשמעבירים את העכבר
//         //   boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)'  // הגדלת הצללים בזמן hover
//         // }
//       }}
//     >
//       <img
//         src={bg.src}
//         alt="Greeting card background"
//         style={{
//           position: 'absolute',
//           top: 15,
//           left: 10,
//           width: '95%',
//           height: '95%',
//           objectFit: 'cover',
//           zIndex: 0,
//           borderRadius: '12px'
//         }}
//       />

//       {parsed.objects.map((obj, idx) => {
//         if (obj.type.toLowerCase() !== 'textbox') return null;
//         if (!obj.text?.trim()) return null;

//         const centerX=(bg.width + obj.width * (obj.scaleX ?? 1)) / 2;
//         const centerY=(bg.height + obj.height * (obj.scaleY ?? 1)) / 2;
//         // const centerX = (bg.width - obj.width) / 2; // חישוב מיקום אופקי במרכז
//         // const centerY = (bg.height - obj.height) / 2; // חישוב מיקום אנכי במרכז
    
//         const transform = `
//             translate(${centerX}px, ${centerY}px)
//             rotate(${obj.angle}deg)
//         `.trim();
//         // const transform = `
//         //   translate(${obj.left}px, ${obj.top}px)
//         //   rotate(${obj.angle}deg)
//         // `.trim();

//         const textDecoration = [
//           obj.underline ? 'underline' : '',
//           obj.linethrough ? 'line-through' : '',
//           obj.overline ? 'overline' : ''
//         ]
//           .filter(Boolean)
//           .join(' ');

//         const textShadow = obj.shadow
//           ? `${obj.shadow.offsetX}px ${obj.shadow.offsetY}px ${obj.shadow.blur}px ${obj.shadow.color}`
//           : undefined;

//         return (
//           <>
//           <span
//             key={idx}
//             style={{
//               position: 'absolute',
//               transform,
//               transformOrigin: 'top left',
//               width: obj.width * (obj.scaleX ?? 1),
//               height: obj.height * (obj.scaleY ?? 1),
//               fontSize: obj.fontSize * (obj.scaleY ?? 1),
//               fontWeight: obj.fontWeight,
//               fontFamily: obj.fontFamily,
//               fontStyle: obj.fontStyle,
//               color: obj.fill,
//               textAlign: obj.textAlign as 'left' | 'right' | 'center',
//               direction: obj.direction,
//               lineHeight: `${obj.fontSize * (obj.scaleY ?? 1) * 1.2}px`,
//               pointerEvents: 'none',
//               backgroundColor: obj.backgroundColor || obj.textBackgroundColor || 'transparent',
//               textDecoration,
//               textShadow,
//               zIndex: 1,
//               whiteSpace: 'pre-wrap',
//               textTransform: 'uppercase',  // להפוך את הטקסט לאותיות רישיות (אופציונלי)
//               letterSpacing: '1px',  // ריווח בין האותיות
//               transition: 'color 0.3s ease',  // מעבר חלק בצבעים
//               // ':hover': {
//               //   color: 'white',  // צבע טקסט משתנה כשהעכבר עובר עליו
//               //   textShadow: '2px 2px 10px rgba(0, 0, 0, 0.5)',  // צלליות מוגברות
//               // }
//             }}
//           >
//             {obj.text}
//           </span>
          
//           </>
//         );
//       })}
//     </div>
//   );
// };

// export default GreetingCardPreview;
