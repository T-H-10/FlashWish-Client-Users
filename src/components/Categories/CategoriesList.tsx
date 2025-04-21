import { createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory, fetchCategories } from '../../Store/ctagoriesStore/CategoriesApi';
import { selectCategories } from '../../Store/ctagoriesStore/CategoriesSlice';
import { appDispatch } from '../../Store/Store';
import { Category } from '../../types/CategoryTypes';
import AddCategory from './AddCategory ';
import MyButton from '../style/MyButton';
import LoadingIndicator from '../LoadingIndicator';


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

    return (
        <>
            <h3>בחר קטגוריה:</h3>
            {categoriesList.map((category: Category) => (
                <span key={category.categoryID}>
                    <MyButton onClick={() => onCategorySelect(category.categoryID)} content={category.categoryName} />
                </span>
            ))}

            <AddCategory existingCategories={categoriesList.map(category => category.categoryName)} onAddCategory={handleAddCategory} />

            {loading &&
                <LoadingIndicator content='טוען קטגוריות...' />
            }
        </>
    );
};

export default CategoriesList;
