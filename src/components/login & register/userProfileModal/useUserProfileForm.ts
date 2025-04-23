import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL, UserContext } from '../../../types/UserTypes';

const useUserProfileForm = (handleClose: () => void) => {
  const { user, userDispatch } = useContext(UserContext);

  const [userName, setUserName] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');

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
      setUserNameError('שם המשתמש חייב להכיל לפחות 3 תווים');
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
        password: '123456', // חובה לפי השרת
      });

      userDispatch({
        type: 'UPDATE_USER',
        payload: response.data,
      });

      Swal.fire({
        icon: 'success',
        title: 'הפרופיל עודכן בהצלחה',
      });

      handleClose();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'שגיאה בעדכון המשתמש',
      });
    } finally {
      setIsLoading(false);
    }
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
  };
};

export default useUserProfileForm;
