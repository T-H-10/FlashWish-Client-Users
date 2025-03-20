// CategoriesComponent.tsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, addCategory, updateCategory, deleteCategory } from '../../Store/CtagoriesStore/CategoriesApi';
import { selectCategories } from '../../Store/CtagoriesStore/CategoriesSlice';
import { appDispatch } from '../../Store/Store';

const CategoriesComponent=()=>{
    // const dispatch: AppDispatch = useDispatch();
    const dispatch = useDispatch<appDispatch>();
    const categories = useSelector(selectCategories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleAddCategory = (newCategory: { categoryName: string }) => {
        dispatch(addCategory(newCategory));
    };

    const handleUpdateCategory = (id: number, updatedCategory: { categoryName: string }) => {
        dispatch(updateCategory({ id, updatedCategory }));
    };

    const handleDeleteCategory = (id: number) => {
        dispatch(deleteCategory(id));
    };

    return (
        <div>
            <h1>קטגוריות</h1>
            {/* כאן תוכל להוסיף את הקוד להציג את הקטגוריות, הוספה, עדכון ומחיקה */}
        </div>
    );
};

export default CategoriesComponent;
