import { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { appDispatch } from '../../Store/Store';
import { Category } from '../../types/CategoryTypes';
import AddCategory from './AddCategory ';
import MyButton from '../style/MyButton';
import LoadingIndicator from '../LoadingIndicator';
import { selectCategories } from '../../Store/categoriesStore/CategoriesSlice';
import { addCategory, fetchCategories } from '../../Store/categoriesStore/CategoriesApi';
import { IsLogin } from '../../App';


export const CategoriesListContext = createContext<Category[]>([]);

const CategoriesList = ({ onCategorySelect }: { onCategorySelect: Function }) => {
    const dispatch = useDispatch<appDispatch>();
    const { categoriesList, loading } = useSelector(selectCategories);
    const [isLogin] = useContext(IsLogin);
    // const categories = useSelector(selectCategories);
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleAddCategory = (newCategory: { categoryName: string }) => {
        dispatch(addCategory(newCategory));
    };

    return (
        <>
            {categoriesList.length === 0 && !loading && (
                <div>
                    לא נמצאו קטגוריות, אנא הוסף קטגוריה חדשה
                </div>
            )}
            {categoriesList.length > 0 && (
                <div>
                    <h3>בחר קטגוריה:</h3>
                    {categoriesList.length>0 && categoriesList.map((category: Category) => (
                        <span key={category.categoryID}>
                            <MyButton onClick={() => onCategorySelect(category.categoryID)} content={category.categoryName} />
                        </span>
                    ))}
                </div>)
            }
            {isLogin &&
                <AddCategory existingCategories={categoriesList.map(category => category.categoryName)} onAddCategory={handleAddCategory} />
            }
            {loading &&
                <LoadingIndicator content='טוען קטגוריות...' />
            }
        </>
    );
};

export default CategoriesList;
