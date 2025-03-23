import { makeStyles } from "@mui/styles";

const UseStyleCategorySelector = makeStyles(() => ({
    select: {
        width: '70%',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
        backgroundColor: '#f9f9f9',
        transition: 'border-color 0.3s',
        '&:focus': {
            borderColor: '#007bff',
            outline: 'none',
        },
    },
}));
export default UseStyleCategorySelector;