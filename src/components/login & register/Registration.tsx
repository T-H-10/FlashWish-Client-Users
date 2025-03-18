// import React, { useContext, useState } from 'react';
// import { TextField, Button } from '@mui/material';
// import axios from 'axios';
// import Swal from 'sweetalert2';
// import FormContainer from './FormContainer';
// import { UserContext } from '../../Store/Store';
// import { API_URL } from '../../Types';
// import Validation from './Validation';
// import { IsLogin } from '../../App';

// const Registration = () => {
//     const [userName, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const { userDispatch } = useContext(UserContext);
//     const [, setIsLogin] = useContext(IsLogin);
//     const handleRegister = async (e: React.FormEvent) => {
//         e.preventDefault();

//         const isValid  = await Validation.registration({ userName, email, password });
//         if (!isValid) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'קלט לא חוקי',
//                 text: 'אנא הכנס שם, אימייל חוקי וסיסמה עם לפחות 6 תווים.',
//             });
//             return;
//         }

//         try {
//             const res = await axios.post(`${API_URL}/Auth/register`, { userName, email, password });
//             console.log(res.data);
//             const token: string= res.data.token
//             userDispatch({
//                 type: 'REGISTER_USER',
//                 payload: { user: res.data.user , token}
//             });
//             Swal.fire({
//                 icon: 'success',
//                 title: 'נרשמת בהצלחה',
//                 text: 'ההרשמה הצליחה!',
//             });
//             setIsLogin(true);
//         } catch (e: any) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'שגיאה',
//                 text: 'ההרשמה נכשלה!',
//             });
//         }
//     };

//     return (
//         <FormContainer>
//             <TextField
//                 label="Name"
//                 variant="outlined"
//                 margin="normal"
//                 fullWidth
//                 value={userName}
//                 onChange={(e) => setName(e.target.value)}
//             />
//             <TextField
//                 label="Email"
//                 variant="outlined"
//                 margin="normal"
//                 fullWidth
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//             />
//             <TextField
//                 label="Password"
//                 type="password"
//                 variant="outlined"
//                 margin="normal"
//                 fullWidth
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//             />
//             <Button
//                 variant="contained"
//                 onClick={handleRegister}
//                 fullWidth
//                 sx={{ mt: 2 }}
//                 style={{ backgroundColor: '#25173b' }}
//             >
//                 הרשמה
//             </Button>
//         </FormContainer>
//     );
// };

// export default Registration;

import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import FormContainer from './FormContainer';
import { UserContext } from '../../Store/Store';
import { API_URL } from '../../Types';
import Validation from './Validation';
import { IsLogin } from '../../App';
import EmailInput from './FormInputs/EmailInput'; // Import EmailInput
import PasswordInput from './FormInputs/PasswordInput'; // Import PasswordInput
import LoginButton from './FormInputs/LoginButton'; // Import LoginButton
import NameInput from './FormInputs/NameInput'; // Import NameInput

const Registration = () => {
    const [userName, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { userDispatch } = useContext(UserContext);
    const [, setIsLogin] = useContext(IsLogin);

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
            console.log(res.data);
            const token: string = res.data.token;
            userDispatch({
                type: 'REGISTER_USER',
                payload: { user: res.data.user, token }
            });
            Swal.fire({
                icon: 'success',
                title: 'נרשמת בהצלחה',
                text: 'ההרשמה הצליחה!',
            });
            setIsLogin(true);
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
