import { Button } from '@mui/material';

const LoginButton = ({content, onClick }:{content:string, onClick: (e: React.FormEvent) => Promise<void>}) => (
    <Button
        variant="contained"
        onClick={onClick}
        fullWidth
        sx={{ mt: 2 }}
        style={{ backgroundColor: '#25173b' }}
    >
        {content}
    </Button>
);

export default LoginButton;