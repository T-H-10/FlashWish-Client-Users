import { useContext, useEffect } from 'react';
import { GreetingMessage } from "../../types/GreetingMessageType";
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { appDispatch } from '../../Store/Store';
import { useOutletContext } from 'react-router-dom';
import { CategoriesListContext } from '../categories/CategoriesList';
import { selectGreetingMessages } from '../../Store/messagesStore/GreetingMessagesSlice';
import { fetchGreetingMessages } from '../../Store/messagesStore/GreetingsMessagesApi';
import { selectCategories } from '../../Store/categoriesStore/CategoriesSlice';
import GreetingCard from './GreetingCardMessage';
import GreetingCreateButton from './GreetingCreateButton';
import LoadingIndicator from '../LoadingIndicator';
import { IsLogin } from '../../App';

const GreetingMessagesGallery = () => {
    const { categoriesList } = useSelector(selectCategories);
    const [isLogin] = useContext(IsLogin);
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
            {isLogin &&
                <CategoriesListContext.Provider value={categoriesList}>
                    <GreetingCreateButton />
                </CategoriesListContext.Provider>
            }
            {!loading && filteredGreetingMessages.length !== 0 &&
                <Box display="flex" flexWrap="wrap" justifyContent="space-around">
                    {filteredGreetingMessages.length>0 && filteredGreetingMessages.map((message: GreetingMessage) => (
                        <GreetingCard key={message.textID} message={message} />
                    ))}
                </Box>
            }
            {loading &&
                <LoadingIndicator content='מעלה כרטיסי ברכה...' />
            }

        </>
    );
};

export default GreetingMessagesGallery;
