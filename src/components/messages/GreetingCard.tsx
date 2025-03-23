import { Box, Typography } from '@mui/material';
import { GreetingMessage } from "../../types/GreetingMessageType";
import DeleteButton from '../templates/DeleteButton';
import { useContext } from 'react';
import { UserContext } from '../../types/UserTypes';


const GreetingCard = ({ message }: { message: GreetingMessage }) => {
    const content: string[] = message.content.split('#');
    const currentUserId = useContext(UserContext).user.id;
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
            <div>
                {content.map((line, index) => (
                    <Typography key={index} variant="body2" sx={{ color: '#25173b', margin: '5px 0' }}>
                        {line}
                    </Typography>
                ))}
            </div>
            <Typography variant="body2" sx={{ color: '#25173b', fontStyle: 'italic' }}>
                {message.signature}
            </Typography>
            <div style={{
                    position: 'absolute',
                    top: '1%', 
                    right: '80%', 
                }} >
            <DeleteButton 
                itemId={message.textID}
                uploaderId={message.userID}
                currentUserId={currentUserId}
            />
            </div>
        </Box>
    );
};

export default GreetingCard;
