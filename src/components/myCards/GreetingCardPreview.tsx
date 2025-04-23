import React from 'react';

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

interface GreetingCardPreviewProps {
  canvasStyle: string | CanvasStyle;
  width?: number;
  height?: number;
}

const GreetingCardPreview: React.FC<GreetingCardPreviewProps> = ({ canvasStyle, width, height }) => {
  let parsed: CanvasStyle;

  try {
    parsed = typeof canvasStyle === 'string' ? JSON.parse(canvasStyle) : canvasStyle;
  } catch (err) {
    return <div>שגיאה בטעינת הכרטיס</div>;
  }

  const bg = parsed.backgroundImage;
  const w = width ?? bg.width;
  const h = height ?? bg.height;

  return (
    <div
      style={{
        position: 'relative',
        width: w,
        height: h,
        overflow: 'hidden',
        direction: 'rtl',
        borderRadius: 12,
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}
    >
      <img
        src={bg.src}
        alt="Greeting card background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'fill',
          zIndex: 0
        }}
      />

      {parsed.objects.map((obj, idx) => {
        if (obj.type.toLowerCase() !== 'textbox') return null;
        if (!obj.text?.trim()) return null;

        const transform = `
          translate(${obj.left}px, ${obj.top}px)
          rotate(${obj.angle}deg)
        `.trim();

        const textDecoration = [
          obj.underline ? 'underline' : '',
          obj.linethrough ? 'line-through' : '',
          obj.overline ? 'overline' : ''
        ]
          .filter(Boolean)
          .join(' ');

        const textShadow = obj.shadow
          ? `${obj.shadow.offsetX}px ${obj.shadow.offsetY}px ${obj.shadow.blur}px ${obj.shadow.color}`
          : undefined;

        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              transform,
              transformOrigin: 'top left',
              width: obj.width * (obj.scaleX ?? 1),
              height: obj.height * (obj.scaleY ?? 1),
              fontSize: obj.fontSize * (obj.scaleY ?? 1),
              fontWeight: obj.fontWeight,
              fontFamily: obj.fontFamily,
              fontStyle: obj.fontStyle,
              color: obj.fill,
              textAlign: obj.textAlign as 'left' | 'right' | 'center',
              direction: obj.direction,
              lineHeight: `${obj.fontSize * (obj.scaleY ?? 1) * 1.2}px`,
              pointerEvents: 'none',
              backgroundColor: obj.backgroundColor || obj.textBackgroundColor || 'transparent',
              textDecoration,
              textShadow,
              zIndex: 1,
              whiteSpace: 'pre-wrap'
            }}
          >
            {obj.text}
          </div>
        );
      })}
    </div>
  );
};

export default GreetingCardPreview;


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

//   return (
//     <div
//       style={{
//         position: 'relative',
//         width: w,
//         height: h,
//         overflow: 'hidden',
//         direction: 'rtl',
//         borderRadius: 12,
//         boxShadow: '0 0 10px rgba(0,0,0,0.1)'
//       }}
//     >
//       <img
//         src={bg.src}
//         alt="Greeting card background"
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           width: '100%',
//           height: '100%',
//           objectFit: 'fill',
//           zIndex: 0
//         }}
//       />

//       {parsed.objects.map((obj, idx) => {
//         if (obj.type.toLowerCase() !== 'textbox') return null;

//         const transform = `
//           translate(${obj.left}px, ${obj.top}px)
//           scale(${obj.scaleX ?? 1}, ${obj.scaleY ?? 1})
//           rotate(${obj.angle}deg)
//         `.trim();

//         const textDecoration = [
//           obj.underline ? 'underline' : '',
//           obj.linethrough ? 'line-through' : ''
//         ]
//           .filter(Boolean)
//           .join(' ');

//         const textShadow = obj.shadow
//           ? `${obj.shadow.offsetX}px ${obj.shadow.offsetY}px ${obj.shadow.blur}px ${obj.shadow.color}`
//           : undefined;

//         return (
//           <div
//             key={idx}
//             style={{
//               position: 'absolute',
//               transform,
//               transformOrigin: 'top left',
//               width: obj.width,
//               height: obj.height,
//               fontSize: obj.fontSize,
//               fontWeight: obj.fontWeight,
//               fontFamily: obj.fontFamily,
//               fontStyle: obj.fontStyle,
//               color: obj.fill,
//               textAlign: obj.textAlign as 'left' | 'right' | 'center',
//               direction: obj.direction,
//               whiteSpace: 'pre-wrap',
//               pointerEvents: 'none',
//               backgroundColor: obj.backgroundColor || obj.textBackgroundColor || 'transparent',
//               textDecoration,
//               textShadow,
//               zIndex: 1
//             }}
//           >
//             {obj.text}
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default GreetingCardPreview;


