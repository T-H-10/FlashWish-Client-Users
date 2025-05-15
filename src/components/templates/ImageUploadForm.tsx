import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { UserContext } from '../../types/UserTypes';
import { appDispatch } from '../../Store/Store';
import { addTemplate } from '../../Store/templatesStore/TemplatesApi';
import { TemplatePostModel } from '../../types/TemplateType';
import CategorySelector from '../CategorySelector';
import '../cssPages/templates/ImageUploadForm.css';

interface ImageUploadFormProps {
  onClose: () => void;
}

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({ onClose }) => {
  const [imageName, setImageName] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { user } = useContext(UserContext);
  const dispatch = useDispatch<appDispatch>();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    if (!imageName || !imageFile || !selectedCategory) {
      Swal.fire({
        icon: 'warning',
        title: '����������',
        text: '���� �������� ���� ���� ����������',
        background: '#25173b',
        color: '#ffffff',
        iconColor: '#ff9800',
        confirmButtonColor: '#fbbe65',
      });
      return;
    }

    const uploadData: TemplatePostModel = {
      templateName: imageName,
      categoryID: selectedCategory,
      userID: user.id,
      image: imageFile,
    };

    dispatch(addTemplate({ newTemplate: uploadData }));
    setImageName('');
    setSelectedCategory(0);
    setImageFile(null);
    setPreviewUrl(null);
    onClose();
    
    Swal.fire({
      icon: 'success',
      title: '���������� ������������',
      text: '������������ ������������ ������������',
      background: '#25173b',
      color: '#ffffff',
      iconColor: '#4caf50',
      confirmButtonColor: '#fbbe65',
    });
  };

  return (
    <div className="cosmic-upload-form">
      <h2 className="form-title">���������� ���������� ��������</h2>
      
      <div className="form-group">
        <label className="form-label">���� ������������</label>
        <input
          type="text"
          placeholder="������ ���� ������������"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
          className="cosmic-input"
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">������ ��������������</label>
        <CategorySelector 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">������ ����������</label>
        <div className="file-input-container">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
            id="file-input"
          />
          <label htmlFor="file-input" className="file-input-label">
            {imageFile ? imageFile.name : '������ ��������'}
          </label>
        </div>
      </div>
      
      {previewUrl && (
        <div className="image-preview">
          <img src={previewUrl || "/placeholder.svg"} alt="Preview" className="preview-image" />
        </div>
      )}
      
      <div className="form-notice">
        <p>שים לב! בהעלאת תמונה היא תהפך לציבורית וכולם יוכלו לשתמש בה.</p>
      </div>
      
      <div className="form-actions">
        <button className="cosmic-action-button upload" onClick={handleUpload}>
        הוסף
          <div className="button-glow"></div>
        </button>
        <button className="cosmic-action-button cancel" onClick={onClose}>
        סגור
          <div className="button-glow"></div>
        </button>
      </div>
    </div>
  );
};

export default ImageUploadForm;

// import React, { useContext, useState } from 'react';
// import Swal from 'sweetalert2';
// import { UserContext } from '../../types/UserTypes';
// import { useDispatch } from 'react-redux';
// import { addTemplate } from '../../Store/templatesStore/TemplatesApi';
// import { appDispatch } from '../../Store/Store';
// import { TemplatePostModel } from '../../types/TemplateType';
// import CategorySelector from './CategorySelector';
// import UseStyleImageUploaderForm from '../style/UseStyleAddNewForm';

// interface ImageUploadFormProps {
//     onClose: () => void;
// }

// const ImageUploadForm: React.FC<ImageUploadFormProps> = ({ onClose }) => {
//     const [imageName, setImageName] = useState<string>('');
//     const [selectedCategory, setSelectedCategory] = useState<number>(0);
//     const [imageFile, setImageFile] = useState<File | null>(null);
//     const { user } = useContext(UserContext);
//     const dispatch = useDispatch<appDispatch>();
//     const handleUpload = () => {
//         if (!imageName || !imageFile || !selectedCategory) {
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'שגיאה',
//                 text: 'נא למלא את כל השדות',
//             });
//             return;
//         }

//         const uploadData: TemplatePostModel = {
//             templateName: imageName,
//             categoryID: selectedCategory,
//             userID: user.id,
//             image: imageFile,
//         };

//         dispatch(addTemplate({ newTemplate: uploadData }))
//         setImageName('');
//         setSelectedCategory(0);
//         setImageFile(null);
//         onClose();
//     };
//     const classes = UseStyleImageUploaderForm();
//     return (
//         <div className={classes.formContainer}>
//             <input
//                 type="text"
//                 placeholder="שם התמונה"
//                 value={imageName}
//                 onChange={(e) => setImageName(e.target.value)}
//                 className={classes.input}
//             />
//             <div>
//                 <small>שים לב! בהעלאת תמונה היא תהפך לציבורית וכולם יוכלו לשתמש בה.</small>
//             </div>
//             <input
//                 type="file"
//                 onChange={(e) => {
//                     if (e.target.files) {
//                         setImageFile(e.target.files[0]);
//                     }
//                 }}
//                 className={classes.input}
//             />
//             <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
//             <div>
//                 <button className={classes.button} onClick={handleUpload}>הוסף</button>
//                 <button className={classes.button} onClick={onClose}>סגור</button>
//             </div>
//         </div>
//     );
// };

// export default ImageUploadForm;
