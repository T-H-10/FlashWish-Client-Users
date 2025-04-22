import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import UserProfileForm from './UserProfileForm';

const UserProfileModal = ({
  open,
  handleClose
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>עדכון פרטי משתמש</DialogTitle>
      <DialogContent>
        <UserProfileForm handleClose={handleClose} />
      </DialogContent>
      {/* <DialogActions> */}
        <Button onClick={handleClose}
         fullWidth
        //  sx={{ mt: 2 }}
         >ביטול</Button>
      {/* </DialogActions> */}
    </Dialog>
  );
};

export default UserProfileModal;
