import { useContext, useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import axios from 'axios';
import { API_URL, UserContext } from '../../types/UserTypes';

const UserProfileModal = ({ open, handleClose }:{open: boolean,handleClose:()=>void }) => {
    const { user, userDispatch } = useContext(UserContext);
    const [userName, setUserName] = useState(user.userName);
    const [email, setEmail] = useState(user.email);

    const handleUpdate = async () => {
        try {
            const response = await axios.put(`${API_URL}/Users/${user.id}`, {
                userName,
                email,
            });
            userDispatch({
                type: 'UPDATE_USER',
                payload: response.data,
            });
            handleClose();
        } catch (error) {
            console.error('Error updating user', error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>עדכון פרטי משתמש</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="שם משתמש"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="אימייל"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>ביטול</Button>
                <Button onClick={handleUpdate}>עדכן</Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserProfileModal;
