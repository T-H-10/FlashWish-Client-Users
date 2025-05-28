import { useState, useEffect, useContext, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Box, Paper } from '@mui/material';
import { CurrentCardContext } from '../../Store/cardReducer/CardReducer';
import { appDispatch } from '../../Store/Store';
import { fetchTemplates } from '../../Store/templatesStore/TemplatesApi';
import { selectTemplates } from '../../Store/templatesStore/TemplatesSlice';
import { initialGreetingCardState } from '../../types/GreetingCardsTypes';
import { Template } from '../../types/TemplateType';
import CategoriesList from '../CategoriesList';
import LoadingIndicator from '../LoadingIndicator';
import EditableCanvas from './editCanvas/EditableCanvas';
import '../cssPages/creatingCard/CreatingCard.css';

const CreatingCard = () => {
    const { currentCard, cardDispatch } = useContext(CurrentCardContext);
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const dispatch = useDispatch<appDispatch>();
    const { templatesList, loading } = useSelector(selectTemplates);

    useEffect(() => {
        if (templatesList.length === 0 && !loading) {
            dispatch(fetchTemplates());
        }
    }, [dispatch, templatesList.length]);

    useEffect(() => {
        if (currentCard && currentCard.templateID && templatesList.length > 0) {
            const template = templatesList.find((template: Template) => template.templateID === currentCard.templateID);
            if (template) {
                cardDispatch({
                    type: 'UPDATE_CARD',
                    data: { templateID: template.templateID }
                });
            }
        }
    }, [currentCard.templateID, templatesList, cardDispatch]);

    const getInitialContent = () => {
        if (!currentCard || !currentCard.templateID) {
            return initialGreetingCardState;
        } else {
            return currentCard;
        }
    };

    const initialCardData = getInitialContent();

    const stars = useMemo(() => (
        Array.from({ length: 50 }).map((_, index) => ({
            id: index,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${Math.random() * 3 + 1}px`,
            delay: `${Math.random() * 5}s`,
            duration: `${Math.random() * 5 + 5}s`
        }))
    ), []);

    return (
        <div className="cosmic-creating-card">
            {/* Cosmic Background */}
            <div className="cosmic-background">
                <div className="cosmic-nebula"></div>
                <div className="cosmic-stars">
                    {stars.map(star => (
                        <div
                            key={star.id}
                            className="cosmic-star"
                            style={{
                                top: star.top,
                                left: star.left,
                                width: star.size,
                                height: star.size,
                                animationDelay: star.delay,
                                animationDuration: star.duration
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

            {/* Main Content */}
            <div className="cosmic-content-wrapper">
                <Box
                    className="cosmic-content"
                    display="flex"
                    flexDirection={{ xs: 'column', md: 'row-reverse' }}
                    gap={3}
                    width="100%"
                >
                    {/* Canvas Panel - Shown first on mobile */}
                    <div className="canvas-panel-wrapper">
                        <Paper className="cosmic-panel canvas-panel" elevation={6}>
                            <div className="panel-glow"></div>
                            <div className="panel-content">
                                <h2 className="panel-title">עיצוב הכרטיס</h2>
                                {loading ? (
                                    <div className="cosmic-loading">
                                        <LoadingIndicator content='טוען' />
                                    </div>
                                ) : (
                                    <div className="canvas-container">
                                        <EditableCanvas cardData={initialCardData} />
                                    </div>
                                )}
                            </div>
                        </Paper>
                    </div>

                    {/* Categories Panel */}
                    <Paper className="cosmic-panel categories-panel" elevation={6}>
                        <div className="panel-glow"></div>
                        <div className="panel-content">
                            {/* <h2 className="panel-title">בחר קטגוריה</h2> */}
                            <div className="categories-container">
                                <CategoriesList onCategorySelect={setSelectedCategoryId} />
                                <Outlet context={{ selectedCategoryId }} />
                            </div>
                        </div>
                    </Paper>
                </Box>
            </div>
        </div>
    );
};

export default CreatingCard;
