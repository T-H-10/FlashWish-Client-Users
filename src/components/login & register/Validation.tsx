import * as Yup from 'yup';

// Define validation schema with Hebrew error messages
const userSchema = Yup.object().shape({
    userName: Yup.string()
        .trim()
        .required('שם משתמש הוא דרישה חובה'),
    email: Yup.string()
        .email('כתובת האימייל אינה תקינה')
        .required('כתובת אימייל היא דרישה חובה'),
    password: Yup.string()
        .min(6, 'סיסמה חייבת להיות באורך של לפחות 6 תווים')
        .required('סיסמה היא דרישה חובה'),
});

// Validation methods
const Validation = {
    login: async (data: { email: string, password: string }) => {
        const loginData = {
            email: data.email,
            password: data.password,
        };
        return await userSchema.pick(['email', 'password']).isValid(loginData);
    },

    registration: async (data: { userName: string, email: string, password: string }) => {
        return await userSchema.isValid(data);
    },
    
    // Helper method to get validation errors
    getErrors: async (data: { userName?: string, email: string, password: string }) => {
        try {
            await userSchema.validate(data, { abortEarly: false });
            return {};
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors: Record<string, string> = {};
                err.inner.forEach((e) => {
                    if (e.path) {
                        errors[e.path] = e.message;
                    }
                });
                return errors;
            }
            return {};
        }
    }
};

export default Validation;
