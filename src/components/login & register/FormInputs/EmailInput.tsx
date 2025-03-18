import { TextField } from '@mui/material';

const EmailInput = ({ email, setEmail }:{email: string, setEmail: Function}) => (
    <TextField
        label="Email"
        variant="outlined"
        margin="normal"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
    />
);

export default EmailInput;
