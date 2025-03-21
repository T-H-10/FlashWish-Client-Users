import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import FormContainer from './FormContainer';
import { API_URL, UserContext, UserType } from '../../types/UserTypes';
import { IsLogin } from '../../App';
import Validation from './Validation';
import EmailInput from './FormInputs/EmailInput';
import PasswordInput from './FormInputs/PasswordInput';
import LoginButton from './FormInputs/LoginButton';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, setIsLogin] = useContext(IsLogin);
    const { userDispatch } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const isValid = await Validation.login({ email, password });
        if (!isValid) {
            Swal.fire({
                icon: 'error',
                title: 'קלט לא תקין',
                text: 'אנא הזן אימייל תקין וסיסמה עם לפחות 6 תווים.',
            });
            return;
        }

        try {
            const res = await axios.post<{ user: UserType, token: string }>(API_URL + '/Auth/login', { email, password });
            userDispatch({
                type: 'LOGIN_USER',
                payload: { user: res.data.user, token: res.data.token }
            });
            Swal.fire({
                icon: 'success',
                title: 'התחברות מוצלחת',
                text: '!ברוך הבא',
            });
            setIsLogin(true);
            navigate('/');
        } catch (e: any) {
            let errorMessage: string;
            if (e.response?.status === 401) {
                errorMessage = '!אימייל או סיסמה שגויים';
            } else if (e.response?.status === 400) {
                errorMessage = 'אימייל וסיסמה הם שדות חובה!';
            } else {
                errorMessage = 'ארעה שגיאה בלתי צפויה. אנא נסה שוב מאוחר יותר.';
            }
            Swal.fire({
                icon: 'error',
                title: 'אופס...',
                text: errorMessage,
            });
        }
    };

    return (
        <FormContainer>
            <>
                <EmailInput email={email} setEmail={setEmail} />
                <PasswordInput password={password} setPassword={setPassword} />
                <LoginButton content='התחברות' onClick={handleLogin} />
            </>
        </FormContainer>
    );
};

export default Login;
