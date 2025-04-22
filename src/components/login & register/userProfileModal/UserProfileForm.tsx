import { Button, TextField } from '@mui/material';
import useUserProfileForm from './useUserProfileForm';


const UserProfileForm = ({ handleClose }: { handleClose: () => void }) => {
  const {
    userName,
    email,
    handleChange,
    handleSubmit,
    userNameError,
    emailError,
    formSubmitted,
    isLoading
  } = useUserProfileForm(handleClose);

  return (
    <>
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
      />
      {formSubmitted && userNameError && (
        <small style={{ color: 'red' }}>{userNameError}</small>
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
      />
      {formSubmitted && emailError && (
        <small style={{ color: 'red' }}>{emailError}</small>
      )}

      <Button
        onClick={handleSubmit}
        disabled={isLoading}
        fullWidth
        // sx={{ mt: 2 }}
      >
        {isLoading ? 'מתעדכן...' : 'עדכן'}
      </Button>
      
    </>
  );
};

export default UserProfileForm;
