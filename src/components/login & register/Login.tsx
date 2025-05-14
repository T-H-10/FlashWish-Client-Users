import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL, UserContext, UserType } from '../../types/UserTypes';
import { IsLogin } from '../../App';
import { CurrentCardContext } from '../../Store/cardReducer/CardReducer';
import Validation from './Validation';
import '../cssPages/login & register/Login.css';
import CosmicFormContainer from './CosmicFormContainer';
import CosmicEmailInput from './CosmicEmailInput';
import CosmicPasswordInput from './CosmicPasswordInput';
import CosmicLoginButton from './CosmicLoginButton';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [, setIsLogin] = useContext(IsLogin);
    const { userDispatch } = useContext(UserContext);
    const navigate = useNavigate();
    const { cardDispatch } = useContext(CurrentCardContext);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const isValid = await Validation.login({ email, password });
        if (!isValid) {
            Swal.fire({
                icon: 'error',
                title: 'קלט לא תקין',
                text: 'אנא הזן אימייל תקין וסיסמה עם לפחות 6 תווים.',
                background: '#25173b',
                color: '#ffffff',
                iconColor: '#ff6b6b',
                confirmButtonColor: '#fbbe65',
            });
            setIsLoading(false);
            return;
        }

        try {
            const res = await axios.post<{ user: UserType, token: string }>(
                API_URL + '/Auth/login', 
                { email, password }
            );
            
            userDispatch({
                type: 'LOGIN_USER',
                payload: { user: res.data.user, token: res.data.token }
            });
            
            Swal.fire({
                icon: 'success',
                title: 'התחברות מוצלחת',
                text: '!ברוך הבא',
                background: '#25173b',
                color: '#ffffff',
                iconColor: '#4caf50',
                confirmButtonColor: '#fbbe65',
            });
            
            setIsLogin(true);
            localStorage.setItem('userId', JSON.stringify(res.data.user.id));
            localStorage.setItem('token', res.data.token);
            
            cardDispatch({
                type: 'CREATE_NEW_CARD'
            });
            
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
                background: '#25173b',
                color: '#ffffff',
                iconColor: '#ff6b6b',
                confirmButtonColor: '#fbbe65',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <CosmicFormContainer>
            <div className="login-form-header">
                <h1 className="login-title">התחברות</h1>
                <p className="login-subtitle">ברוכים הבאים בחזרה לעולם הברכות הקסום</p>
            </div>
            
            <form className="cosmic-login-form" onSubmit={handleLogin}>
                <CosmicEmailInput email={email} setEmail={setEmail} />
                <CosmicPasswordInput password={password} setPassword={setPassword} />
                <CosmicLoginButton content='התחברות' onClick={handleLogin} isLoading={isLoading} />
            </form>
        </CosmicFormContainer>
    );
};

export default Login;
