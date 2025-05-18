import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { UserContext } from '../../types/UserTypes';
import { appDispatch } from '../../Store/Store';
import { addGreetingMessage } from '../../Store/messagesStore/GreetingsMessagesApi';
import { GreetingMessagePostModel } from '../../types/GreetingMessageType';
import { Done, Close } from '@mui/icons-material';
import { CategoriesListContext } from '../CategoriesList';
import CategorySelector from '../CategorySelector';
import '../cssPages/messages/GreetingForm.css';

interface GreetingFormProps {
  onClose: () => void;
}

const GreetingForm: React.FC<GreetingFormProps> = ({ onClose }) => {
  const { user } = useContext(UserContext);
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
      Swal.fire({
        icon: 'warning',
        title: 'שגיאה',
        text: 'נא למלא את כל השדות',
        background: '#25173b',
        color: '#ffffff',
        iconColor: '#ff9800',
        confirmButtonColor: '#fbbe65',
      });
      return false;
    }
    return true;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const greetingData: GreetingMessagePostModel = {
        ...formData,
        userID: user.id,
        categoryID: selectedCategory
      };
      dispatch(addGreetingMessage(greetingData));
      resetForm();
      onClose();
      
      Swal.fire({
        icon: 'success',
        title: 'נשמר בהצלחה',
        text: 'הברכה נשמרה בהצלחה',
        background: '#25173b',
        color: '#ffffff',
        iconColor: '#4caf50',
        confirmButtonColor: '#fbbe65',
      });
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
  );
};

export default GreetingForm;

// import React, { useContext, useState } from 'react';
// import Swal from 'sweetalert2';
// import { UserContext } from '../../types/UserTypes';
// import { useDispatch } from 'react-redux';
// import { appDispatch } from '../../Store/Store';
// import { addGreetingMessage } from '../../Store/messagesStore/GreetingsMessagesApi';
// import { GreetingMessagePostModel } from '../../types/GreetingMessageType';
// import CategorySelector from '../CategorySelector';
// import UseStyleAddNewForm from '../style/UseStyleAddNewForm';
// import { IconButton } from '@mui/material';
// import {Done, Close } from '@mui/icons-material';

// interface GreetingFormProps {
//     onClose: () => void;
// }
// const GreetingForm: React.FC<GreetingFormProps> = ({ onClose }) => {
//     const classes = UseStyleAddNewForm();
//     const { user } = useContext(UserContext);
//     const [formData, setFormData] = useState({
//         title: '',
//         content: '',
//         signature: '',
//         userID: user.id,
//     });
//     const [selectedCategory, setSelectedCategory] = useState<number>(0);
//     const dispatch = useDispatch<appDispatch>();
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });

//     };
//     const validate = () => {
//         const { title, content, signature } = formData;
//         if (!title || !content || !signature) {
//             Swal.fire({
//                 icon: 'warning',
//                 title: 'שגיאה',
//                 text: 'נא למלא את כל השדות',
//             });
//             return false;
//         }
//         return true;
//     };
//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (validate()) {
//             const greetingData: GreetingMessagePostModel = {
//                 ...formData,
//                 userID: user.id,
//                 categoryID: selectedCategory
//             };
//             dispatch(addGreetingMessage(greetingData));
//             resetForm();
//             onClose();
//         }
//     };
//     const resetForm = () => {
//         setFormData({
//             title: '',
//             content: '',
//             signature: '',
//             userID: 1, //current userID
//         });
//         setSelectedCategory(0);
//     };
//     return (
//         <div className={classes.formContainer}>
//             <form onSubmit={handleSubmit}>
//                 <CategorySelector selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
//                 <input
//                     type="text"
//                     placeholder="כותרת"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleChange}
//                     required
//                     className={classes.input}
//                 />
//                 <textarea
//                     placeholder="תוכן"
//                     name="content"
//                     value={formData.content}
//                     onChange={handleChange}
//                     required
//                     className={classes.input}
//                 />
//                 <input
//                     type="text"
//                     placeholder="חתימה"
//                     name="signature"
//                     value={formData.signature}
//                     onChange={handleChange}
//                     required
//                     className={classes.input}
//                 />
//                 <div>
// {/*  */}
//                     {/* <button type="submit" className={`${classes.button}`}>הוסף</button> */}
//                     <IconButton type='submit' title="שמור ברכה">
//                         <Done />
//                     </IconButton>
//                     <IconButton onClick={onClose} title="סגור">
//                         <Close />
//                     </IconButton>
//                     {/* <button type="button" onClick={onClose} className={`${classes.button}`}>סגור</button> */}
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default GreetingForm;