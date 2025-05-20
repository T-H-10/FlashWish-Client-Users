import { useState, useEffect, useContext } from 'react';
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
import '../cssPages/creatingCard/CreatingCard.css'

const CreatingCard = () => {
    const { currentCard, cardDispatch } = useContext(CurrentCardContext);
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const dispatch = useDispatch<appDispatch>();
    const { templatesList, loading } = useSelector(selectTemplates);

    useEffect(() => {
        if (templatesList.length === 0) {
            dispatch(fetchTemplates());
        }
    }, [dispatch, templatesList.length]);

    useEffect(() => {
        if (currentCard && currentCard.templateID && templatesList.length > 0) {
            const template = templatesList.find((template: Template) => template.templateID === currentCard.templateID);
            if (template) {
                cardDispatch({
                    type: 'UPDATE_CARD',
                    data: {templateID: template.templateID}
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

    return (
        <div className="cosmic-creating-card">
            <div className="cosmic-background">
                <div className="cosmic-nebula"></div>
                <div className="cosmic-stars">
                    {Array.from({ length: 30 }).map((_, index) => (
                        <div 
                            key={index}
                            className="cosmic-star"
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
            
            <Box
                className="cosmic-content"
                display="flex"
                flexDirection={{ xs: 'column-reverse', md: 'row' }}
                flexWrap={{ xs: 'wrap', md: 'nowrap' }}
                justifyContent="space-between"
                p={2}
                width="100%"
            >
                <Paper className="cosmic-panel categories-panel">
                    <div className="panel-glow"></div>
                    <div className="panel-content">
                        {/* <h2 className="panel-title">בחר קטגוריה</h2> */}
                        <CategoriesList onCategorySelect={setSelectedCategoryId} />
                        <Outlet context={{ selectedCategoryId }} />
                    </div>
                </Paper>
                
                <Paper className="cosmic-panel canvas-panel">
                    <div className="panel-glow"></div>
                    <div className="panel-content">
                        {loading ? (
                            <div className="cosmic-loading">
                                <LoadingIndicator content='' />
                            </div>
                        ) : (
                            <EditableCanvas cardData={initialCardData} />
                        )}
                    </div>
                </Paper>
            </Box>
        </div>
    );
};

export default CreatingCard;
