import React, { useState } from 'react';
import CategorySelector from './CategorySelector';
interface ImageUploadFormProps {
    onClose: () => void;
}

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({ onClose }) => {
    const [imageName, setImageName] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleUpload = () => {
        if (!imageName || !imageFile || !selectedCategory) {
            alert("נא למלא את כל השדות");
            return;
        }

        const uploadData = {
            imageName,
            categoryId: selectedCategory,
            imagePath: imageFile.name, // כאן ניתן לשמור את הנתיב או את הקובץ עצמו
        };

        console.log(uploadData);
        // שלח את uploadData לשרת כאן

        // Reset form
        setImageName('');
        setSelectedCategory('');
        setImageFile(null);
        onClose();
    };

    return (
        <div>
            <input
                type="text"
                placeholder="שם התמונה"
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
            />
            <input
                type="file"
                onChange={(e) => {
                    if (e.target.files) {
                        setImageFile(e.target.files[0]);
                    }
                }}
            />
            <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            <button onClick={handleUpload}>שלח</button>
            <button onClick={onClose}>סגור</button>
        </div>
    );
};

export default ImageUploadForm;
