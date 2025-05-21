import React, { useContext, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_URL, UserContext } from '../../types/UserTypes';
import { IsLogin } from '../../App';
import { CurrentCardContext } from '../../Store/cardReducer/CardReducer';
import Validation from './Validation';
import CosmicFormContainer from './CosmicFormContainer';
import CosmicEmailInput from './CosmicEmailInput';
import CosmicPasswordInput from './CosmicPasswordInput';
import CosmicLoginButton from './CosmicLoginButton';
import '../cssPages/login & register/Registration.css';


import CosmicNameInput from './CosmicNameInput';
import MyAlert from '../style/MyAlert';
const Registration = () => {
    const [userName, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { userDispatch } = useContext(UserContext);
    const [, setIsLogin] = useContext(IsLogin);
    const { cardDispatch } = useContext(CurrentCardContext);
    const navigate = useNavigate();
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [title, setTitle] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [typeMessage, setTypeMessage] = useState<"error" | "warning" | "info" | "success">("info");
    const onConfirmRef = useRef<() => void>(() => { });

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const isValid = await Validation.registration({ userName, email, password });
        if (!isValid) {
            // Swal.fire({
            //     icon: ,
            //     title: ,
            //     text: ',
            //     background: '#25173b',
            //     color: '#ffffff',
            //     iconColor: '#ff6b6b',
            //     confirmButtonColor: '#fbbe65',
            // });
            setTypeMessage('error');
            setTitle('קלט לא חוקי');
            setMessage('אנא הכנס שם, אימייל חוקי וסיסמה עם לפחות 6 תווים.');
            onConfirmRef.current = () => { }
            setIsAlertOpen(true);
            setIsLoading(false);
            return;
        }

        try {
            const res = await axios.post(`${API_URL}/Auth/register`, {
                userName,
                email,
                password
            });

            userDispatch({
                type: 'REGISTER_USER',
                payload: res.data
            });
            setIsLogin(true);
            cardDispatch({
                type: 'CREATE_NEW_CARD'
            });
            setTypeMessage('success');
            setTitle('ברוכים הבאים!');
            setMessage('נרשמת בהצלחה');
            onConfirmRef.current = () => { navigate('/'); }
            setIsAlertOpen(true);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const status = error.response.status;
                // let errorMessage = 'שגיאה לא ידועה.';

                if (status === 400) {
                    setMessage('אנא ודא שהזנת אימייל וסיסמה.');
                    onConfirmRef.current = () => { }
                } else if (status === 409) {
                    setMessage('המשתמש כבר קיים.');
                    onConfirmRef.current = () => {
                        navigate('/login');
                    }
                } else if (status === 500) {
                    setMessage('אירעה שגיאה בשרת. אנא נסה שוב מאוחר יותר.');
                    onConfirmRef.current = () => { }
                }

                // Swal.fire({
                //     icon: 'error',
                //     title: 'שגיאה',
                //     text: errorMessage,
                //     background: '#25173b',
                //     color: '#ffffff',
                //     iconColor: '#ff6b6b',
                //     confirmButtonColor: '#fbbe65',
                // });
                setTypeMessage('error');
                setTitle('שגיאה');
                setIsAlertOpen(true);
            } else {
                // Swal.fire({
                //     icon: 'error',
                //     title: 'שגיאה',
                //     text: ,
                //     background: '#25173b',
                //     color: '#ffffff',
                //     iconColor: '#ff6b6b',
                //     confirmButtonColor: '#fbbe65',
                // });
                setTypeMessage('error');
                setTitle('שגיאה');
                setMessage('אירעה שגיאה לא צפויה. אנא נסה שוב מאוחר יותר.');
                setIsAlertOpen(true);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <CosmicFormContainer>
                <div className="registration-form-header">
                    <h1 className="registration-title">הרשמה</h1>
                    <p className="registration-subtitle">הצטרפו לעולם הברכות הקסום שלנו</p>
                </div>

                <form className="cosmic-registration-form" onSubmit={handleRegister}>
                    <CosmicNameInput userName={userName} setName={setName} />
                    <CosmicEmailInput email={email} setEmail={setEmail} />
                    <CosmicPasswordInput password={password} setPassword={setPassword} />
                    <CosmicLoginButton
                        content='הרשמה'
                        onClick={handleRegister}
                        isLoading={isLoading}
                    />
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

export default Registration;
