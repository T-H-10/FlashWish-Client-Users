import React, { useContext, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { UserContext } from '../../types/UserTypes';
import { CurrentCardContext } from '../../Store/cardReducer/CardReducer';
import { GreetingMessage } from "../../types/GreetingMessageType";
import { deleteGreetingMessage } from '../../Store/messagesStore/GreetingsMessagesApi';
import DeleteButton from '../templates/DeleteButton';
import '../cssPages/messages/GreetingCardMessage.css';

interface GreetingCardMessageProps {
  message: GreetingMessage;
}

const GreetingCardMessage: React.FC<GreetingCardMessageProps> = ({ message }) => {
  const [, setIsHovered] = useState(false);
  const content: string[] = message.content.split('\n');
  const currentUserId = useContext(UserContext).user.id;
  const { selectedCategoryId }: { selectedCategoryId: number } = useOutletContext();
  const navigate = useNavigate();
  const { cardDispatch } = useContext(CurrentCardContext);
  
  const handleMessageClick = () => {
    cardDispatch({
      type: 'UPDATE_CARD',
      data: {
        userID: currentUserId,
        textID: message.textID,
        categoryID: selectedCategoryId
      }
    });
    navigate('/creatingCard');
  };

  return (
    <div 
      className="cosmic-greeting-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleMessageClick}
    >
      <div className="cosmic-card-background">
        <div className="nebula-layer"></div>
        <div className="stars-layer">
          {Array.from({ length: 5 }).map((_, index) => (
            <div 
              key={index}
              className="cosmic-particle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 3 + 3}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{message.title}</h3>
        <div className="card-body">
          {content?.map((line, index) => (
            <p key={index} className="card-text">{line}</p>
          ))}
        </div>
        <p className="card-signature">{message.signature}</p>
      </div>
      
      <div className="card-overlay">
        <span className="overlay-text">בחר</span>
      </div>
      
      <div className="card-actions">
        <DeleteButton
          uploaderId={message.userID}
          currentUserId={currentUserId}
          deleteFunc={() => deleteGreetingMessage(message.textID)}
        />
      </div>
      
      <div className="card-glow"></div>
      
      <div className="card-decoration">
        <div className="decoration-star ds1"></div>
        <div className="decoration-star ds2"></div>
        <div className="decoration-star ds3"></div>
      </div>
    </div>
  );
};

export default GreetingCardMessage;
