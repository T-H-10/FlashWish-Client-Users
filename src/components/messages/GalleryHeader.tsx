import React from 'react';
import { CategoriesListContext } from '../CategoriesList';
import GreetingCreateButton from './GreetingCreateButton';
import '../cssPages/messages/GalleryHeader.css';

interface GalleryHeaderProps {
  title: string;
  isLogin: boolean;
  categoriesList: any[];
}

const GalleryHeader: React.FC<GalleryHeaderProps> = ({
  title,
  isLogin,
  categoriesList
}) => {
  return (
    <div className="cosmic-gallery-header">
      <div className="gallery-title-container">
        <h2 className="gallery-title">{title}</h2>
        <div className="title-decoration">
          <div className="decoration-line"></div>
          <div className="decoration-star"></div>
        </div>
      </div>
      
      {isLogin && (
        <CategoriesListContext.Provider value={categoriesList}>
          <GreetingCreateButton />
        </CategoriesListContext.Provider>
      )}
    </div>
  );
};

export default GalleryHeader;