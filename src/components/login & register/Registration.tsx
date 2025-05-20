import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
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
const Registration = () => {
    const [userName, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { userDispatch } = useContext(UserContext);
    const [, setIsLogin] = useContext(IsLogin);
    const { cardDispatch } = useContext(CurrentCardContext);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const isValid = await Validation.registration({ userName, email, password });
        if (!isValid) {
            Swal.fire({
                icon: 'error',
                title: 'קלט לא חוקי',
                text: 'אנא הכנס שם, אימייל חוקי וסיסמה עם לפחות 6 תווים.',
                background: '#25173b',
                color: '#ffffff',
                iconColor: '#ff6b6b',
                confirmButtonColor: '#fbbe65',
            });
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
            
            Swal.fire({
                icon: 'success',
                title: 'נרשמת בהצלחה',
                text: 'ההרשמה הצליחה!',
                background: '#25173b',
                color: '#ffffff',
                iconColor: '#4caf50',
                confirmButtonColor: '#fbbe65',
            });
            
            setIsLogin(true);
            cardDispatch({
                type: 'CREATE_NEW_CARD'
            });
            
            navigate('/');
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const status = error.response.status;
                let errorMessage = 'שגיאה לא ידועה.';
                
                if (status === 400) {
                    errorMessage = 'אנא ודא שהזנת אימייל וסיסמה.';
                } else if (status === 409) {
                    errorMessage = 'המשתמש כבר קיים.';
                    navigate('/login')
                } else if (status === 500) {
                    errorMessage = 'אירעה שגיאה בשרת. אנא נסה שוב מאוחר יותר.';
                }
                
                Swal.fire({
                    icon: 'error',
                    title: 'שגיאה',
                    text: errorMessage,
                    background: '#25173b',
                    color: '#ffffff',
                    iconColor: '#ff6b6b',
                    confirmButtonColor: '#fbbe65',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'שגיאה',
                    text: 'אירעה שגיאה לא צפויה. אנא נסה שוב מאוחר יותר.',
                    background: '#25173b',
                    color: '#ffffff',
                    iconColor: '#ff6b6b',
                    confirmButtonColor: '#fbbe65',
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
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
    );
};

export default Registration;
