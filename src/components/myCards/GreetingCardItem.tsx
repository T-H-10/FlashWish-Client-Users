import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { GreetingCard } from '../../types/GreetingCardsTypes';
import { appDispatch } from '../../Store/Store';
import { deleteGreetingCard } from '../../Store/cardsStore/GreetingCardsApi';
import { useState } from 'react';
import GreetingCardPreview from './GreetingCardPreview';

const GreetingCardItem = ({ card }:{card: GreetingCard}) => {
    const dispatch = useDispatch<appDispatch>();
    // const history = useHistory();
    const [showPreview, setShowPreview] = useState(false); // מצב לתצוגת מקדימה

    // const handleEdit = () => {
    //     history.push(`/edit-card/${card.cardID}`);
    // };

    const handleDelete = () => {
        Swal.fire({
            title: 'האם אתה בטוח?',
            text: "לא ניתן לשחזר כרטיס זה לאחר מחיקה!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'כן, מחק את זה!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteGreetingCard(card.cardID));
            }
        });
    };

    return (
        <div className="card-item">
            <div className="card-content">
            <h2>כרטיס ID: {card.cardID}</h2>
                <button onClick={() => setShowPreview(!showPreview)}>
                    {showPreview ? 'סגור תצוגה מקדימה' : 'הצג תצוגה מקדימה'}
                </button>
                {showPreview && <GreetingCardPreview card={card} />} {/* הצגת תצוגת מקדימה */}
               </div>
            {/* <button onClick={handleEdit}>עריכה</button> */}
            <button onClick={handleDelete}>מחק</button>
        </div>
    );
};

export default GreetingCardItem;
