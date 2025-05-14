import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { CurrentCardContext } from '../../Store/cardReducer/CardReducer';
import { useContext } from 'react';
import { GreetingCard } from '../../types/GreetingCardsTypes';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { appDispatch } from '../../Store/Store';
import { deleteGreetingCard } from '../../Store/cardsStore/GreetingCardsApi';
import Swal from 'sweetalert2';

const ActionsOnCards = ({ index, card }: { index: number, card: GreetingCard }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<appDispatch>();
  const { currentCard, cardDispatch } = useContext(CurrentCardContext);
  const handleDelete = () => {
    cardDispatch({
      type: 'DELETE_CARD',
      id: card.cardID
    })
    try{
      dispatch(deleteGreetingCard(card.cardID));
      Swal.fire({ icon: 'success', title: 'הכרטיס נמחק בהצלחה!' });
    } catch{
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: 'שגיאה במחיקת הכרטיס. אנא נסה שוב מאוחר יותר.',
    });
    }
  };

  const handleEdit = () => {
    cardDispatch({
      type: 'UPDATE_CARD',
      data:
      {
        cardID: card.cardID,
        userID: card.userID,
        textID: card.textID,
        categoryID: card.categoryID,
        templateID: card.templateID,
        canvasStyle: card.canvasStyle,
      }
    });
    console.log(currentCard);
    
    navigate('/creatingCard');
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '30px',
        right: '10px',
        display: 'flex',
        gap: '10px',
        opacity: 1,
        transition: 'opacity 0.2s ease',
      }}
    >
      <DeleteIcon
        onClick={() => handleDelete()}
        style={{ cursor: 'pointer', color: 'red', fontSize: '24px' }}
      />
      <EditIcon
        onClick={() => handleEdit()}
        style={{ cursor: 'pointer', color: 'blue', fontSize: '24px' }}
      />
    </div>
  )
}
export default ActionsOnCards;