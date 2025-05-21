import React, { useContext, useRef, useState } from 'react';
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
import MyAlert from '../style/MyAlert';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [, setIsLogin] = useContext(IsLogin);
    const { userDispatch } = useContext(UserContext);
    const navigate = useNavigate();
    const { cardDispatch } = useContext(CurrentCardContext);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [title, setTitle] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [typeMessage, setTypeMessage] = useState<"error" | "warning" | "info" | "success">("info");
    const onConfirmRef = useRef<() => void>(() => {});
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const isValid = await Validation.login({ email, password });
        if (!isValid) {
            setTypeMessage("error");
            setTitle('קלט לא תקין');
            setMessage('אנא הזן אימייל תקין וסיסמה עם לפחות 6 תווים.');
            onConfirmRef.current=()=>{}
            setIsAlertOpen(true);
            setIsLoading(false);
            return;
        }

        try {
            // const checkEmail = await axios.get(
            //    `${API_URL}/Users/email-exists?email=${email}`
            // );
            // if (checkEmail.status!=200) {
            //     navigate('/register')
            // }
            const res = await axios.post<{ user: UserType, token: string }>(
                API_URL + '/Auth/login',
                { email, password }
            );
            userDispatch({
                type: 'LOGIN_USER',
                payload: { user: res.data.user, token: res.data.token }
            });

            setIsLogin(true);
            localStorage.setItem('userId', JSON.stringify(res.data.user.id));
            localStorage.setItem('token', res.data.token);
            cardDispatch({
                type: 'CREATE_NEW_CARD'
            });
            setTitle("ברוך הבא!");
            setMessage('התחברת בהצלחה');
            setTypeMessage("success");
            onConfirmRef.current=()=>{
                navigate('/')
            }
            setIsAlertOpen(true);
        } catch (e: any) {
            // let errorMessage: string;
console.log(e);

            if (e.response?.status === 401) {
                onConfirmRef.current = ()=>{ console.log("in navigate");
                navigate('/register'); 
                }
                setMessage('!אימייל או סיסמה שגויים');
            } else if (e.response?.status === 400) {
                onConfirmRef.current=()=>{}
                setMessage('אימייל וסיסמה הם שדות חובה!');
            } else {
                onConfirmRef.current=()=>{}
                setMessage('ארעה שגיאה בלתי צפויה. אנא נסה שוב מאוחר יותר.');
            }
            setTypeMessage("error");
            setTitle("אופס...");
            setIsAlertOpen(true);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
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
            <MyAlert
                isOpen={isAlertOpen}
                title={title}
                message={message}
                type={typeMessage}
                onConfirm={() => {
                    setIsAlertOpen(false);
                        onConfirmRef.current();
                    
                }}/>
        </>
    );
};

export default Login;
