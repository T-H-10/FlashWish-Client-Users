import { useState } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import ImageUploadForm from './ImageUploadForm';
import UseStyleImageUploaderForm from '../style/UseStyleAddNewForm';

const ImageUploadButton = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    // const { loading } = useSelector(selectTemplates);
    const classes=UseStyleImageUploaderForm();
    return (
        <>
            <button className={classes.button} onClick={() => setModalVisible(true)}>
                <UploadIcon />
                העלאת תמונה
            </button>
            {modalVisible && (
                <div style={{ border: '1px solid black', padding: '20px', marginTop: '10px' }}>
                    <ImageUploadForm onClose={() => setModalVisible(false)} />
                </div>
            )}

        </>
    );
};

export default ImageUploadButton;
