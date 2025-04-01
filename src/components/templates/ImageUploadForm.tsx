import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { UserContext } from '../../types/UserTypes';
import { useDispatch } from 'react-redux';
import { addTemplate } from '../../Store/templatesStore/TemplatesApi';
import { appDispatch } from '../../Store/Store';
import { TemplatePostModel } from '../../types/TemplateType';
import CategorySelector from './CategorySelector';
import UseStyleImageUploaderForm from '../style/UseStyleAddNewForm';

interface ImageUploadFormProps {
    onClose: () => void;
}

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({ onClose }) => {
    const [imageName, setImageName] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const { user } = useContext(UserContext);
    const dispatch = useDispatch<appDispatch>();
    const handleUpload = () => {
        if (!imageName || !imageFile || !selectedCategory) {
            Swal.fire({
                icon: 'warning',
                title: 'שגיאה',
                text: 'נא למלא את כל השדות',
            });
            return;
        }

        const uploadData: TemplatePostModel = {
            templateName: imageName,
            categoryID: selectedCategory,
            userID: user.id,
            image: imageFile,
        };

        dispatch(addTemplate({ newTemplate: uploadData }))
        setImageName('');
        setSelectedCategory(0);
        setImageFile(null);
        onClose();
    };
    const classes = UseStyleImageUploaderForm();
    return (
        <div className={classes.formContainer}>
            <input
                type="text"
                placeholder="שם התמונה"
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
                className={classes.input}
            />
            <div>
                <small>שים לב! בהעלאת תמונה היא תהפך לציבורית וכולם יוכלו לשתמש בה.</small>
            </div>
            <input
                type="file"
                onChange={(e) => {
                    if (e.target.files) {
                        setImageFile(e.target.files[0]);
                    }
                }}
                className={classes.input}
            />
            <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <div>
                <button className={classes.submitButton} onClick={handleUpload}>הוסף</button>
                <button className={classes.closeButton} onClick={onClose}>סגור</button>
            </div>
        </div>
    );
};

export default ImageUploadForm;
