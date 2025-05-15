import { useState } from 'react';
import { Outlet } from 'react-router';
import './cssPages/Gallery.css';
import CategoriesList from './CategoriesList';

const Gallery = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(1012);

    return (
        <div className="cosmic-gallery-container">
            <div className="cosmic-background">
                <div className="nebula-layer"></div>
                <div className="stars-layer">
                    {Array.from({ length: 20 }).map((_, index) => (
                        <div 
                            key={index}
                            className="cosmic-particle"
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
            
            <div className="cosmic-gallery-content">
                <div className="cosmic-panel categories-panel">
                    <div className="panel-glow"></div>
                    <h2 className="panel-title">����������������</h2>
                    <CategoriesList onCategorySelect={setSelectedCategoryId} />
                </div>
                
                <div className="cosmic-panel templates-panel">
                    <div className="panel-glow"></div>
                    <Outlet context={{ selectedCategoryId }} />
                </div>
            </div>
        </div>
    );
};

export default Gallery;

// import { Box, Paper, Typography } from '@mui/material';
// import { Outlet } from 'react-router';
// import CategoriesList from './categories/CategoriesList';
// import { useState } from 'react';

// const Gallery = () => {
//     const [selectedCategoryId, setSelectedCategoryId] = useState(1012); 

//     return (
//         <>
//             <Box display="flex" flexDirection={'column'} justifyContent="space-between" p={2} width={"100&"} margin={'30px'}>
//                 <Paper style={{ padding: '16px'}}>
//                     <Typography variant="h6" gutterBottom>
//                         קטגוריות:
//                     </Typography>
//                     <CategoriesList onCategorySelect={setSelectedCategoryId}></CategoriesList>
//                 </Paper>
//                 <Paper style={{ padding: '16px'}}>
//                     <Outlet context={{ selectedCategoryId }}/>
                    
//                     {/* <ImageUploader></ImageUploader> */}
//                     {/* <WishesGallery urls={templatesUrls} ></WishesGallery> */}
//                 </Paper>
//             </Box>
//         </>
//     )
// }
// export default Gallery;