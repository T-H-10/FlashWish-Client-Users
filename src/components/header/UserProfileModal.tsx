import React from 'react';
import { Dialog, DialogContent, DialogTitle, Button } from '@mui/material';
import UserProfileForm from './UserProfileForm';
import '../cssPages/header/UserProfileModal.css';

interface UserProfileModalProps {
  open: boolean;
  handleClose: () => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  open,
  handleClose
}) => {
  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      className="cosmic-dialog"
      PaperProps={{
        className: "cosmic-dialog-paper"
      }}
    >
      <div className="modal-cosmic-background">
        <div className="modal-stars"></div>
        <div className="modal-nebula"></div>
      </div>
      
      <DialogTitle className="cosmic-dialog-title">
        עדכון פרטי משתמש
      </DialogTitle>
      
      <DialogContent className="cosmic-dialog-content">
        <UserProfileForm handleClose={handleClose} />
      </DialogContent>
      
      <Button 
        onClick={handleClose}
        fullWidth
        className="cosmic-cancel-button"
      >
        ביטול
        <div className="button-glow"></div>
      </Button>
    </Dialog>
  );
};

export default UserProfileModal;