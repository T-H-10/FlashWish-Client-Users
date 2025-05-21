import React from 'react';
import { Button, TextField } from '@mui/material';
import useUserProfileForm from './useUserProfileForm';
import '../cssPages/header/UserProfileForm.css';
import MyAlert from '../style/MyAlert';

interface UserProfileFormProps {
  handleClose: () => void;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ handleClose }) => {
  const {
    userName,
    email,
    handleChange,
    handleSubmit,
    userNameError,
    emailError,
    formSubmitted,
    isLoading,
    alert,
    closeAlert,
  } = useUserProfileForm(handleClose);

  return (
    <>
    <div className="cosmic-form">
      <TextField
        autoFocus
        margin="dense"
        label="שם משתמש"
        type="text"
        fullWidth
        variant="standard"
        name="userName"
        value={userName}
        onChange={handleChange}
        className="cosmic-text-field"
        InputLabelProps={{ className: "cosmic-input-label" }}
        InputProps={{ className: "cosmic-input" }}
      />
      {formSubmitted && userNameError && (
        <small className="cosmic-error">{userNameError}</small>
      )}

      <TextField
        margin="dense"
        label="אימייל"
        type="email"
        fullWidth
        variant="standard"
        name="email"
        value={email}
        onChange={handleChange}
        className="cosmic-text-field"
        InputLabelProps={{ className: "cosmic-input-label" }}
        InputProps={{ className: "cosmic-input" }}
      />
      {formSubmitted && emailError && (
        <small className="cosmic-error">{emailError}</small>
      )}

      <Button
        onClick={handleSubmit}
        disabled={isLoading}
        fullWidth
        className="cosmic-submit-button"
      >
        <span>{isLoading ? 'מעדכן...' : 'עדכון'}</span>
        <div className="button-glow"></div>
        {isLoading && <div className="cosmic-loader"></div>}
      </Button>
    </div>
    {alert.isOpen && (
        <MyAlert
          isOpen={true}
          title={alert.title}
          message={alert.message}
          type={alert.type}
          onConfirm={closeAlert}
        />
      )}
    </>
  );
};

export default UserProfileForm;