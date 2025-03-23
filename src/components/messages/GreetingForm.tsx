import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { UserContext } from '../../types/UserTypes';
import { useDispatch } from 'react-redux';
import { appDispatch } from '../../Store/Store';
import { addGreetingMessage } from '../../Store/messagesStore/GreetingsMessagesApi';
import { GreetingMessagePostModel } from '../../types/GreetingMessageType';
import useStyleGreetingForm from '../style/UseStyleGreetingForm';

interface GreetingFormProps {
    onClose: () => void;
}

const GreetingForm: React.FC<GreetingFormProps> = ({ onClose }) => {
    const classes = useStyleGreetingForm();
    const [formData, setFormData] = useState({
        categoryID: 0,
        title: '',
        content: '',
        signature: '',
        userID: 1, // נניח שהמשתמש מחובר עם ID 1
    });
    const { user } = useContext(UserContext);
    const dispatch = useDispatch<appDispatch>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const { title, content, signature } = formData;
        if (!title || !content || !signature) {
            Swal.fire({
                icon: 'warning',
                title: 'שגיאה',
                text: 'נא למלא את כל השדות',
            });
            return false;
        }
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            const greetingData: GreetingMessagePostModel = {
                ...formData,
                userID: user.id,
            };
            dispatch(addGreetingMessage(greetingData));
            resetForm();
            onClose();
        }
    };

    const resetForm = () => {
        setFormData({
            categoryID: 0,
            title: '',
            content: '',
            signature: '',
            userID: 1,
        });
    };

    return (
        <div className={classes.formContainer}>
            <form onSubmit={handleSubmit} className={classes.form}>
                <input
                    type="number"
                    placeholder="קטגוריה ID"
                    name="categoryID"
                    value={formData.categoryID}
                    onChange={handleChange}
                    required
                    className={classes.input}
                />
                <input
                    type="text"
                    placeholder="כותרת"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className={classes.input}
                />
                <textarea
                    placeholder="תוכן"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    className={classes.input}
                />
                <input
                    type="text"
                    placeholder="חתימה"
                    name="signature"
                    value={formData.signature}
                    onChange={handleChange}
                    required
                    className={classes.input}
                />
                <button type="submit" className={`${classes.button} ${classes.submitButton}`}>שלח</button>
                <button type="button" onClick={onClose} className={`${classes.button} ${classes.closeButton}`}>סגור</button>
            </form>
        </div>
    );
};

export default GreetingForm;
