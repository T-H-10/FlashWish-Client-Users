import { Box, Paper, Typography } from '@mui/material';
import { Outlet } from 'react-router';
import CategoriesList from './Categories/CategoriesList';
import { useState } from 'react';

const Gallery = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(0); 

    return (
        <>
            <Box display="flex" flexDirection={'column'} justifyContent="space-between" p={2} width={"100vw"} margin={'30px'}>
                <Paper style={{ padding: '16px', height: '30vh'}}>
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