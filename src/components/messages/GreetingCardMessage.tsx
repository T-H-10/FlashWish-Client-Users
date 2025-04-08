import { Box, Typography } from '@mui/material';
import { GreetingMessage } from "../../types/GreetingMessageType";
import DeleteButton from '../templates/DeleteButton';
import { useContext } from 'react';
import { UserContext } from '../../types/UserTypes';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { CurrentCardContext } from '../../Store/cardReducer/CardReducer';
import { appDispatch } from '../../Store/Store';
import { useDispatch } from 'react-redux';
import { updateGreetingCard } from '../../Store/cardsStore/GreetingCardsApi';
import ChoosingButton from '../ChoosingButton';
import { deleteGreetingMessage } from '../../Store/messagesStore/GreetingsMessagesApi';


const GreetingCardMessage = ({ message }: { message: GreetingMessage }) => {
    const content: string[] = message.content.split('\n');
    const currentUserId = useContext(UserContext).user.id;
    const dispatch = useDispatch<appDispatch>();
    const { selectedCategoryId }: { selectedCategoryId: number } = useOutletContext();
    const navigate = useNavigate();
    const { cardDispatch } = useContext(CurrentCardContext);
    const handleMessageClick = (messageID: number) => {
        const newCard = {
            userID: currentUserId,
            textID: messageID,
            categoryID: selectedCategoryId
        };
        cardDispatch({
            type: 'UPDATE_CARD',
            data: {
                userID: currentUserId,
                textID: messageID,
                categoryID: selectedCategoryId
            }
        });
        dispatch(updateGreetingCard({ id: newCard.textID, greetingCard: { ...newCard, templateID: 0 } }));//fix it!
        navigate('/creatingCard');
    };
    return (
        <>
            <Box
                //  onClick={()=>{handleMessageClick(message.textID)}}
                sx={{
                    cursor: 'pointer',
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
                        deleteFunc={()=>deleteGreetingMessage(message.textID)}
                    />
                    <ChoosingButton onClick={() => { handleMessageClick(message.textID) }} />
                </div>
            </Box>
        </>
    );
};

export default GreetingCardMessage;
