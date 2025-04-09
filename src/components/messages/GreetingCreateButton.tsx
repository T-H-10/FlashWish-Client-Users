import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add'; // נשתמש באייקון שונה
import GreetingForm from './GreetingForm';
import BlessingGenerator from './generateMessage/BlessingGenerator';

const GreetingCreateButton = () => {
    const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
    const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);

    return (
        <>
            <button id='add' style={{margin: '3px'}} onClick={() => setAddModalVisible(true)}>
                <AddIcon />
                יצירת תוכן חדש
            </button>
            <button id='create' style={{margin: '3px'}} onClick={()=>setCreateModalVisible(true)}>
                <AddIcon />
                בקשת תוכן חדש ע"י AI
            </button>
            {addModalVisible && (
                <div style={{ border: '1px solid black', padding: '20px', marginTop: '10px' }}>
                    <GreetingForm onClose={() => setAddModalVisible(false)} />
                </div>
            )}
            {createModalVisible && (
                <div style={{ border: '1px solid black', padding: '20px', marginTop: '10px' }}>
                <BlessingGenerator onClose={async () => setCreateModalVisible(false)}/>
            </div>
            )}
                
        </>
    );
};

export default GreetingCreateButton;
