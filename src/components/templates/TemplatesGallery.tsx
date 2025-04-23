import { useContext, useEffect } from 'react';
import ImageUploadButton from './ImageUploadButton';
import { useDispatch, useSelector } from 'react-redux';
import { appDispatch } from '../../Store/Store';
import { fetchTemplates } from '../../Store/templatesStore-change/TemplatesApi';
import { selectTemplates } from '../../Store/templatesStore-change/TemplatesSlice';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { CategoriesListContext } from '../categories/CategoriesList';
import { selectCategories } from '../../Store/categoriesStore/CategoriesSlice';
import { UserContext } from '../../types/UserTypes';
import { updateGreetingCard } from '../../Store/cardsStore/GreetingCardsApi';
import { CurrentCardContext } from '../../Store/cardReducer/CardReducer';
import TemplatesGrid from './TemplateGrid';
import { GreetingCardPostModel } from '../../types/GreetingCardsTypes';
import LoadingIndicator from '../LoadingIndicator';
import { Template } from '../../types/TemplateType';

const TemplatesGallery = () => {
    const { categoriesList } = useSelector(selectCategories);
    const dispatch: appDispatch = useDispatch<appDispatch>();
    const { templatesList, loading }: { templatesList: Template[]; loading: boolean } = useSelector(selectTemplates);
    const { selectedCategoryId }: { selectedCategoryId: number } = useOutletContext();
    const currentUserId = useContext(UserContext).user.id;
    const filteredTemplates = selectedCategoryId === 1012 ? templatesList
        : templatesList.filter((template:Template) => template.categoryID === selectedCategoryId);
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    const navigate = useNavigate();
    const { cardDispatch } = useContext(CurrentCardContext);
    useEffect(() => {
        if(templatesList.length === 0) {
            dispatch(fetchTemplates());
        }
        // dispatch(fetchTemplates())
    }, [dispatch, templatesList.length]);

    const handleTemplateClick = (templateID: number) => {
        const newCard: GreetingCardPostModel = {
            userID: currentUserId,
            templateID: templateID,
            textID: 0,
            canvasStyle:'',
            categoryID: selectedCategoryId
        };
        cardDispatch({
            type: 'UPDATE_CARD',
            data: {
                userID: currentUserId,
                templateID: templateID,
                categoryID: selectedCategoryId
            }
        });
        dispatch(updateGreetingCard({ id: newCard.templateID, updatedCard: newCard })); //fix it!
        if (lastSegment == 'templates') {
            navigate('/Gallery/content');
        }
    };

    return (
        <>
            <CategoriesListContext.Provider value={categoriesList}>
                <ImageUploadButton />
            </CategoriesListContext.Provider>
            { loading? (
                <LoadingIndicator content='מעלה רקעים...'/>
            ):(
                <TemplatesGrid
                templates={filteredTemplates}
                onTemplateClick={handleTemplateClick}
                isEditable={lastSegment==='templates'}
                currentUserId={currentUserId}
                />
            )}
        </>
    );
};

export default TemplatesGallery;
