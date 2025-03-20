import { useEffect } from 'react';
import { Template } from "../../Types/TemplateType";
import { Box, Typography } from '@mui/material';
import StyledImageContainer from '../style/StyledImageContainer';
import ImageUploadButton from './ImageUploadButton';
import { useDispatch, useSelector } from 'react-redux';
import { appDispatch } from '../../Store/Store';
import { fetchTemplates } from '../../Store/TemplatesStore/TemplatesApi';
import { selectTemplates } from '../../Store/TemplatesStore/TemplatesSlice';
import CircularProgress from '@mui/material/CircularProgress';
const TemplatesGallery = () => {
    const dispatch = useDispatch<appDispatch>();
    const { templatesList, loading } = useSelector(selectTemplates);
    useEffect(() => {      
        dispatch(fetchTemplates())        
    }, [dispatch]);
    return (
        <>
            <ImageUploadButton/>
            <Box display="flex" flexWrap="wrap" justifyContent="space-around">
                {templatesList.map((template: Template) => (
                    <StyledImageContainer
                        key={template.templateID}
                        width={{ xs: '100%', sm: '50%', md: '33.33%', lg: '25%' }}
                    >
                        <img
                            src={template.imageURL}
                            alt={template.templateName}
                            style={{ maxWidth: '100%', maxHeight: '100%', transition: 'transform 0.3s ease' }}
                        />
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
