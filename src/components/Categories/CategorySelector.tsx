// interface CategorySelectorProps {
//     selectedCategory: string;
//     setSelectedCategory: (category: string) => void;
// }

const CategorySelector = ({ selectedCategory, setSelectedCategory }: { selectedCategory:number, setSelectedCategory:Function}) => {
    return (
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(parseInt(e.target.value))}>
            <option value={0}>בחר קטגוריה</option>
            <option value={1}>קטגוריה 1</option>
            <option value={2}>קטגוריה 2</option>
            <option value={3}>קטגוריה 3</option>
            {/* הוסף קטגוריות נוספות */}
        </select>
    );
};

export default CategorySelector;
