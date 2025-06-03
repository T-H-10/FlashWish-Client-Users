import React from 'react';
import { Dialog, DialogContent, DialogTitle, Button, useMediaQuery, useTheme } from '@mui/material';
import { DoorClosedIcon as CloseIcon } from 'lucide-react';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      className="cosmic-dialog"
      PaperProps={{
        className: `cosmic-dialog-paper ${isMobile ? 'mobile' : ''} ${isTablet ? 'tablet' : ''}`
      }}
      fullScreen={isMobile}
      maxWidth="md"
    >
      <div className="modal-cosmic-background">
        <div className="modal-stars"></div>
        <div className="modal-nebula"></div>
      </div>
      
      <DialogTitle className="cosmic-dialog-title">
        עדכון פרטי משתמש
        <Button 
          onClick={handleClose}
          className="cosmic-close-button"
          title="סגור"
        >
          <CloseIcon size={18} />
        </Button>
      </DialogTitle>
      
      <DialogContent className="cosmic-dialog-content">
        <UserProfileForm handleClose={handleClose} />
      </DialogContent>
      
      {/* <div className="cosmic-dialog-actions">
        <Button 
          onClick={handleClose}
          className="cosmic-cancel-button"
        >
          <span className="button-text">ביטול</span>
          <div className="button-glow"></div>
        </Button>
      </div> */}
    </Dialog>
  );
};

export default UserProfileModal;