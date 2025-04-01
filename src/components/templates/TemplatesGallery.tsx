import { useContext, useEffect } from 'react';
import { Template } from "../../types/TemplateType";
import { Box, Typography } from '@mui/material';
import StyledImageContainer from '../style/StyledImageContainer';
import ImageUploadButton from './ImageUploadButton';
import { useDispatch, useSelector } from 'react-redux';
import { appDispatch } from '../../Store/Store';
import { fetchTemplates } from '../../Store/templatesStore/TemplatesApi';
import { selectTemplates } from '../../Store/templatesStore/TemplatesSlice';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { CategoriesListContext } from '../categories/CategoriesList';
import { selectCategories } from '../../Store/ctagoriesStore/CategoriesSlice';
import { UserContext } from '../../types/UserTypes';
import DeleteButton from './DeleteButton';
import { updateGreetingCard } from '../../Store/cardsStore/GreetingCardsApi';
import { CurrentCardContext } from '../../Store/cardReducer/CardReducer';

const TemplatesGallery = () => {
    // const { categoryId } = useParams<{ categoryId: string }>();
    // const categoryIdNumber =categoryId?  parseInt(categoryId): 0;
    const { categoriesList } = useSelector(selectCategories);
    const dispatch = useDispatch<appDispatch>();
    const { templatesList, loading } = useSelector(selectTemplates);
    const { selectedCategoryId }: { selectedCategoryId: number } = useOutletContext();
    const currentUserId = useContext(UserContext).user.id;
    const filteredTemplates = selectedCategoryId === 1012 ? templatesList
        : templatesList.filter(template => template.categoryID === selectedCategoryId);
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    const navigate = useNavigate();
    const { cardDispatch } = useContext(CurrentCardContext);
    useEffect(() => {
        dispatch(fetchTemplates())
    }, [dispatch]);

    const handleTemplateClick = (templateID: number) => {
        const newCard = {
            userID: currentUserId,
            templateID: templateID,
            textID: 0,
            categoryID: selectedCategoryId,
        };
        cardDispatch({
            type: 'UPDATE_CARD',
            data: {
                userID: currentUserId,
                templateID: templateID,
                categoryID: selectedCategoryId
            }
        });
        dispatch(updateGreetingCard({ id: newCard.templateID, greetingCard: newCard }));
        if (lastSegment == 'templates') {
            navigate('/Gallery/content');
        }
    };

    return (
        <>
            <CategoriesListContext.Provider value={categoriesList}>
                <ImageUploadButton />
            </CategoriesListContext.Provider>
            {!loading && filteredTemplates.length !== 0 &&
                <Box display="flex" flexWrap="wrap" justifyContent="space-around">
                    {filteredTemplates.map((template: Template) => (
                        <StyledImageContainer
                            key={template.templateID}
                            width={{ xs: '100%', sm: '50%', md: '33.33%', lg: '25%' }}
                            onClick={() => handleTemplateClick(template.templateID)}
                            style={{ cursor: 'pointer' }}>
                            <span style={{
                                height: '100%', margin: '3px', backgroundColor: '#eee',
                                display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }}>
                                <img
                                    src={template.imageURL}
                                    alt={template.templateName}
                                    style={{ maxWidth: '100%', maxHeight: '100%', transition: 'transform 0.3s ease' }}
                                /></span>
                            {lastSegment == 'templates' &&
                                <Typography
                                    className="image-title"
                                    variant="subtitle1"
                                    sx={{
                                        position: 'absolute',
                                        bottom: 10,
                                        left: 10,
                                        color: '#25173b',
                                        backgroundColor: 'transparent',
                                        padding: '5px',
                                        opacity: 1,
                                        transition: 'opacity 0.3s ease',
                                    }}
                                >
                                    {template.templateName}
                                </Typography>}
                            {lastSegment == 'templates' &&
                                <DeleteButton
                                    itemId={template.templateID}
                                    uploaderId={template.userID}
                                    currentUserId={currentUserId}
                                />}
                        </StyledImageContainer>
                    ))}
                </Box>
            }
            {loading &&
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <CircularProgress />
                    <h2 style={{ marginLeft: '10px' }}>מעלה תבניות לרקע...</h2>
                </div>}
        </>
    );
};

export default TemplatesGallery;
