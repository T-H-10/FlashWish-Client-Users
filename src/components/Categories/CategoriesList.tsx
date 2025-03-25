import { createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, fetchCategories } from '../../Store/ctagoriesStore/CategoriesApi';
import { selectCategories } from '../../Store/ctagoriesStore/CategoriesSlice';
import { appDispatch } from '../../Store/Store';
import CircularProgress from '@mui/material/CircularProgress';
import { Category } from '../../types/CategoryTypes';
import AddCategory from './AddCategory ';
import MyButton from '../style/MyButton';


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
    // const categoriesWithAll = [{ categoryID: 0, categoryName: 'הכל' }, ...categoriesList];

    return (
        <>
            <h3>בחר קטגוריה:</h3>
            {categoriesList.map((category: Category) => (
                <span key={category.categoryID}>
                    <MyButton onClick={() => onCategorySelect(category.categoryID)} content={category.categoryName}/>
                </span>
            ))}
                           
                <AddCategory existingCategories={categoriesList.map(category=>category.categoryName)} onAddCategory={handleAddCategory} />
           
            {loading &&
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
                    <CircularProgress />
                    <h2 style={{ marginLeft: '10px' }}>טוען קטגוריות...</h2>
                </div>}
        </>
    );
};

export default CategoriesList;
