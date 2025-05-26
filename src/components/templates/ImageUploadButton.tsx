import { useState } from 'react';
import { CropOriginal } from '@mui/icons-material';
import ImageUploadForm from './ImageUploadForm';
import '../cssPages/templates/ImageUploadButton.css';

const ImageUploadButton = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <div className="cosmic-upload-container">
      <button 
        className="cosmic-upload-button" 
        onClick={() => setModalVisible(true)}
      >
        <CropOriginal className="upload-icon" />
        <span className="upload-text">העלאת תמונה</span>
        <div className="button-glow"></div>
      </button>
      
      {modalVisible && (
        <div className="cosmic-modal-overlay" onClick={() => setModalVisible(false)}>
          <div className="cosmic-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-glow"></div>
            <ImageUploadForm onClose={() => setModalVisible(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadButton;
