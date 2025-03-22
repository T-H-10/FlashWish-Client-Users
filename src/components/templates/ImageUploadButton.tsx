import { useState } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import ImageUploadForm from './ImageUploadForm';

const ImageUploadButton = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    // const { loading } = useSelector(selectTemplates);
    return (
        <>
            <button onClick={() => setModalVisible(true)}>
                <UploadIcon />
                העלאת תמונה
            </button>
            {modalVisible && (
                <div style={{ border: '1px solid black', padding: '20px', marginTop: '10px' }}>
                    <ImageUploadForm onClose={() => setModalVisible(false)} />
                </div>
            )}

            {/* {loading &&
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <CircularProgress />
                    <h2 style={{ marginLeft: '10px' }}>מעלה תמונה...</h2>
                </div>} */}
        </>
    );
};

export default ImageUploadButton;
