import { useState } from 'react';
import ImageUploadForm from './ImageUploadForm';

const ImageUploadButton = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <div>
            <button onClick={() => setModalVisible(true)}>העלה תמונה</button>
            {modalVisible && (
                <div style={{ border: '1px solid black', padding: '20px', marginTop: '10px' }}>
                    <ImageUploadForm onClose={() => setModalVisible(false)} />
                </div>
            )}
        </div>
    );
};

export default ImageUploadButton;
