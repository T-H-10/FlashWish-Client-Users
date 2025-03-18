// const validateEmail = (email: string) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(String(email).toLowerCase());
// };

// const validatePassword = (password: string) => {
//     return password.length >= 6;
// };

// const validateUserName = (userName: string) => {
//     return userName.trim() !== '';
// };

// const Validation = {
//     login: ({ email, password }: { email: string, password: string }) => {
//         const isValid = () => {
//             return validateEmail(email) && validatePassword(password);
//         };

//         return { isValid };
//     },

//     registration: ({ userName, email, password }: { userName: string, email: string, password: string }) => {
//         const isValid = () => {
//             return validateUserName(userName) && validateEmail(email) && validatePassword(password);
//         };

//         return { isValid };
//     }
// };

// export default Validation;

import * as Yup from 'yup';

const userSchema = Yup.object().shape({
    userName: Yup.string()
        .trim()
        .required('שם משתמש הוא דרישה חובה'),
    email: Yup.string()
        .email('כתובת האימייל אינה תקינה')
        .required('כתובת אימייל היא דרישה חובה'),
    password: Yup.string()
        .min(6, 'סיסמה חייבת להיות באורך של לפחות 6 תווים')
        .required('סיסמה היא דרישה חובה'),
});

const Validation = {
    login: (data: { email: string, password: string }) => {
        const loginData = {
            email: data.email,
            password: data.password,
        };
        return userSchema.pick(['email', 'password']).isValid(loginData);
    },

    registration: (data: { userName: string, email: string, password: string }) => {
        return userSchema.isValid(data);
    }
};

export default Validation;

