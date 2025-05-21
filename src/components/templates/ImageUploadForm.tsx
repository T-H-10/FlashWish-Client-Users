import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserContext } from '../../types/UserTypes';
import { appDispatch } from '../../Store/Store';
import { addTemplate } from '../../Store/templatesStore/TemplatesApi';
import { TemplatePostModel } from '../../types/TemplateType';
import CategorySelector from '../CategorySelector';
import '../cssPages/templates/ImageUploadForm.css';
import MyAlert from '../style/MyAlert';

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
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [typeMessage, setTypeMessage] = useState<"error" | "warning" | "info" | "success">("info");

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
      setTitle("האם מלאת את כל השדות?");
      setMessage("יש למלא את כל השדות");
      setTypeMessage("warning");
      setIsAlertOpen(true);

      // Swal.fire({
      //   icon: 'warning',
      //   title: 'יייייי',
      //   text: 'טטטטטטטטטטטטטטט',
      //   background: '#25173b',
      //   color: '#ffffff',
      //   iconColor: '#ff9800',
      //   confirmButtonColor: '#fbbe65',
      // });
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
    
    setTitle("התמונה העלתה בהצלחה");
    setMessage("מעתה כולם יוכלו לצפות בה ולהשתמש בה.");
    setTypeMessage("success");
    setIsAlertOpen(true);
    // Swal.fire({
    //   icon: 'success',
    //   title: 'כככככככככככככככ',
    //   text: 'נננננננננננננננ',
    //   background: '#25173b',
    //   color: '#ffffff',
    //   iconColor: '#4caf50',
    //   confirmButtonColor: '#fbbe65',
    // });
  };

  return (
    <>
    <div className="cosmic-upload-form">
      <h2 className="form-title">הוספת רקע</h2>
      
      <div className="form-group">
        <label className="form-label">שם הרקע</label>
        <input
          type="text"
          placeholder="הכנס תאור תמציתי לרקע שיוצג כשם הרקע"
          value={imageName}
          onChange={(e) => setImageName(e.target.value)}
          className="cosmic-input"
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">קטגוריה</label>
        <CategorySelector 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">קובץ תמונה</label>
        <div className="file-input-container">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
            id="file-input"
          />
          <label htmlFor="file-input" className="file-input-label">
            {imageFile ? imageFile.name : 'בחר קובץ...'}
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
    <MyAlert
                isOpen={isAlertOpen}
                title={title}
                message={message}
                type={typeMessage}
                onConfirm={() => {
                    setIsAlertOpen(false);
                }}/>
    </>
  );
};

export default ImageUploadForm;