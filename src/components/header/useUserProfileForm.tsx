import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, UserContext } from '../../types/UserTypes';
import MyAlert from '../style/MyAlert';

const useUserProfileForm = (handleClose: () => void) => {
  const { user, userDispatch } = useContext(UserContext);
  const [userName, setUserName] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [alert, setAlert] = useState<{
    isOpen: boolean;
    type: 'success' | 'error';
    title: string;
    message?: string;
  }>({ isOpen: false, type: 'success', title: '' });

  useEffect(() => {
    setUserName(user.userName);
    setEmail(user.email);
    setFormSubmitted(false);
    setUserNameError('');
    setEmailError('');
  }, [user]);

  const validate = () => {
    let valid = true;
    if (userName.trim().length < 3) {
      setUserNameError('שם משתמש חייב להיות באורך של לפחות 3 תווים');
      valid = false;
    } else {
      setUserNameError('');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('אימייל לא תקין');
      valid = false;
    } else {
      setEmailError('');
    }
    return valid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'userName') setUserName(value);
    if (name === 'email') setEmail(value);
  };

  const handleSubmit = async () => {
    setFormSubmitted(true);
    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await axios.put(`${API_URL}/Users/${user.id}`, {
        userName,
        email,
        password: '123456', // Required by the server
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      // console.log(user);
      // console.log(response);
      

      userDispatch({
        type: 'UPDATE_USER',
        payload: response.data,
      });

      // Swal.fire({
      //   icon: 'success',
      //   title: 'הפרטים  שלך עודכנו בהצלחה',
      //   background: '#25173b',
      //   color: '#ffffff',
      //   iconColor: '#fbbe65',
      //   confirmButtonColor: '#fbbe65',
      // });

      setAlert({
        isOpen: true,
        type: 'success',
        title: 'הפרטים שלך עודכנו בהצלחה',
      });
      handleClose();
    } catch (error) {
      console.log(error);
      
      setAlert({
        isOpen: true,
        type: 'error',
        title: 'שגיאה',
        message: 'לא הצלחנו לעדכן את הפרטים שלך. אנא נסה שוב מאוחר יותר.',
      });
      // Swal.fire({
      //   icon: 'error',
      //   title: 'שגיאה',
      //   text: 'לא הצלחנו לעדכן את הפרטים שלך. אנא נסה שוב מאוחר יותר.',
      //   background: '#25173b',
      //   color: '#ffffff',
      //   iconColor: '#ff6b6b',
      //   confirmButtonColor: '#fbbe65',
      // });
    } finally {
      setIsLoading(false);
    }
  };

  const closeAlert = () => {
    setAlert((prev:any) => ({ ...prev, isOpen: false }));
  };

  return {
    userName,
    email,
    userNameError,
    emailError,
    formSubmitted,
    isLoading,
    handleChange,
    handleSubmit,
    alert,
    closeAlert
  };
};

export default useUserProfileForm;