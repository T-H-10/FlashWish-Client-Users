// // components/GreetingMessagesGallery.tsx
// import { useContext, useEffect } from 'react';
// import { GreetingMessage } from "../../types/GreetingMessageType";
// import { Box, Typography } from '@mui/material';
// import StyledImageContainer from '../style/StyledImageContainer';
// import { useDispatch, useSelector } from 'react-redux';
// import { appDispatch } from '../../Store/Store';
// import CircularProgress from '@mui/material/CircularProgress';
// import { useOutletContext } from 'react-router-dom';
// import { CategoriesListContext } from '../categories/CategoriesList';
// import { UserContext } from '../../types/UserTypes';
// import { selectCategories } from '../../Store/ctagoriesStore/CategoriesSlice';
// import { selectGreetingMessages } from '../../Store/messagesStore/GreetingMessagesSlice';
// import { fetchGreetingMessages } from '../../Store/messagesStore/GreetingsMessagesApi';
// import DeleteButton from '../templates/DeleteButton';

// const GreetingMessagesGallery = () => {
//     const { categoriesList } = useSelector(selectCategories);
//     const dispatch = useDispatch<appDispatch>();
//     const { greetingMessagesList, loading } = useSelector(selectGreetingMessages);
//     const { selectedCategoryId }: { selectedCategoryId: number } = useOutletContext();
//     const currentUserId = useContext(UserContext).user.id;

//     // Filter greeting messages based on selected category
//     const filteredGreetingMessages = selectedCategoryId === 1012 ? greetingMessagesList
//         : greetingMessagesList.filter((message: GreetingMessage) => message.categoryID === selectedCategoryId);

//     useEffect(() => {
//         dispatch(fetchGreetingMessages());
//     }, [dispatch]);
//     if(!loading)
//         console.log(filteredGreetingMessages);

//     if (!loading && filteredGreetingMessages.length == 0) {
//         console.log("here");
        
//         return null;
//     }

//     return (
//         <>
//             <CategoriesListContext.Provider value={categoriesList}>
//                 {/* You can add an ImageUploadButton here if needed */}
//             </CategoriesListContext.Provider>
//             <Box display="flex" flexWrap="wrap" justifyContent="space-around">
//                 {filteredGreetingMessages.map((message: GreetingMessage) => (
//                     <StyledImageContainer
//                         key={message.textID}
//                         width={{ xs: '100%', sm: '50%', md: '33.33%', lg: '25%' }}
//                     >
//                         <Typography
//                             className="image-title"
//                             variant="subtitle1"
//                             sx={{
//                                 position: 'absolute',
//                                 bottom: 10,
//                                 left: 10,
//                                 color: '#25173b',
//                                 backgroundColor: 'transparent',
//                                 padding: '5px',
//                                 borderRadius: '5px',
//                                 opacity: 1,
//                                 transition: 'opacity 0.3s ease',
//                             }}
//                         >
//                             hfgdsfhdgd
//                             {message.title}
//                             {message.content}
//                             {message.signature}
//                         </Typography>
//                         <Typography
//                             variant="body2"
//                             sx={{
//                                 position: 'absolute',
//                                 bottom: 30,
//                                 left: 10,
//                                 color: '#25173b',
//                                 backgroundColor: 'transparent',
//                                 padding: '5px',
//                                 borderRadius: '5px',
//                                 opacity: 1,
//                                 transition: 'opacity 0.3s ease',
//                             }}
//                         >
//                             {message.content}
//                         </Typography>
//                         <DeleteButton
//                             itemId={message.textID}
//                             uploaderId={message.userID}
//                             currentUserId={currentUserId}
//                         />
//                     </StyledImageContainer>
//                 ))}
//             </Box>
//             {loading &&
//                 <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
//                     <CircularProgress />
//                     <h2 style={{ marginLeft: '10px' }}>מעלה כרטיסי ברכה...</h2>
//                 </div>}
//         </>
//     );
// };

// export default GreetingMessagesGallery;

