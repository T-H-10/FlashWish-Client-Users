import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { IsLogin } from '../../App';
import { CurrentCardContext } from '../../Store/cardReducer/CardReducer';
import { selectCategories } from '../../Store/categoriesStore/CategoriesSlice';
import { appDispatch } from '../../Store/Store';
import { fetchTemplates } from '../../Store/templatesStore/TemplatesApi';
import { selectTemplates } from '../../Store/templatesStore/TemplatesSlice';
import { Template } from '../../types/TemplateType';
import { UserContext } from '../../types/UserTypes';
import { CategoriesListContext } from '../CategoriesList';
import '../cssPages/templates/TemplatesGallery.css';
import ImageUploadButton from './ImageUploadButton';
import LoadingIndicator from '../LoadingIndicator';
import TemplatesGrid from './TemplateGrid';
import EmptyState from '../messages/EmptyState';

const TemplatesGallery = () => {
    const [isLogin] = useContext(IsLogin);
    const { categoriesList } = useSelector(selectCategories);
    const dispatch: appDispatch = useDispatch<appDispatch>();
    const { templatesList, loading } = useSelector(selectTemplates);
    const { selectedCategoryId }: { selectedCategoryId: number } = useOutletContext();
    const currentUserId = useContext(UserContext).user.id;

    const filteredTemplates = selectedCategoryId === 0
        ? templatesList
        : templatesList.filter((template: Template) => template.categoryID === selectedCategoryId);

    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];
    const navigate = useNavigate();
    const { cardDispatch } = useContext(CurrentCardContext);

    useEffect(() => {
        if (templatesList.length === 0) {
            dispatch(fetchTemplates());
        }
    }, [dispatch, templatesList.length]);

    const handleTemplateClick = (templateID: number) => {
        cardDispatch({
            type: 'UPDATE_CARD',
            data: {
                userID: currentUserId,
                templateID: templateID,
                categoryID: selectedCategoryId,
                canvasStyle: ''
            }
        });

        if (lastSegment === 'templates') {
            navigate('/Gallery/content');
        }
    };

    return (
        <div className="cosmic-templates-gallery">
            <div className="gallery-header">
                {/* <h2 className="gallery-title">
                    {selectedCategoryId === null ? 'הכל' : //לטפל ב 0!!!
                        categoriesList.find(c => c.categoryID === selectedCategoryId)?.categoryName || 'כל הרקעים'}
                </h2> */}

                {isLogin && (
                    <CategoriesListContext.Provider value={categoriesList}>
                        <ImageUploadButton />
                    </CategoriesListContext.Provider>
                )}
            </div>

            {loading ? (
                <LoadingIndicator content='מעלה רקעים...' />
            ) : filteredTemplates.length > 0 ? (
                <TemplatesGrid
                    templates={filteredTemplates}
                    onTemplateClick={handleTemplateClick}
                    isEditable={lastSegment === 'templates'}
                    currentUserId={currentUserId || 0}
                />
            ) : (
                <EmptyState
                    message="לא נמצאו רקעים בקטגוריה זו"
                    subMessage={!isLogin ? "התחבר כדי להוסיף רקעים חדשים" : "לחץ על 'העלאת תמונה' כדי להוסיף רקע"}
                />
            )}
        </div>
    );
};

export default TemplatesGallery;