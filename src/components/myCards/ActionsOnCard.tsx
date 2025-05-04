import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { CurrentCardContext } from '../../Store/cardReducer/CardReducer';
import { useContext } from 'react';
import { GreetingCard } from '../../types/GreetingCardsTypes';
import { useNavigate } from 'react-router-dom';

const ActionsOnCards=({index, card}:{index:number, card:GreetingCard})=>{
    const navigate = useNavigate();
    const { currentCard, cardDispatch } = useContext(CurrentCardContext);
    const handleDelete = (index: number) => {
        console.log(`מחקת את הכרטיס מספר ${index}`);
      };
    
      const handleEdit = (index: number) => {
        cardDispatch({type: 'UPDATE_CARD', data: 
            {userID: card.userID,
             textID: card.textID,
             categoryID: card.categoryID,
             templateID: card.templateID,
             canvasStyle: card.canvasStyle,
            }});
            navigate('/creatingCard');
      };

    return(
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
                onClick={() => handleDelete(index)}
                style={{ cursor: 'pointer', color: 'red', fontSize: '24px' }}
              />
              <EditIcon
                onClick={() => handleEdit(index)}
                style={{ cursor: 'pointer', color: 'blue', fontSize: '24px' }}
              />
            </div>
    )
}
export default ActionsOnCards;