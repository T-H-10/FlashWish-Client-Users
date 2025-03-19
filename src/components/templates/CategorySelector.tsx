import React from 'react';

interface CategorySelectorProps {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, setSelectedCategory }) => {
    return (
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="">בחר קטגוריה</option>
            <option value="category1">קטגוריה 1</option>
            <option value="category2">קטגוריה 2</option>
            <option value="category3">קטגוריה 3</option>
            {/* הוסף קטגוריות נוספות */}
        </select>
    );
};

export default CategorySelector;
