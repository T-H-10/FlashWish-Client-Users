import { Box, Typography } from '@mui/material';
import { GreetingMessage } from "../../types/GreetingMessageType";


const GreetingCard = ({ message }:{message: GreetingMessage}) => {
    return (
        <Box
            sx={{
                border: '2px solid #25173b',
                borderRadius: '8px',
                padding: '10px',
                margin: '10px',
                backgroundColor: '#f5f5f5',
                position: 'relative',
                width: { xs: '100%', sm: '50%', md: '33.33%', lg: '25%' },
            }}
        >
            <Typography variant="subtitle1" sx={{ color: '#25173b', fontWeight: 'bold' }}>
                {message.title}
            </Typography>
            <Typography variant="body2" sx={{ color: '#25173b', margin: '5px 0' }}>
                {message.content}
            </Typography>
            <Typography variant="body2" sx={{ color: '#25173b', fontStyle: 'italic' }}>
                {message.signature}
            </Typography>
        </Box>
    );
};

export default GreetingCard;
