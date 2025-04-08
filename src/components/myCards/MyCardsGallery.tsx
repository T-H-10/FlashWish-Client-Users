import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGreetingCards } from '../../Store/cardsStore/GreetingCardsSlice';
import { fetchGreetingCards } from '../../Store/cardsStore/GreetingCardsApi';
import { appDispatch } from '../../Store/Store';
import GreetingCardItem from './GreetingCardItem';
import { GreetingCard } from '../../types/GreetingCardsTypes';


const MyCardsGallery = () => {
    const dispatch = useDispatch<appDispatch>();
    const { greetingCardsList, loading } = useSelector(selectGreetingCards);

    useEffect(() => {
        dispatch(fetchGreetingCards());
    }, [dispatch]);

    if (loading) {
        return <p>טוען...</p>;
    }

    return (
        <div>
            <h1>הכרטיסים המעוצבים שלי</h1>
            <div className="gallery">
                {greetingCardsList.map((card: GreetingCard) => (
                    <GreetingCardItem key={card.cardID} card={card} />
                ))}
            </div>
        </div>
    );
};

export default MyCardsGallery;
