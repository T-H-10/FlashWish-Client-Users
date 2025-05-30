import React, { useEffect, useState, createContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../Store/categoriesStore/CategoriesApi';
import { selectCategories } from '../Store/categoriesStore/CategoriesSlice';
import { appDispatch } from '../Store/Store';
import { Category } from '../types/CategoryTypes';
import './cssPages/CategoriesList.css';

export const CategoriesListContext = createContext<Category[]>([]);

interface CategoriesListProps {
  onCategorySelect: (categoryId: number) => void;
}

const CategoriesList: React.FC<CategoriesListProps> = ({ onCategorySelect }) => {
  const dispatch: appDispatch = useDispatch<appDispatch>();
  const { categoriesList, loading } = useSelector(selectCategories);
  const [activeCategory, setActiveCategory] = useState<number>(0);
  // const [isLogin] = useContext(IsLogin);

  // const handleAddCategory = (newCategory: { categoryName: string }) => {
  //   dispatch(addCategory(newCategory));
  // };

  useEffect(() => {
    if (categoriesList.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categoriesList.length]);

  const handleCategoryClick = (categoryId: number) => {
    setActiveCategory(categoryId);
    onCategorySelect(categoryId);
  };

  if (loading) {
    return (
      <div className="cosmic-loading">
        <div className="cosmic-loader"></div>
        <span>טוען קטגוריות...</span>
      </div>
    );
  }

  return (
    <CategoriesListContext.Provider value={categoriesList}>
      <div className="cosmic-categories-list">
        <div
          className={`cosmic-category-item ${activeCategory === 0 ? 'active' : ''}`}
          onClick={() => handleCategoryClick(0)}
        >
          <div className="category-content">
            <span className="category-name">הכל</span>
          </div>
          <div className="category-glow"></div>
        </div>

        {categoriesList.map((category: Category) => (
          <div
            key={category.categoryID}
            className={`cosmic-category-item ${activeCategory === category.categoryID ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category.categoryID)}
          >
            <div className="category-content">
              <span className="category-name">{category.categoryName}</span>
            </div>
            <div className="category-glow"></div>
          </div>
        ))}
        {/* {isLogin &&  */}
        {/* <AddCategory existingCategories={categoriesList.length > 0 ? categoriesList?.map(category => category.categoryName) : []} onAddCategory={handleAddCategory} />} */}
      </div>
    </CategoriesListContext.Provider>
  );
};

export default CategoriesList;