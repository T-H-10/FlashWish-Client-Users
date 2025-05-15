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
    <div className="cosmic-select-container">
      <select 
        value={selectedCategory} 
        onChange={(e) => setSelectedCategory(parseInt(e.target.value))}
        className="cosmic-select"
      >
        <option value={0} disabled>������ ��������������</option>
        {allCategories.length > 0 && allCategories.map((category: Category) => (
          <option key={category.categoryID} value={category.categoryID}>
            {category.categoryName}
          </option>
        ))}
      </select>
      <div className="select-arrow"></div>
    </div>
  );
};

export default CategorySelector;

// import { useContext } from "react";
// import { Category } from "../../types/CategoryTypes";
// import { CategoriesListContext } from "../categories/CategoriesList";
// import UseStyleCategorySelector from "../style/UseStyleCategorySelector";

// const CategorySelector = ({ selectedCategory, setSelectedCategory }: { selectedCategory: number, setSelectedCategory: Function }) => {
//     const allCategories: Category[] = useContext(CategoriesListContext);
//     const classes=UseStyleCategorySelector();
//     return (
//         <select value={selectedCategory} className={classes.select} onChange={(e) => setSelectedCategory(parseInt(e.target.value))}>
//             <option value={0} disabled >בחר קטגוריה</option>
//             {allCategories.length>0 && allCategories.map((category: Category) => (
//                 <option key={category.categoryID} value={category.categoryID}>{category.categoryName}</option>
//             ))}
//         </select>
//     );
// };

// export default CategorySelector;
