// import React, { useContext, useState } from 'react';
// import { TextField, Button, InputAdornment, IconButton } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import FormContainer from './FormContainer';
// import { UserContext } from '../../Store/Store';
// import { API_URL, UserType } from '../../Types';
// import { IsLogin } from '../../App';
// import Validation from './Validation';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [, setIsLogin] = useContext(IsLogin);
//     const { userDispatch } = useContext(UserContext);
//     const [showPassword, setShowPassword] = useState(false);

//     const handleClickShowPassword = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleLogin = async (e: React.FormEvent) => {
//         e.preventDefault();

//         const isValid = await Validation.login({ email, password });
//         if (!isValid) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'קלט לא תקין',
//                 text: 'אנא הזן אימייל תקין וסיסמה עם לפחות 6 תווים.',
//             });
//             return;
//         }

//         try {
//             const res = await axios.post<{ user: UserType, token: string }>(API_URL + '/Auth/login', { email, password });
//             console.log(res.data);
//             userDispatch({
//                 type: 'LOGIN_USER',
//                 payload: { user: res.data.user, token: res.data.token }
//             });
//             Swal.fire({
//                 icon: 'success',
//                 title: 'התחברות מוצלחת',
//                 text: '!ברוך הבא',
//             });
//             setIsLogin(true);

//         } catch (e: any) {
//             if (e.response?.status === 401) {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'אופס...',
//                     text: '!אימייל או סיסמה שגויים',
//                 });
//             }
//         }
//     };

//     return (
//         <FormContainer>
//             <>
//                 <TextField
//                     label="Email"
//                     variant="outlined"
//                     margin="normal"
//                     fullWidth
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <TextField
//                     label="Password"
//                     type={showPassword ? 'text' : 'password'}
//                     variant="outlined"
//                     margin="normal"
//                     fullWidth
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     InputProps={{
//                         endAdornment: (
//                             <InputAdornment position="end">
//                                 <IconButton
//                                     onClick={handleClickShowPassword}
//                                     onMouseDown={(event) => event.preventDefault()}
//                                 >
//                                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                                 </IconButton>
//                             </InputAdornment>
//                         ),
//                     }}
//                 />
//                 <Button
//                     variant="contained"
//                     onClick={handleLogin}
//                     fullWidth
//                     sx={{ mt: 2 }}
//                     style={{ backgroundColor: '#25173b' }}
//                 >
//                     התחברות
//                 </Button>
//             </>
//         </FormContainer>
//     );
// };

// export default Login;

// import React, { useContext, useState } from 'react';
// import { TextField, Button } from '@mui/material';
// import Swal from 'sweetalert2';
// import axios from 'axios';
// import FormContainer from './FormContainer';
// import { UserContext } from '../../Store/Store';
// import { API_URL, UserType } from '../../Types';
// import { IsLogin } from '../../App';
// import Validation from './Validation';
// import PasswordInput from './PasswordInput'; // Import the new PasswordInput component

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [, setIsLogin] = useContext(IsLogin);
//     const { userDispatch } = useContext(UserContext);

//     const handleLogin = async (e: React.FormEvent) => {
//         e.preventDefault();

//         const isValid = await Validation.login({ email, password });
//         if (!isValid) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'קלט לא תקין',
//                 text: 'אנא הזן אימייל תקין וסיסמה עם לפחות 6 תווים.',
//             });
//             return;
//         }

//         try {
//             const res = await axios.post<{ user: UserType, token: string }>(API_URL + '/Auth/login', { email, password });
//             console.log(res.data);
//             userDispatch({
//                 type: 'LOGIN_USER',
//                 payload: { user: res.data.user, token: res.data.token }
//             });
//             Swal.fire({
//                 icon: 'success',
//                 title: 'התחברות מוצלחת',
//                 text: '!ברוך הבא',
//             });
//             setIsLogin(true);

//         } catch (e: any) {
//             if (e.response?.status === 401) {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'אופס...',
//                     text: '!אימייל או סיסמה שגויים',
//                 });
//             }
//         }
//     };

//     return (
//         <FormContainer>
//             <>
//                 <TextField
//                     label="Email"
//                     variant="outlined"
//                     margin="normal"
//                     fullWidth
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                 />
//                 <PasswordInput password={password} setPassword={setPassword} /> {/* Use the PasswordInput component */}
//                 <Button
//                     variant="contained"
//                     onClick={handleLogin}
//                     fullWidth
//                     sx={{ mt: 2 }}
//                     style={{ backgroundColor: '#25173b' }}
//                 >
//                     התחברות
//                 </Button>
//             </>
//         </FormContainer>
//     );
// };

// export default Login;

import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import FormContainer from './FormContainer';
import { UserContext } from '../../Store/Store';
import { API_URL, UserType } from '../../Types';
import { IsLogin } from '../../App';
import Validation from './Validation';
import EmailInput from './FormInputs/EmailInput';
import PasswordInput from './FormInputs/PasswordInput';
import LoginButton from './FormInputs/LoginButton';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [, setIsLogin] = useContext(IsLogin);
    const { userDispatch } = useContext(UserContext);

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
            console.log(res.data);
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

        } catch (e: any) {
            if (e.response?.status === 401) {
                Swal.fire({
                    icon: 'error',
                    title: 'אופס...',
                    text: '!אימייל או סיסמה שגויים',
                });
            }
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
