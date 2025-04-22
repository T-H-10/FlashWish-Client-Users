// import { useContext, useState, useEffect } from 'react';
// import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
// import axios from 'axios';
// import { API_URL, UserContext } from '../../types/UserTypes';
// import Swal from 'sweetalert2';

// const UserProfileModal = ({ open, handleClose }: { open: boolean, handleClose: () => void }) => {
//     const { user, userDispatch } = useContext(UserContext);

//     const [userName, setUserName] = useState(user.userName);
//     const [email, setEmail] = useState(user.email);
//     const [isLoading, setIsLoading] = useState(false);
//     const [formSubmitted, setFormSubmitted] = useState(false);

//     const [userNameError, setUserNameError] = useState('');
//     const [emailError, setEmailError] = useState('');

//     const validate = () => {
//         let valid = true;

//         if (userName.trim().length < 3) {
//             setUserNameError('שם המשתמש חייב להכיל לפחות 3 תווים');
//             valid = false;
//         } else {
//             setUserNameError('');
//         }

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(email)) {
//             setEmailError('אימייל לא תקין');
//             valid = false;
//         } else {
//             setEmailError('');
//         }

//         return valid;
//     };

//     const updateUserProfile = async () => {
//         setFormSubmitted(true); // נלחץ "עדכן"
//         if (!validate()) return;

//         setIsLoading(true);

//         try {
//             const response = await axios.put(`${API_URL}/Users/${user.id}`, {
//                 userName,
//                 email,
//                 password: "123456", // שדה חובה בשרת
//             });

//             userDispatch({
//                 type: 'UPDATE_USER',
//                 payload: response.data,
//             });

//             Swal.fire({
//                 icon: 'success',
//                 title: 'הפרופיל עודכן בהצלחה',
//             });

//             handleClose();
//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'שגיאה בעדכון המשתמש',
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         if (name === 'userName') setUserName(value);
//         if (name === 'email') setEmail(value);
//     };

//     useEffect(() => {
//         if (open) {
//             setUserName(user.userName);
//             setEmail(user.email);
//             setFormSubmitted(false);
//             setUserNameError('');
//             setEmailError('');
//         }
//     }, [open, user]);

//     return (
//         <Dialog open={open} onClose={handleClose}>
//             <DialogTitle>עדכון פרטי משתמש</DialogTitle>
//             <DialogContent>
//                 <TextField
//                     autoFocus
//                     margin="dense"
//                     label="שם משתמש"
//                     type="text"
//                     fullWidth
//                     variant="standard"
//                     name="userName"
//                     value={userName}
//                     onChange={handleChange}
//                 />
//                 {formSubmitted && userNameError && (
//                     <small style={{ color: 'red' }}>{userNameError}</small>
//                 )}

//                 <TextField
//                     margin="dense"
//                     label="אימייל"
//                     type="email"
//                     fullWidth
//                     variant="standard"
//                     name="email"
//                     value={email}
//                     onChange={handleChange}
//                 />
//                 {formSubmitted && emailError && (
//                     <small style={{ color: 'red' }}>{emailError}</small>
//                 )}
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={handleClose} disabled={isLoading}>
//                     ביטול
//                 </Button>
//                 <Button onClick={updateUserProfile} disabled={isLoading}>
//                     {isLoading ? 'מתעדכן...' : 'עדכן'}
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// export default UserProfileModal;
