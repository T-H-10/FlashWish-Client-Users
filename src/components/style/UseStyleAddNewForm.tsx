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
        padding: '10px 20px',
        margin: '5px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        minWidth: '100px',
        textAlign: 'center',
        backgroundColor: '#25173b',
        color: 'white',
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: '#eeb451',
        },
    },

}));

export default UseStyleAddNewForm;