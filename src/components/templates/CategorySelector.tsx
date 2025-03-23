import { useContext } from "react";
import { Category } from "../../types/CategoryTypes";
import { CategoriesListContext } from "../categories/CategoriesList";
import UseStyleCategorySelector from "../style/UseStyleCategorySelector";

const CategorySelector = ({ selectedCategory, setSelectedCategory }: { selectedCategory: number, setSelectedCategory: Function }) => {
    const allCategories: Category[] = useContext(CategoriesListContext);
    const classes=UseStyleCategorySelector();
    return (
        <select value={selectedCategory} className={classes.select} onChange={(e) => setSelectedCategory(parseInt(e.target.value))}>
            <option value={0}>בחר קטגוריה</option>
            {allCategories.map((category: Category) => (
                <option value={category.categoryID}>{category.categoryName}</option>
            ))}
        </select>
    );
};

export default CategorySelector;
