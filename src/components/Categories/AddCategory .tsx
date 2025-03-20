import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

const AddCategory = ({ existingCategories, onAddCategory }: { existingCategories: string[], onAddCategory: Function }) => {
    const [isInputVisible, setInputVisible] = useState(false);
    const validationSchema = Yup.object().shape({
        categoryName: Yup.string()
            .required('שם הקטגוריה לא יכול להיות ריק.')
            .min(3, 'שם הקטגוריה צריך להיות לפחות 3 אותיות.')
            .notOneOf(existingCategories, 'קטגוריה עם שם זה כבר קיימת.')
    });
    const handleShowInput = () => {
        setInputVisible(true);
    };


    return (
        <> {!isInputVisible ? (
            <button onClick={handleShowInput}>הוסף קטגוריה</button>
        ) : (
            <Formik
                initialValues={{ categoryName: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    onAddCategory(values.categoryName);
                    resetForm();
                    setInputVisible(false);
                }}
            >
                {() => (
                    <Form>
                        <Field
                            type="text"
                            name="categoryName"
                            placeholder="הכנס שם קטגוריה"
                        />
                        <ErrorMessage name="categoryName" component="div" className="error" />
                        <button type="submit">הוספת קטגוריה</button>
                    </Form>
                )}
            </Formik>
        )}
        </>
    )
};

export default AddCategory;
