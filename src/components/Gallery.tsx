import { Box, Paper, Typography } from '@mui/material';
import { Outlet } from 'react-router';
import CategoriesList from './categories-change/CategoriesList';
import { useState } from 'react';

const Gallery = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(1012); 

    return (
        <>
            <Box display="flex" flexDirection={'column'} justifyContent="space-between" p={2} width={"100&"} margin={'30px'}>
                <Paper style={{ padding: '16px'}}>
                    <Typography variant="h6" gutterBottom>
                        קטגוריות:
                    </Typography>
                    <CategoriesList onCategorySelect={setSelectedCategoryId}></CategoriesList>
                </Paper>
                <Paper style={{ padding: '16px'}}>
                    <Outlet context={{ selectedCategoryId }}/>
                    
                    {/* <ImageUploader></ImageUploader> */}
                    {/* <WishesGallery urls={templatesUrls} ></WishesGallery> */}
                </Paper>
            </Box>
        </>
    )
}
export default Gallery;