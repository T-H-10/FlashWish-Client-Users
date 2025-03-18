import { makeStyles } from '@mui/styles';

const UseStylesHome = makeStyles({
    homeContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
    },
    homeContent: {
        textAlign: 'center',
    },
    designExamples: {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '20px',
    },
    designExample: {
        textAlign: 'center',
    },
    designExampleImg: {
        width: '150px',
        height: '150px',
        objectFit: 'cover',
    },
});
export default UseStylesHome;