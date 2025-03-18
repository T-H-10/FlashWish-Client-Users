import { TextField } from '@mui/material';

const NameInput = ({ userName, setName }:{userName: string, setName: Function}) => (
    <TextField
        label="Name"
        variant="outlined"
        margin="normal"
        fullWidth
        value={userName}
        onChange={(e) => setName(e.target.value)}
    />
);

export default NameInput;
