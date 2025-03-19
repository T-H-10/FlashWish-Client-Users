import { Box, Paper, Typography } from '@mui/material';
import { Outlet } from 'react-router';

const Gallery = () => {
    return (
        <>
            <Box display="flex" flexDirection={'column'} justifyContent="space-between" p={2} width={"100vw"}>
                <Paper style={{ padding: '16px', height: '30vh' }}>
                    <Typography variant="h6" gutterBottom>
                        קטגוריות:
                    </Typography>
                    {/* <CategoryList></CategoryList> */}
                </Paper>
                <Paper style={{ padding: '16px', height: '70vh' }}>
                    <Outlet/>
                    
                    {/* <ImageUploader></ImageUploader> */}
                    {/* <WishesGallery urls={templatesUrls} ></WishesGallery> */}
                </Paper>
            </Box>
        </>
    )
}
export default Gallery;