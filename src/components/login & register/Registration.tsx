import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import FormContainer from './FormContainer';
import { API_URL, UserContext } from '../../types/UserTypes';
import Validation from './Validation';
import { IsLogin } from '../../App';
import EmailInput from './FormInputs/EmailInput';
import PasswordInput from './FormInputs/PasswordInput'; 
import LoginButton from './FormInputs/LoginButton'; 
import NameInput from './FormInputs/NameInput'; 
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [userName, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { userDispatch } = useContext(UserContext);
    const [, setIsLogin] = useContext(IsLogin);
    const navigate = useNavigate();
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = await Validation.registration({ userName, email, password });
        if (!isValid) {
            Swal.fire({
                icon: 'error',
                title: 'קלט לא חוקי',
                text: 'אנא הכנס שם, אימייל חוקי וסיסמה עם לפחות 6 תווים.',
            });
            return;
        }

        try {
            const res = await axios.post(`${API_URL}/Auth/register`, { userName, email, password });
            const token: string = res.data.token;
            userDispatch({
                type: 'REGISTER_USER',
                payload: res.data
            });
            Swal.fire({
                icon: 'success',
                title: 'נרשמת בהצלחה',
                text: 'ההרשמה הצליחה!',
            });
            setIsLogin(true);
            navigate('/');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const status = error.response.status;
                let errorMessage = 'שגיאה לא ידועה.';
                if (status === 400) {
                    errorMessage = 'אנא ודא שהזנת אימייל וסיסמה.';
                } else if (status === 409) {
                    errorMessage = 'המשתמש כבר קיים.';
                } else if (status === 500) {
                    errorMessage = 'אירעה שגיאה בשרת. אנא נסה שוב מאוחר יותר.';
                }
                Swal.fire({
                    icon: 'error',
                    title: 'שגיאה',
                    text: errorMessage,
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'שגיאה',
                    text: 'אירעה שגיאה לא צפויה. אנא נסה שוב מאוחר יותר.',
                });
            }
        }
    };

    return (
        <FormContainer>
            <NameInput userName={userName} setName={setName} />
            <EmailInput email={email} setEmail={setEmail} />
            <PasswordInput password={password} setPassword={setPassword} />
            <LoginButton content='הרשמה' onClick={handleRegister} />
        </FormContainer>
    );
};

export default Registration;
