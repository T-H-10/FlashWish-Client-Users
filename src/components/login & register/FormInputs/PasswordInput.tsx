// import { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordInput = ({ password, setPassword }:{password: string, setPassword: Function}) => {
    // const [showPassword, setShowPassword] = useState(false);

    // const handleClickShowPassword = () => {
    //     setShowPassword(!showPassword);
    // };

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
                    <InputAdornment position="end">
                        {/* <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={(event) => event.preventDefault()}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton> */}
                    </InputAdornment>
                ),
            }}
        />
    );
};

export default PasswordInput;