// components/GreetingMessagesGallery.tsx
import { useContext, useEffect } from 'react';
import { GreetingMessage } from "../../types/GreetingMessageType";
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { appDispatch } from '../../Store/Store';
import CircularProgress from '@mui/material/CircularProgress';
import { useOutletContext } from 'react-router-dom';
import { CategoriesListContext } from '../categories/CategoriesList';
import { UserContext } from '../../types/UserTypes';
import { selectGreetingMessages } from '../../Store/messagesStore/GreetingMessagesSlice';
import { fetchGreetingMessages } from '../../Store/messagesStore/GreetingsMessagesApi';
import DeleteButton from '../templates/DeleteButton';
import { selectCategories } from '../../Store/ctagoriesStore/CategoriesSlice';
import StyledContentContainer from '../style/StyledContentContainer';
import GreetingCard from './GreetingCard';

const GreetingMessagesGallery = () => {
    const { categoriesList } = useSelector(selectCategories);
    const dispatch = useDispatch<appDispatch>();
    const { greetingMessagesList, loading } = useSelector(selectGreetingMessages);
    const { selectedCategoryId }: { selectedCategoryId: number } = useOutletContext();
    const currentUserId = useContext(UserContext).user.id;

    // Filter greeting messages based on selected category
    const filteredGreetingMessages = selectedCategoryId === 1012 ? greetingMessagesList
        : greetingMessagesList.filter((message: GreetingMessage) => message.categoryID === selectedCategoryId);

    useEffect(() => {
        dispatch(fetchGreetingMessages());
    }, [dispatch]);

    if (!loading && filteredGreetingMessages.length === 0) {
        return null;
    }

    return (
        <>
            <CategoriesListContext.Provider value={categoriesList}>
                {/* You can add an ImageUploadButton here if needed */}
            </CategoriesListContext.Provider>
            <Box display="flex" flexWrap="wrap" justifyContent="space-around">
                {filteredGreetingMessages.map((message: GreetingMessage) => (
                    // <StyledContentContainer
                    //     key={message.textID}
                    //     width={{ xs: '100%', sm: '50%', md: '33.33%', lg: '25%' }}
                    // >
                    //     <Typography
                    //         className="image-title"
                    //         variant="subtitle1"
                    //         sx={{
                    //             position: 'absolute',
                    //             bottom: 10,
                    //             left: 10,
                    //             color: '#25173b',
                    //             backgroundColor: 'transparent',
                    //             padding: '5px',
                    //             borderRadius: '5px',
                    //             opacity: 1,
                    //             transition: 'opacity 0.3s ease',
                    //         }}
                    //     >
                    //         {message.title}
                    //     </Typography>
                    //     <Typography
                    //         variant="body2"
                    //         sx={{
                    //             position: 'absolute',
                    //             bottom: 30,
                    //             left: 10,
                    //             color: '#25173b',
                    //             backgroundColor: 'transparent',
                    //             padding: '5px',
                    //             borderRadius: '5px',
                    //             opacity: 1,
                    //             transition: 'opacity 0.3s ease',
                    //         }}
                    //     >
                    //         {message.content}
                    //     </Typography>
                    //     <Typography
                    //         variant="body2"
                    //         sx={{
                    //             position: 'absolute',
                    //             bottom: 50,
                    //             left: 10,
                    //             color: '#000',
                    //             backgroundColor: 'transparent',
                    //             padding: '5px',
                    //             borderRadius: '5px',
                    //             opacity: 1,
                    //             transition: 'opacity 0.3s ease',
                    //             fontSize: 30
                    //         }}
                    //     >
                    //         {message.signature}
                    //     </Typography>
                    //     <DeleteButton
                    //         itemId={message.textID}
                    //         uploaderId={message.userID}
                    //         currentUserId={currentUserId}
                    //     />
                    // </StyledContentContainer>
                    <GreetingCard key={message.textID} message={message} />
                )
                )}
            </Box>
            {loading &&
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <CircularProgress />
                    <h2 style={{ marginLeft: '10px' }}>מעלה כרטיסי ברכה...</h2>
                </div>}
        </>
    );
};

export default GreetingMessagesGallery;
