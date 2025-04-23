// // userActions.ts
// // import { loginUser, logoutUser, registerUser, updateUser } from '../Action';
// import { useUser } from './UserContext'; // נניח שזה הקובץ שבו אתה מגדיר את ה-Context
// import { useState, useEffect } from 'react';

// export const useUserActions = () => {
//     const { user, userDispatch } = useUser();
//     const [userData, setUserData] = useState<{ name: string; email: string }>({ name: '', email: '' });

//     useEffect(() => {
//         if (user) {
//             setUserData({ name: user.name, email: user.email });
//         }
//     }, [user]);

//     const handleRegister = async () => {
//         try {
//             const newUser = { ...userData };
//             const response = await userDispatch(registerUser(newUser));
//             const createdUser = response.data; // קבל את המידע מהשרת
//             console.log('User created with ID:', createdUser.id);
//         } catch (error) {
//             console.error('Error creating user:', error);
//         }
//     };
    

//     const handleLogin = () => {
//         const existingUser = { id: 1, ...userData };
//         userDispatch(loginUser(existingUser));
//     };

//     const handleUpdate = () => {
//         userDispatch(updateUser(userData));
//     };

//     const handleLogout = () => {
//         userDispatch(logoutUser());
//     };

//     return { userData, handleRegister, handleLogin, handleUpdate, handleLogout };
// };
