import React, { useContext } from "react";
import { Category } from "../types/CategoryTypes";
import { CategoriesListContext } from "./CategoriesList";
import './cssPages/CategorySelector.css';

interface CategorySelectorrProps {
  selectedCategory: number;
  setSelectedCategory: (categoryId: number) => void;
}

const CategorySelector: React.FC<CategorySelectorrProps> = ({ 
  selectedCategory, 
  setSelectedCategory 
}) => {
  const allCategories: Category[] = useContext(CategoriesListContext);

  return (
    <div className="cosmic-category-selector">
      <div className="selector-container">
      <select 
        value={selectedCategory} 
        onChange={(e) => setSelectedCategory(Number(e.target.value))}
        className="cosmic-select"
        required
      >
        <option value={0} disabled>בחר קטגוריה</option>
        {allCategories.length > 0 && allCategories?.map((category: Category) => (
          <option key={category.categoryID} value={category.categoryID}>
            {category.categoryName}
          </option>
        ))}
      </select>
      <div className="select-arrow"></div>
      <div className="select-grow"></div>
      </div>

      {selectedCategory===0 && (
        <p className="category-hint">יש לבחור קטגוריה</p>
      )}
    </div>
  );
};

export default CategorySelector;