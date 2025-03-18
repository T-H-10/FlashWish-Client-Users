import { Container, Box } from '@mui/material';

const FormContainer = ({ children }:{children:React.ReactNode}) => {
    return (
        <Container maxWidth="sm" sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh' 
        }}>
            <Box display="flex" 
                flexDirection="column" 
                alignItems="center"
                textAlign="center">
                {children }
            </Box>
        </Container>
    );
};

export default FormContainer;




