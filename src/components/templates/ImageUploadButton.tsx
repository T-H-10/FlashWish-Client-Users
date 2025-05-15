import { useState } from 'react';
import { CropOriginal } from '@mui/icons-material';
import ImageUploadForm from './ImageUploadForm';
import '../cssPages/templates/ImageUploadButton.css';

const ImageUploadButton = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  return (
    <div className="cosmic-upload-container">
      <button 
        className="cosmic-upload-button" 
        onClick={() => setModalVisible(true)}
      >
        <CropOriginal className="upload-icon" />
        <span className="upload-text">���������� ����������</span>
        <div className="button-glow"></div>
      </button>
      
      {modalVisible && (
        <div className="cosmic-modal-overlay" onClick={() => setModalVisible(false)}>
          <div className="cosmic-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-glow"></div>
            <ImageUploadForm onClose={() => setModalVisible(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploadButton;

// import { useState } from 'react';
// import ImageUploadForm from './ImageUploadForm';
// import UseStyleAddNewForm from '../style/UseStyleAddNewForm';
// import CropOriginalIcon from '@mui/icons-material/CropOriginal';

// const ImageUploadButton = () => {
//     const [modalVisible, setModalVisible] = useState<boolean>(false);
//     // const { loading } = useSelector(selectTemplates);
//     const classes=UseStyleAddNewForm();
//     return (
//         <>
//             <button className={classes.button} onClick={() => setModalVisible(true)}>
//                 {/* <UploadIcon /> */}
//                 <CropOriginalIcon style={{marginLeft: '5px'}}/>
//                 <span style={{paddingBottom: '3px'}}>
//                 העלאת תמונה
//                 </span>
//             </button>
//             {modalVisible && (
//                 <div style={{ border: '1px solid black', padding: '20px', marginTop: '10px' }}>
//                     <ImageUploadForm onClose={() => setModalVisible(false)} />
//                 </div>
//             )}

//         </>
//     );
// };

// export default ImageUploadButton;
