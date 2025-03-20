// interface CategorySelectorProps {
//     selectedCategory: string;
//     setSelectedCategory: (category: string) => void;
// }

import { useContext } from "react";
import { Category } from "../../Types/CategoryTypes";
import { CategoriesListContext } from "../Categories/CategoriesList";

const CategorySelector = ({ selectedCategory, setSelectedCategory }: { selectedCategory:number, setSelectedCategory:Function}) => {
   const allCategories: Category[] = useContext(CategoriesListContext);
   console.log(allCategories);
   
    return (
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(parseInt(e.target.value))}>
            {allCategories.map((category: Category)=>(
                <option value={category.categoryID}>{category.categoryName}</option>
            ))}
        </select>
    );
};

export default CategorySelector;
