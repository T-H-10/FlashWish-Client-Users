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
  const {currentCard ,cardDispatch } = useContext(CurrentCardContext);
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [typeMessage, setTypeMessage] = useState<"error" | "warning" | "info" | "success">("info");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleDelete = () => {
    setIsConfirmOpen(true);
  }

  const handleConfirmDelete = () => {
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
      setTitle('שגיאה');
      setMessage('שגיאה במחיקת הכרטיס. אנא נסה שוב מאוחר יותר.');
      setTypeMessage("error");
    }
    finally {
      setIsAlertOpen(true);
    }
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
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
    console.log("Editing card with ID:", card);
    console.log("Current card state before edit:", currentCard);
    
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

      {isConfirmOpen && (
        <MyAlert
          isOpen={true}
          title= 'האם אתה בטוח?'
          message= 'לא תוכל לשחזר לאחר המחיקה!'
          type= 'warning'
          confirmText= 'כן, מחק את זה!'
          cancelText= 'לא, השאר את זה'
          onConfirm={handleConfirmDelete}
          onCancel={handleCancel}
        />
      )}

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