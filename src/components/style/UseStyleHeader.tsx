import { makeStyles } from '@mui/styles';

const UseStylesHeader = makeStyles(() => ({
    appBar: {
        position: 'static',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        backgroundColor: '#25173b',
        color: 'black',
    },
    toolbar: {
        backgroundColor: '#25173b',
        color: '#eeb451',
        fontFamily: 'Varela Round, sans-serif'
    },
    logo: {
        marginRight: '5px', // theme.spacing(2),
        width: '90px',
    },
    link:{
        color: '#eeb451'
    },
    menuButton: {
        backgroundColor: '#25173b',
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            width: '0%',
            height: '2px',
            bottom: '-2px',
            left: '0',
            // backgroundColor: '#ff4081', // צבע הקו התחתי כמו צבע האותיות בלוגו
            transition: 'width 0.3s ease-in-out',
            backgroundColor: '#eeb451',
        },
        '&:hover:after': {
            width: '100%',
            color: '#eeb451',
        },
    },
    avatar: {
        cursor: 'pointer',
    },
    menuItem: {
        '&:hover': {
            backgroundColor: 'rgba(246, 181, 60, 0.2)',
        },
    },
}));
export default UseStylesHeader;