// // import React from 'react';

// // interface CanvasObject {
// //   type: string;
// //   text: string;
// //   left: number;
// //   top: number;
// //   fontSize: number;
// //   fontWeight: string;
// //   fontFamily: string;
// //   fontStyle: string;
// //   textAlign: string;
// //   direction: 'rtl' | 'ltr';
// //   fill: string;
// //   angle: number;
// // }

// // interface BackgroundImage {
// //   src: string;
// //   width: number;
// //   height: number;
// // }

// // interface CanvasStyle {
// //   backgroundImage: BackgroundImage;
// //   objects: CanvasObject[];
// // }

// // interface GreetingCardPreviewProps {
// //   canvasStyle: string | CanvasStyle;
// //   width?: number; // Optional override
// //   height?: number;
// // }

// // const GreetingCardPreview: React.FC<GreetingCardPreviewProps> = ({ canvasStyle, width, height }) => {
// //   let parsed: CanvasStyle;

// //   try {
// //     parsed = typeof canvasStyle === 'string' ? JSON.parse(canvasStyle) : canvasStyle;
// //   } catch (err) {
// //     return <div>שגיאה בטעינת הכרטיס</div>;
// //   }

// //   const bg = parsed.backgroundImage;
// //   const w = width ?? bg.width;
// //   const h = height ?? bg.height;

// //   return (
// //     <div
// //       style={{
// //         position: 'relative',
// //         width: w,
// //         height: h,
// //         overflow: 'hidden',
// //         direction: 'rtl',
// //         borderRadius: 12,
// //         boxShadow: '0 0 10px rgba(0,0,0,0.1)'
// //       }}
// //     >
// //       <img
// //         src={bg.src}
// //         alt="Greeting card background"
// //         style={{
// //           position: 'absolute',
// //           top: 0,
// //           left: 0,
// //           width: '100%',
// //           height: '100%',
// //         //   objectFit: 'fill', // חשוב מאוד לשמור על יחסים מדויקים
// //           zIndex: 0
// //         }}
// //       />
  
// //       {parsed.objects.map((obj, idx) => {
// //         if (obj.type.toLowerCase() !== 'textbox') return null;
  
// //         return (
// //           <div
// //             key={idx}
// //             style={{
// //               position: 'absolute',
// //               top: obj.top,
// //               left: obj.left,
// //               fontSize: obj.fontSize,
// //               fontWeight: obj.fontWeight,
// //               fontFamily: obj.fontFamily,
// //               fontStyle: obj.fontStyle,
// //               color: obj.fill,
// //               textAlign: obj.textAlign as 'left' | 'right' | 'center',
// //               direction: obj.direction,
// //               transform: `rotate(${obj.angle}deg)`,
// //               whiteSpace: 'pre-wrap',
// //               pointerEvents: 'none',
// //               background: 'transparent',
// //               zIndex: 1
// //             }}
// //           >
// //             {obj.text}
// //           </div>
// //         );
// //       })}
// //     </div>
// //   );
  
// // //   return (
// // //     <div
// // //       style={{
// // //         position: 'relative',
// // //         width: w,
// // //         height: h,
// // //         backgroundImage: `url(${bg.src})`,
// // //         backgroundSize: 'cover',
// // //         backgroundPosition: 'center',
// // //         overflow: 'hidden',
// // //         direction: 'rtl',
// // //         borderRadius: 12,
// // //         boxShadow: '0 0 10px rgba(0,0,0,0.1)'
// // //       }}
// // //     >
// // //       {parsed.objects.map((obj, idx) => {
// // //         if (obj.type.toLowerCase() !== 'textbox') return null;

// // //         return (
// // //           <div
// // //             key={idx}
// // //             style={{
// // //               position: 'absolute',
// // //               top: obj.top,
// // //               left: obj.left,
// // //               fontSize: obj.fontSize,
// // //               fontWeight: obj.fontWeight,
// // //               fontFamily: obj.fontFamily,
// // //               fontStyle: obj.fontStyle,
// // //               color: obj.fill,
// // //               textAlign: obj.textAlign as 'left' | 'right' | 'center',
// // //               direction: obj.direction,
// // //               transform: `rotate(${obj.angle}deg)`,
// // //               whiteSpace: 'pre-wrap',
// // //               pointerEvents: 'none',
// // //               background: 'transparent'
// // //             }}
// // //           >
// // //             {obj.text}
// // //           </div>
// // //         );
// // //       })}
// // //     </div>
// // //   );
// // };

// // export default GreetingCardPreview;
