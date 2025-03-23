import { makeStyles } from "@mui/styles";

const UseStyleAddNewForm = makeStyles(() => ({
    formContainer: {
        width: '80%',
        margin: '0 auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
    },
    input: {
        width: '70%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
    },
    button: {
        // width: '70%',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        margin: '5px',
    },
    submitButton: {
        width: '10%',
        backgroundColor: '#25173b',
        color: 'white',
        margin: '5px'
    },
    closeButton: {
        width: '10%',
        backgroundColor: '#25173b',
        color: 'white',
        margin: '5px'
    },
    form: {
        // display: 'flex',
        // flexDirection: 'column',
        // gap: '10px',
    },
}));
export default UseStyleAddNewForm;