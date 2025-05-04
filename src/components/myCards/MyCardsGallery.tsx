import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGreetingCards } from '../../Store/cardsStore/GreetingCardsSlice';
import { fetchGreetingCards } from '../../Store/cardsStore/GreetingCardsApi';
import { appDispatch } from '../../Store/Store';
import { GreetingCard } from '../../types/GreetingCardsTypes';
import CanvasPreview from './CanvasPreview';


const MyCardsGallery = () => {

    const dispatch = useDispatch<appDispatch>();
    const { greetingCardsList, loading } = useSelector(selectGreetingCards);

    useEffect(() => {
        dispatch(fetchGreetingCards());
    }, [dispatch]);

    if (loading) {
        return <p style={{
            marginTop: '100px'
        }}>טוען...</p>;
    }
    if (greetingCardsList.length === 0) {
        return <p style={{
            marginTop: '100px'
        }}>אין כרטיסים זמינים</p>;
    }
    else {
        return (
            <>
                <h1 style={{
                    fontSize: '5rem',
                    textAlign: 'center',
                    margin: '85px 0',

                }}>הכרטיסים המעוצבים שלי</h1>
                <div className="gallery" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap'
                }}>
                    {
                        !loading &&
                        greetingCardsList.map((card: GreetingCard, index: number) => {
                            return (
                                <div key={index} >
                                    {/* // <GreetingCardItem key={card.cardID} card={card} /> */}
                                    {/* // <GreetingCardPreview key={card.cardID} canvasStyle={card.canvasStyle} width={500} height={500} /> */}
                                    <CanvasPreview card={card} key={card.cardID} index={index} />
                                </div>
                            )
                        }
                        )}
                </div>
            </>
        );
    }
};

export default MyCardsGallery;
