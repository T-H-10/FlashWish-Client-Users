import React, { useEffect } from 'react';
import { GreetingCard } from '../../types/GreetingCardsTypes';
import EditableCanvas from '../creatingCard/EditableCanvas';

interface GreetingCardPreviewProps {
    card: GreetingCard;
}

const GreetingCardPreview: React.FC<GreetingCardPreviewProps> = ({ card }) => {
    const canvasJson = card.canvasStyle; // כאן נניח שה-JSON של הקנבס נמצא בשדה canvasStyle של הכרטיס

    useEffect(() => {
        // אם צריך, ניתן להוסיף לוגיקה נוספת כאן
    }, [card]);

    return (
        <div>
            <h2>תצוגה מקדימה של הכרטיס ID: {card.cardID}</h2>
            <EditableCanvas imageUrl={canvasJson} />
        </div>
    );
};

export default GreetingCardPreview;
