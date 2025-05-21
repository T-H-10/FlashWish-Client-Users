import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { CurrentCardContext } from '../../Store/cardReducer/CardReducer';
import { GreetingCard } from '../../types/GreetingCardsTypes';
import { appDispatch } from '../../Store/Store';
import { deleteGreetingCard } from '../../Store/cardsStore/GreetingCardsApi';
import '../cssPages/myCards/ActionsOnCards.css';
import MyAlert from '../style/MyAlert';

const ActionsOnCards = ({ card }: { card: GreetingCard }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<appDispatch>();
  const { cardDispatch } = useContext(CurrentCardContext);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [typeMessage, setTypeMessage] = useState<"error" | "warning" | "info" | "success">("info");

  const handleDelete = () => {
    cardDispatch({
      type: 'DELETE_CARD',
      id: card.cardID
    });

    try {
      dispatch(deleteGreetingCard(card.cardID));
      setTitle('הכרטיס נמחק בהצלחה!');
      setMessage("");
      setTypeMessage("success");
    } catch {
      setTitle( 'שגיאה');
      setMessage('שגיאה במחיקת הכרטיס. אנא נסה שוב מאוחר יותר.');
      setTypeMessage("error");
    }
    finally{
      setIsAlertOpen(true);
    }
  };

  const handleEdit = () => {
    cardDispatch({
      type: 'UPDATE_CARD',
      data: {
        cardID: card.cardID,
        userID: card.userID,
        textID: card.textID,
        categoryID: card.categoryID,
        templateID: card.templateID,
        canvasStyle: card.canvasStyle,
      }
    });

    navigate('/creatingCard');
  };

  return (
    <>
      <div className="cosmic-actions">
        <button
          className="cosmic-action-button cosmic-delete-button"
          onClick={handleDelete}
          aria-label="מחק כרטיס"
        >
          <DeleteIcon className="cosmic-action-icon" />
          <span className="cosmic-action-tooltip">מחק</span>
        </button>

        <button
          className="cosmic-action-button cosmic-edit-button"
          onClick={handleEdit}
          aria-label="ערוך כרטיס"
        >
          <EditIcon className="cosmic-action-icon" />
          <span className="cosmic-action-tooltip">ערוך</span>
        </button>
      </div>
      <MyAlert
        isOpen={isAlertOpen}
        title={title}
        message={message}
        type={typeMessage}
        onConfirm={() => {
          setIsAlertOpen(false);
        }} />
    </>
  );
};

export default ActionsOnCards;