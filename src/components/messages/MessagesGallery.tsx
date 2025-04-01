import { useEffect } from 'react';
import { GreetingMessage } from "../../types/GreetingMessageType";
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { appDispatch } from '../../Store/Store';
import CircularProgress from '@mui/material/CircularProgress';
import { useOutletContext } from 'react-router-dom';
import { CategoriesListContext } from '../categories/CategoriesList';
import { selectGreetingMessages } from '../../Store/messagesStore/GreetingMessagesSlice';
import { fetchGreetingMessages } from '../../Store/messagesStore/GreetingsMessagesApi';
import { selectCategories } from '../../Store/ctagoriesStore/CategoriesSlice';
import GreetingCard from './GreetingCardMessage';
import GreetingCreateButton from './GreetingCreateButton';

const GreetingMessagesGallery = () => {
    const { categoriesList } = useSelector(selectCategories);
    const dispatch = useDispatch<appDispatch>();
    const { greetingMessagesList, loading } = useSelector(selectGreetingMessages);
    const { selectedCategoryId }: { selectedCategoryId: number } = useOutletContext();
    const filteredGreetingMessages = selectedCategoryId === 1012 ? greetingMessagesList
        : greetingMessagesList.filter((message: GreetingMessage) => message.categoryID === selectedCategoryId);

    useEffect(() => {
        dispatch(fetchGreetingMessages());
    }, [dispatch]);

    return (
        <>
            <CategoriesListContext.Provider value={categoriesList}>
                <GreetingCreateButton />
            </CategoriesListContext.Provider>
            {!loading && filteredGreetingMessages.length !== 0 &&
                <Box display="flex" flexWrap="wrap" justifyContent="space-around">
                    {filteredGreetingMessages.map((message: GreetingMessage) => (
                        <>
                            <GreetingCard key={message.textID} message={message} />
                        </>
                    )
                    )}
                </Box>
            }
            {loading &&
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <CircularProgress />
                    <h2 style={{ marginLeft: '10px' }}>מעלה כרטיסי ברכה...</h2>
                </div>}

        </>
    );
};

export default GreetingMessagesGallery;
