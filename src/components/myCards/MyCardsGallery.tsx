import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectGreetingCards } from '../../Store/cardsStore/GreetingCardsSlice';
import { fetchGreetingCards } from '../../Store/cardsStore/GreetingCardsApi';
import { appDispatch } from '../../Store/Store';
import { GreetingCard } from '../../types/GreetingCardsTypes';
import CanvasPreview from './CanvasPreview';
import '../cssPages/myCards/MyCardsGallery.css';

const MyCardsGallery = () => {
    const dispatch = useDispatch<appDispatch>();
    const { greetingCardsList, loading } = useSelector(selectGreetingCards);

    useEffect(() => {
        dispatch(fetchGreetingCards());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="cosmic-loading">
                <div className="cosmic-loader">
                    <div className="cosmic-loader-orbit">
                        <div className="cosmic-loader-planet"></div>
                    </div>
                    <p className="cosmic-loader-text">טוען...</p>
                </div>
            </div>
        );
    }

    if (greetingCardsList.length === 0) {
        return (
            <div className="cosmic-empty-state">
                <div className="cosmic-empty-icon">
                    <div className="cosmic-empty-star"></div>
                </div>
                <p className="cosmic-empty-text">אין כרטיסים זמינים</p>
            </div>
        );
    }

    return (
        <div className="cosmic-cards-gallery-container">
            <div className="cosmic-background">
                <div className="nebula-layer"></div>
                <div className="stars-layer">
                    {Array.from({ length: 20 }).map((_, index) => (
                        <div 
                            key={index}
                            className="cosmic-particle"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                width: `${Math.random() * 3 + 1}px`,
                                height: `${Math.random() * 3 + 1}px`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${Math.random() * 5 + 5}s`
                            }}
                        />
                    ))}
                </div>
                <div className="cosmic-waves">
                    <div className="cosmic-wave wave1"></div>
                    <div className="cosmic-wave wave2"></div>
                    <div className="cosmic-wave wave3"></div>
                </div>
            </div>
            
            <div className="cosmic-content">
                <h1 className="cosmic-title">הכרטיסים המעוצבים שלי</h1>
                
                <div className="cosmic-cards-grid">
                    {greetingCardsList.map((card: GreetingCard, index: number) => (
                        <div key={index} className="cosmic-card-wrapper">
                            <CanvasPreview card={card} key={card.cardID} index={index} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyCardsGallery;