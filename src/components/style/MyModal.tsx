import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
// interface ModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     children: React.ReactNode;
// }

const MyModal = ({ isOpen, title, onClose, children }: { isOpen: boolean, title: string, onClose: () => void, children: React.ReactNode }) => {
    if (!isOpen) return null;

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <button onClick={onClose} style={closeButtonStyle}><CloseIcon /></button>
                <h2>{title}</h2>
                {children}
            </div>
        </div>
    );
};

const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalStyle: React.CSSProperties = {
    background: 'white',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
};

const closeButtonStyle: React.CSSProperties = {
    marginBottom: '10px',
};

export default MyModal;
