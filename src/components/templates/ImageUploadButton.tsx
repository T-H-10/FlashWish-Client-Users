import { useState } from 'react';
import ImageUploadForm from './ImageUploadForm';
import UseStyleImageUploaderForm from '../style/UseStyleAddNewForm';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';

const ImageUploadButton = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    // const { loading } = useSelector(selectTemplates);
    const classes=UseStyleImageUploaderForm();
    return (
        <>
            <button className={classes.button} onClick={() => setModalVisible(true)}>
                {/* <UploadIcon /> */}
                <CropOriginalIcon style={{marginLeft: '5px'}}/>
                <span style={{paddingBottom: '3px'}}>
                העלאת תמונה
                </span>
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
