import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add'; // נשתמש באייקון שונה
import GreetingForm from './GreetingForm';

const GreetingCreateButton = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <>
            <button onClick={() => setModalVisible(true)}>
                <AddIcon />
                יצירת תוכן חדש
            </button>
            {modalVisible && (
                <div style={{ border: '1px solid black', padding: '20px', marginTop: '10px' }}>
                    <GreetingForm onClose={() => setModalVisible(false)} />
                </div>
            )}
        </>
    );
};

export default GreetingCreateButton;
