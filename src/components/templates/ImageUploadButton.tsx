import { useState } from 'react';
import ImageUploadForm from './ImageUploadForm';
import { useSelector } from 'react-redux';
import { selectTemplates } from '../../Store/TemplatesStore/TemplatesSlice';
import CircularProgress from '@mui/material/CircularProgress';
const ImageUploadButton = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const { loading } = useSelector(selectTemplates);
    return (
        <>
            <button onClick={() => setModalVisible(true)}>העלה תמונה</button>
            {modalVisible && (
                <div style={{ border: '1px solid black', padding: '20px', marginTop: '10px' }}>
                    <ImageUploadForm onClose={() => setModalVisible(false)} />
                </div>
            )}

            {loading &&
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <CircularProgress />
                    <h2 style={{ marginLeft: '10px' }}>מעלה...</h2>
                </div>}
        </>
    );
};

export default ImageUploadButton;
