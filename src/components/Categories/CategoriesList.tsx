import { createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, fetchCategories } from '../../Store/ctagoriesStore/CategoriesApi';
import { selectCategories } from '../../Store/ctagoriesStore/CategoriesSlice';
import { appDispatch } from '../../Store/Store';
import CircularProgress from '@mui/material/CircularProgress';
import { Category } from '../../types/CategoryTypes';
import AddCategory from './AddCategory ';


export const CategoriesListContext = createContext<Category[]>([]);

const CategoriesList = ({ onCategorySelect }: { onCategorySelect: Function }) => {
    const dispatch = useDispatch<appDispatch>();
    const { categoriesList, loading } = useSelector(selectCategories);
    // const categories = useSelector(selectCategories);
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleAddCategory = (newCategory: { categoryName: string }) => {
        dispatch(addCategory(newCategory));
    };
    // const handleUpdateCategory = (id: number, updatedCategory: { categoryName: string }) => {
    //     dispatch(updateCategory({ id, updatedCategory }));
    // };

    // const handleDeleteCategory = (id: number) => {
    //     dispatch(deleteCategory(id));
    // };
    const categoriesWithAll = [{ categoryID: 0, categoryName: 'הכל' }, ...categoriesList];

    return (
        <>
            <h1>קטגוריות</h1>
            {/* כאן תוכל להוסיף את הקוד להציג את הקטגוריות, הוספה, עדכון ומחיקה */}
            {categoriesWithAll.map((category: Category) => (
                <button
                    key={category.categoryID}
                    onClick={() => onCategorySelect(category.categoryID)}
                    style={{
                        margin: '5px',
                        padding: '10px',
                        backgroundColor: '#f0f0f0',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        cursor: 'pointer'
                    }}
                >
                    {category.categoryName}
                </button>
            ))}
            
                
                <AddCategory existingCategories={categoriesWithAll.map(category=>category.categoryName)} onAddCategory={handleAddCategory} />
           
            {loading &&
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <CircularProgress />
                    <h2 style={{ marginLeft: '10px' }}>מעלה...</h2>
                </div>}
        </>
    );
};

export default CategoriesList;
