import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add'; // נשתמש באייקון שונה
import GreetingForm from './GreetingForm';
import BlessingGenerator from './generateMessage/BlessingGenerator';
import UseStyleAddNewForm from '../style/UseStyleAddNewForm';

const GreetingCreateButton = () => {
    const [addModalVisible, setAddModalVisible] = useState<boolean>(false);
    const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
    const classes=UseStyleAddNewForm();
    return (
        <>
            <button id='add' className={classes.button} onClick={() => setAddModalVisible(true)}>
                <AddIcon />
                יצירת תוכן חדש
            </button>
            <button id='create' className={classes.button} onClick={()=>setCreateModalVisible(true)}>
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
