import { useEffect } from 'react';
import { Template } from "../../types/TemplateType";
import { Box, Typography } from '@mui/material';
import StyledImageContainer from '../style/StyledImageContainer';
import ImageUploadButton from './ImageUploadButton';
import { useDispatch, useSelector } from 'react-redux';
import { appDispatch } from '../../Store/Store';
import { fetchTemplates } from '../../Store/templatesStore/TemplatesApi';
import { selectTemplates } from '../../Store/templatesStore/TemplatesSlice';
import CircularProgress from '@mui/material/CircularProgress';
import { useOutletContext } from 'react-router-dom';
import { CategoriesListContext } from '../categories/CategoriesList';
import { selectCategories } from '../../Store/ctagoriesStore/CategoriesSlice';

const TemplatesGallery = () => {
    // const { categoryId } = useParams<{ categoryId: string }>();
    // const categoryIdNumber =categoryId?  parseInt(categoryId): 0;
    const { categoriesList } = useSelector(selectCategories);
    const dispatch = useDispatch<appDispatch>();
    const { templatesList, loading } = useSelector(selectTemplates);
    const {selectedCategoryId}:{selectedCategoryId: number} = useOutletContext();
    const filteredTemplates= selectedCategoryId===0? templatesList
         : templatesList.filter(template=> template.categoryID===selectedCategoryId);
    useEffect(() => {      
        dispatch(fetchTemplates())        
    }, [dispatch]);
    return (
        <>
        <CategoriesListContext.Provider value={categoriesList}>
            <ImageUploadButton/>
        </CategoriesListContext.Provider>
            <Box display="flex" flexWrap="wrap" justifyContent="space-around">
                {filteredTemplates.map((template: Template) => (
                    <StyledImageContainer
                        key={template.templateID}
                        width={{ xs: '100%', sm: '50%', md: '33.33%', lg: '25%' }}
                    >
                        <span>
                        <img
                            src={template.imageURL}
                            alt={template.templateName}
                            style={{ maxWidth: '100%', maxHeight: '100%', transition: 'transform 0.3s ease' }}
                        /></span>
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
                                borderRadius: '5px',
                                opacity: 1,
                                transition: 'opacity 0.3s ease',
                            }}
                        >
                            {template.templateName}
                        </Typography>
                    </StyledImageContainer>
                ))}
            </Box>
            {loading &&
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <CircularProgress />
                    <h2 style={{ marginLeft: '10px' }}>מעלה...</h2>
                </div>}
        </>
    );
};

export default TemplatesGallery;
