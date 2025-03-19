import { useEffect, useState } from 'react';
import { API_URL } from '../../Types/UserTypes';
import { Template } from "../../Types/TemplateType";
import { Box, Typography } from '@mui/material';
import StyledImageContainer from '../style/StyledImageContainer';
import ImageUploadButton from './ImageUploadButton';

const TemplatesGallery = () => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const fetchTemplates = async () => {
        const response = await fetch(API_URL + '/Templates');
        const data = await response.json();
        setTemplates(data);
    };
    useEffect(() => {
        fetchTemplates();
    }, []);
    const handleImageUpload = async (newTemplate: Template) => {
        console.log(newTemplate);
        
        const response = await fetch(API_URL + '/Templates', {
            method: 'POST',
            body: JSON.stringify(newTemplate),
        });
        if (response.ok) {
            const createdTemplate = await response.json();
            console.log(createdTemplate);
            setTemplates(prevTemplates => [...prevTemplates, createdTemplate]); // עדכון המערך עם התמונה החדשה
        } else {
            // טיפול בשגיאות
            const errorMessage = await response.text();
            console.error('Failed to upload image:', errorMessage);
        }
    };
    return (
        <>
            {/* <UploadImage onImageUpload={handleImageUpload} /> */}
            <ImageUploadButton/>
            <Box display="flex" flexWrap="wrap" justifyContent="space-around">
                {templates.map((template: Template) => (
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
        </>
    );
};

export default TemplatesGallery;
