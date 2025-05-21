import { TextField, InputAdornment } from '@mui/material';

const PasswordInput = ({ password, setPassword }:{password: string, setPassword: Function}) => {

    return (
        <TextField
            label="Password"
            type='password'
            // type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end" />
                ),
            }}
        />
    );
};

export default PasswordInput;
