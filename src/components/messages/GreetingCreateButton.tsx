import { useState } from 'react';
import { Add, AutoAwesome } from '@mui/icons-material';
import GreetingForm from './GreetingForm';
import BlessingGenerator from './generateMessage/BlessingGenerator';
import '../cssPages/messages/GreetingCreateButton.css';
'
const GreetingCreateButton = () => {
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);

  return (
    <div className="cosmic-create-buttons">
      <button 
        className="cosmic-create-button add-button"
        onClick={() => setAddModalVisible(true)}
      >
        <Add className="button-icon" />
        <span className="button-text">יצירת תוכן חדש</span>
        <div className="button-glow"></div>
      </button>
      
      <button 
        className="cosmic-create-button ai-button"
        onClick={() => setCreateModalVisible(true)}
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

// import { useState } from 'react';
// import AddIcon from '@mui/icons-material/Add'; // נשתמש באייקון שונה
// import GreetingForm from './GreetingForm';
// import BlessingGenerator from './generateMessage/BlessingGenerator';
// import UseStyleAddNewForm from '../style/UseStyleAddNewForm';

// const GreetingCreateButton = () => {
//     const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
//     const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
//     const classes=UseStyleAddNewForm();
//     return (
//         <>
//             <button id='add' className={classes.button} onClick={() => setAddModalVisible(true)}>
//                 <AddIcon />
//                 יצירת תוכן חדש
//             </button>
//             <button id='create' className={classes.button} onClick={()=>setCreateModalVisible(true)}>
//                 <AddIcon />
//                 בקשת תוכן חדש ע"י AI
//             </button>
//             {addModalVisible && (
//                 <div style={{ border: '1px solid black', padding: '20px', marginTop: '10px' }}>
//                     <GreetingForm onClose={() => setAddModalVisible(false)} />
//                 </div>
//             )}
//             {createModalVisible && (
//                 <div style={{ border: '1px solid black', padding: '20px', marginTop: '10px' }}>
//                 <BlessingGenerator onClose={async () => setCreateModalVisible(false)}/>
//             </div>
//             )}
                
//         </>
//     );
// };

// export default GreetingCreateButton;
