import React, { useEffect, useState } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CloseIcon from '@mui/icons-material/Close';
import '../cssPages/style/MyAlert.css';

type AlertType = 'success' | 'error' | 'info' | 'warning';

interface MyAlertProps {
  isOpen: boolean;
  title: string;
  message?: string;
  type?: AlertType;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  autoClose?: number; // Time in ms before auto-closing, 0 or undefined for no auto-close
}

const MyAlert: React.FC<MyAlertProps> = ({
  isOpen,
  title,
  message,
  type = 'info',
  confirmText = 'אישור',
  cancelText = 'ביטול',
  onConfirm,
  onCancel,
  onClose,
  autoClose
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationState, setAnimationState] = useState('initial');

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      
      // Start entrance animation sequence
      const entranceTimer = setTimeout(() => setAnimationState('entrance'), 50);
      
      // Auto close if specified
      let closeTimer: ReturnType<typeof setTimeout> | null = null;
      if (autoClose && autoClose > 0) {
        closeTimer = setTimeout(() => {
          handleClose();
        }, autoClose);
      }
      
      return () => {
        clearTimeout(entranceTimer);
        if (closeTimer) clearTimeout(closeTimer);
      };
    } else {
      setAnimationState('exit');
      const exitTimer = setTimeout(() => {
        setIsVisible(false);
      }, 600); // Match the animation duration
      
      return () => clearTimeout(exitTimer);
    }
  }, [isOpen, autoClose]);

  const handleClose = () => {
    setAnimationState('exit');
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 600); // Match the animation duration
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    handleClose();
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    handleClose();
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon className="cosmic-alert-icon success" />;
      case 'error':
        return <ErrorIcon className="cosmic-alert-icon error" />;
      case 'warning':
        return <WarningIcon className="cosmic-alert-icon warning" />;
      case 'info':
      default:
        return <InfoIcon className="cosmic-alert-icon info" />;
    }
  };

  if (!isOpen && !isVisible) return null;

  // Generate stars for the alert background
  const stars = Array.from({ length: 50 }).map((_, index) => ({
    id: index,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 3 + 1}px`,
    delay: `${Math.random() * 5}s`
  }));

  // Generate comets for the alert background
  const comets = Array.from({ length: 5 }).map((_, index) => ({
    id: index,
    top: `${Math.random() * 70 + 10}%`,
    left: `${Math.random() * 100}%`,
    width: `${Math.random() * 100 + 50}px`,
    delay: `${Math.random() * 5}s`,
    duration: `${Math.random() * 3 + 2}s`
  }));

  const alertContent = (
    <div className={`cosmic-alert-overlay ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="cosmic-alert-universe">
        <div className="cosmic-alert-galaxy"></div>
        
        {/* Animated stars */}
        {stars.map(star => (
          <div 
            key={star.id}
            className="cosmic-alert-star"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animationDelay: star.delay
            }}
          />
        ))}
        
        {/* Animated comets */}
        {comets.map(comet => (
          <div 
            key={`comet-${comet.id}`}
            className="cosmic-alert-comet"
            style={{
              top: comet.top,
              left: comet.left,
              width: comet.width,
              animationDelay: comet.delay,
              animationDuration: comet.duration
            }}
          />
        ))}
      </div>
      
      <div className={`cosmic-alert-container ${type} ${animationState}`}>
        <div className="cosmic-alert-hologram">
          <div className="hologram-ring ring1"></div>
          <div className="hologram-ring ring2"></div>
          <div className="hologram-ring ring3"></div>
          
          <div className="cosmic-alert-content">
            <div className="cosmic-alert-header">
              <button className="cosmic-alert-close" onClick={handleClose}>
                <CloseIcon />
              </button>
            </div>
            
            <div className="cosmic-alert-body">
              <div className="cosmic-alert-icon-container">
                {getIcon()}
                <div className="cosmic-alert-icon-glow"></div>
                <div className="cosmic-alert-icon-pulse"></div>
              </div>
              
              <h2 className="cosmic-alert-title">{title}</h2>
              
              {message && (
                <p className="cosmic-alert-message">{message}</p>
              )}
            </div>
            
            <div className="cosmic-alert-actions">
              {onCancel && (
                <button 
                  className="cosmic-alert-button cosmic-alert-cancel" 
                  onClick={handleCancel}
                >
                  <span className="cosmic-button-text">{cancelText}</span>
                  <div className="cosmic-button-glow"></div>
                </button>
              )}
              
              {onConfirm && (
                <button 
                  className="cosmic-alert-button cosmic-alert-confirm" 
                  onClick={handleConfirm}
                >
                  <span className="cosmic-button-text">{confirmText}</span>
                  <div className="cosmic-button-glow"></div>
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="cosmic-alert-platform">
          <div className="platform-light"></div>
        </div>
      </div>
    </div>
  );

  // Use React's createPortal to render the alert at the root level
  return isVisible ? alertContent : null;
};

// Create a wrapper component that manages its own state
// export const AlertProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
//   const [alerts, setAlerts] = useState<Array<MyAlertProps & {id: string}>>([]);
  
//   // Function to show an alert
//   const showAlert = (props: Omit<MyAlertProps, 'isOpen'>) => {
//     const id = Math.random().toString(36).substring(2, 9);
    
//     const handleClose = () => {
//       if (props.onClose) props.onClose();
//       setAlerts(current => current.filter(alert => alert.id !== id));
//     };
    
//     const alertProps = {
//       ...props,
//       id,
//       isOpen: true,
//       onClose: handleClose,
//       onConfirm: props.onConfirm ? () => {
//         props.onConfirm?.();
//         handleClose();
//       } : undefined,
//       onCancel: props.onCancel ? () => {
//         props.onCancel?.();
//         handleClose();
//       } : undefined
//     };
    
//     setAlerts(current => [...current, alertProps]);
//     return id;
//   };
  
//   // Function to close an alert by id
//   const closeAlert = (id: string) => {
//     setAlerts(current => current.map(alert => 
//       alert.id === id ? { ...alert, isOpen: false } : alert
//     ));
//   };
  
//   // Create context value
//   const alertContextValue = {
//     showAlert,
//     closeAlert
//   };
  
//   return (
//     <>
//       {children}
//       {alerts.map(alert => (
//         <MyAlert key={alert.id} {...alert} />
//       ))}
//     </>
//   );
// };

export default MyAlert;
