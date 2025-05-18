import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { appDispatch } from '../../Store/Store';
import { fetchGreetingMessages } from '../../Store/messagesStore/GreetingsMessagesApi';
import { selectGreetingMessages } from '../../Store/messagesStore/GreetingMessagesSlice';
import { selectCategories } from '../../Store/categoriesStore/CategoriesSlice';
import { GreetingMessage } from "../../types/GreetingMessageType";
import { IsLogin } from '../../App';
import LoadingIndicator from '../LoadingIndicator';
import GreetingCardMessage from './GreetingCardMessage';
import '../cssPages/messages/GreetingMessagesGallery.css';
import GalleryHeader from './GalleryHeader';
import EmptyState from './EmptyState';

const GreetingMessagesGallery = () => {
  const { categoriesList } = useSelector(selectCategories);
  const [isLogin] = useContext(IsLogin);
  const dispatch = useDispatch<appDispatch>();
  const { greetingMessagesList, loading } = useSelector(selectGreetingMessages);
  const { selectedCategoryId }: { selectedCategoryId: number } = useOutletContext();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const categoryName = selectedCategoryId === 1012
    ? 'כל הברכות'
    : categoriesList.find(c => c.categoryID === selectedCategoryId)?.categoryName || 'ברכות';

  const filteredGreetingMessages = selectedCategoryId === 1012  //change!!!
    ? greetingMessagesList
    : greetingMessagesList.filter((message: GreetingMessage) => message.categoryID === selectedCategoryId);

  useEffect(() => {
    dispatch(fetchGreetingMessages())
      .then(() => setIsInitialLoad(false));
  }, [dispatch]);

  return (
    <div className="cosmic-greeting-gallery">
      <GalleryHeader
        title={categoryName}
        isLogin={isLogin}
        categoriesList={categoriesList}
      />

      {loading && isInitialLoad ? (
        <LoadingIndicator content='מעלה כרטיסי ברכה...' />
      ) : filteredGreetingMessages.length > 0 ? (
        <div className="greeting-cards-grid">
          {filteredGreetingMessages?.map((message: GreetingMessage) => (
            <GreetingCardMessage key={message.textID} message={message} />
          ))}
        </div>
      ) : (
        <EmptyState
        message="לא נמצאו ברכות בקטגוריה זו"
        subMessage={isLogin? "התחבר כדי להוסיף ברכות חדשות":"לחץ על 'יצירת תוכן חדש' כדי להוסיף ברכה"}
/>
      )}
    </div>
  );
};

export default GreetingMessagesGallery;