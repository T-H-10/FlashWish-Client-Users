import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { CurrentCardContext } from '../../Store/cardReducer/CardReducer';
import { GreetingCard } from '../../types/GreetingCardsTypes';
import { appDispatch } from '../../Store/Store';
import { deleteGreetingCard } from '../../Store/cardsStore/GreetingCardsApi';
import Swal from 'sweetalert2';
import '../cssPages/myCards/ActionsOnCards.css';

const ActionsOnCards = ({ card }: { card: GreetingCard }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<appDispatch>();
  const { cardDispatch } = useContext(CurrentCardContext);
  
  const handleDelete = () => {
    cardDispatch({
      type: 'DELETE_CARD',
      id: card.cardID
    });
    
    try {
      dispatch(deleteGreetingCard(card.cardID));
      Swal.fire({ 
        icon: 'success', 
        title: 'הכרטיס נמחק בהצלחה!',
        background: 'rgba(10, 10, 42, 0.95)',
        color: '#ffffff',
        confirmButtonColor: '#fbbd65'
      });
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'שגיאה',
        text: 'שגיאה במחיקת הכרטיס. אנא נסה שוב מאוחר יותר.',
        background: 'rgba(10, 10, 42, 0.95)',
        color: '#ffffff',
        confirmButtonColor: '#fbbd65'
      });
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
  );
};

export default ActionsOnCards;

// import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
// import { CurrentCardContext } from '../../Store/cardReducer/CardReducer';
// import { useContext } from 'react';
// import { GreetingCard } from '../../types/GreetingCardsTypes';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { appDispatch } from '../../Store/Store';
// import { deleteGreetingCard } from '../../Store/cardsStore/GreetingCardsApi';
// import Swal from 'sweetalert2';

// const ActionsOnCards = ({ card }: { card: GreetingCard }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch<appDispatch>();
//   const { currentCard, cardDispatch } = useContext(CurrentCardContext);
//   const handleDelete = () => {
//     cardDispatch({
//       type: 'DELETE_CARD',
//       id: card.cardID
//     })
//     try{
//       dispatch(deleteGreetingCard(card.cardID));
//       Swal.fire({ icon: 'success', title: 'הכרטיס נמחק בהצלחה!' });
//     } catch{
//       Swal.fire({
//         icon: 'error',
//         title: 'שגיאה',
//         text: 'שגיאה במחיקת הכרטיס. אנא נסה שוב מאוחר יותר.',
//     });
//     }
//   };

//   const handleEdit = () => {
//     cardDispatch({
//       type: 'UPDATE_CARD',
//       data:
//       {
//         cardID: card.cardID,
//         userID: card.userID,
//         textID: card.textID,
//         categoryID: card.categoryID,
//         templateID: card.templateID,
//         canvasStyle: card.canvasStyle,
//       }
//     });
//     console.log(currentCard);
    
//     navigate('/creatingCard');
//   };

//   return (
//     <div
//       style={{
//         position: 'absolute',
//         top: '30px',
//         right: '10px',
//         display: 'flex',
//         gap: '10px',
//         opacity: 1,
//         transition: 'opacity 0.2s ease',
//       }}
//     >
//       <DeleteIcon
//         onClick={() => handleDelete()}
//         style={{ cursor: 'pointer', color: 'red', fontSize: '24px' }}
//       />
//       <EditIcon
//         onClick={() => handleEdit()}
//         style={{ cursor: 'pointer', color: 'blue', fontSize: '24px' }}
//       />
//     </div>
//   )
// }
// export default ActionsOnCards;