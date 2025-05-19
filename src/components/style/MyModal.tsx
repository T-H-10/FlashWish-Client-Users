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

// import React from 'react';
// import CloseIcon from '@mui/icons-material/Close';
// // interface ModalProps {
// //     isOpen: boolean;
// //     onClose: () => void;
// //     children: React.ReactNode;
// // }

// const MyModal = ({ isOpen, title, onClose, children }: { isOpen: boolean, title: string, onClose: () => void, children: React.ReactNode }) => {
//     if (!isOpen) return null;

//     return (
//         <div style={overlayStyle}>
//             <div style={modalStyle}>
//                 <button onClick={onClose} style={closeButtonStyle}><CloseIcon /></button>
//                 <h2>{title}</h2>
//                 {children}
//             </div>
//         </div>
//     );
// };

// const overlayStyle: React.CSSProperties = {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
// };

// const modalStyle: React.CSSProperties = {
//     background: 'white',
//     padding: '20px',
//     borderRadius: '5px',
//     boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
// };

// const closeButtonStyle: React.CSSProperties = {
//     marginBottom: '10px',
// };

// export default MyModal;
