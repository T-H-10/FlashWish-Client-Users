import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserContext } from '../../types/UserTypes';
import { appDispatch } from '../../Store/Store';
import { addGreetingMessage } from '../../Store/messagesStore/GreetingsMessagesApi';
import { GreetingMessagePostModel } from '../../types/GreetingMessageType';
import { Done, Close } from '@mui/icons-material';
import { CategoriesListContext } from '../CategoriesList';
import CategorySelector from '../CategorySelector';
import '../cssPages/messages/GreetingForm.css';
import MyAlert from '../style/MyAlert';

interface GreetingFormProps {
  onClose: () => void;
}

const GreetingForm: React.FC<GreetingFormProps> = ({ onClose }) => {
  const { user } = useContext(UserContext);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [typeMessage, setTypeMessage] = useState<"error" | "warning" | "info" | "success">("info");
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    signature: '',
    userID: user.id,
  });
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const dispatch = useDispatch<appDispatch>();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const validate = () => {
    const { title, content, signature } = formData;
    if (!title || !content || !signature || !selectedCategory) {
      setTitle("שגיאה");
      setMessage("נא למלא את כל השדות");
      setTypeMessage("warning")
      setIsAlertOpen(true);
      return false;
    }
    return true;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const greetingData: GreetingMessagePostModel = {
        ...formData,
        userID: user.id ||0,
        categoryID: selectedCategory
      };
      dispatch(addGreetingMessage(greetingData));
      resetForm();
      onClose();
      
      setTitle('הברכה נשמרה בהצלחה');
      setMessage("");
      setTypeMessage("success")
      setIsAlertOpen(true);
    }
  };
  
  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      signature: '',
      userID: user.id,
    });
    setSelectedCategory(0);
  };

  return (
    <>
    <div className="cosmic-greeting-form">
      <h2 className="form-title">יצירת ברכה חדשה</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">קטגוריה</label>
          <CategoriesListContext.Consumer>
            {(
                // categories
            ) => (
              <CategorySelector 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
              />
            )}
          </CategoriesListContext.Consumer>
        </div>
        
        <div className="form-group">
          <label className="form-label">כותרת</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="cosmic-input"
            placeholder="הזן כותרת לברכה"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">תוכן</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="cosmic-textarea"
            placeholder="הזן את תוכן הברכה"
            rows={6}
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">חתימה</label>
          <input
            type="text"
            name="signature"
            value={formData.signature}
            onChange={handleChange}
            className="cosmic-input"
            placeholder="הזן חתימה"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="cosmic-action-button save">
            <Done className="button-icon" />
            <span>שמור</span>
            <div className="button-glow"></div>
          </button>
          
          <button type="button" className="cosmic-action-button cancel" onClick={onClose}>
            <Close className="button-icon" />
            <span>ביטול</span>
            <div className="button-glow"></div>
          </button>
        </div>
      </form>
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

export default GreetingForm;
