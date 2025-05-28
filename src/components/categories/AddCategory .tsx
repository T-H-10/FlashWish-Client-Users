import { Sparkles, X } from "lucide-react"
import { Button, Card, CardContent, Input } from '@mui/material';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import '../cssPages/categories/AddCategory.css';

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
    const handleCancel = () => {
        setInputVisible(false)
    }

    return (
        <div className="add-category-container">
            {!isInputVisible ? (
                <button onClick={handleShowInput} className="add-category-button"
                >הוסף קטגוריה</button>
            ) : (
                <Card className="form-card">
                    <CardContent className="form-content">
                        <Formik
                            initialValues={{ categoryName: '' }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { resetForm }) => {
                                onAddCategory(values.categoryName);
                                resetForm();
                                setInputVisible(false);
                            }}>
                            {({ errors, touched }) => (
                                <Form className="form-container">
                                    <div className="input-container">
                                        <Field name="categoryName">
                                            {({ field }: any) => (
                                                <Input
                                                    {...field}
                                                    type="text"
                                                    placeholder="הכנס שם קטגוריה"
                                                    className={`category-input ${errors.categoryName && touched.categoryName ? "error" : ""}`}
                                                    disableUnderline
                                                />)}
                                        </Field>
                                        <Sparkles className="sparkle-icon" />
                                    </div>
                                    <ErrorMessage name="categoryName">
                                        {(msg) => (
                                            <div className="error-message">
                                                {msg}</div>)}
                                    </ErrorMessage>
                                    <div className="button-container">
                                        <Button
                                            type="submit"
                                            className="submit-button">
                                            <Sparkles className="button-icon" /> הוספת קטגוריה
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={handleCancel}
                                            className="cancel-button">
                                            <X className="button-icon" />
                                        </Button>
                                    </div>
                                </Form>)}
                        </Formik>
                    </CardContent>
                </Card>
            )}
        </div>)
};

export default AddCategory;
