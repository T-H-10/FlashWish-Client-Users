import { useState } from 'react';
import { Add, AutoAwesome } from '@mui/icons-material';
import GreetingForm from './GreetingForm';
import BlessingGenerator from './generateMessage/BlessingGenerator';
import '../cssPages/messages/GreetingCreateButton.css';

const GreetingCreateButton = () => {
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [loadingAdd, ] = useState<boolean>(false);
  const [loadingCreate, ] = useState<boolean>(false);
  return (
    <div className="cosmic-create-buttons">
      <button 
        className="cosmic-create-button add-button"
        onClick={() => setAddModalVisible(true)}
        disabled={loadingAdd}
      >
        <Add className="button-icon" />
        <span className="button-text">יצירת תוכן חדש</span>
        <div className="button-glow"></div>
      </button>
      
      <button 
        className="cosmic-create-button ai-button"
        onClick={() => setCreateModalVisible(true)}
        disabled={loadingCreate}
      >
        <AutoAwesome className="button-icon" />
        <span className="button-text">בקשת תוכן חדש ע"י AI</span>
        <div className="button-glow"></div>
      </button>
      
      {addModalVisible && (
        <div className="cosmic-modal-overlay" onClick={() => setAddModalVisible(false)}>
          <div className="cosmic-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-glow"></div>
            <GreetingForm onClose={() => setAddModalVisible(false)} />
          </div>
        </div>
      )}
      
      {createModalVisible && (
        <div className="cosmic-modal-overlay" onClick={() => setCreateModalVisible(false)}>
          <div className="cosmic-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-glow"></div>
            <BlessingGenerator onClose={() => setCreateModalVisible(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GreetingCreateButton;