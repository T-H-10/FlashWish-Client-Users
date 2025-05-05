// import { styled } from "@mui/material/styles";

// export const HomeContainer = styled("div")({
//     display: "flex",
//     flexDirection: "row",
//     alignItems: "center",
//     padding: "20px",
// });

// export const HomeContent = styled("div")({
//     textAlign: "center",
//     display: "flex",
//     flexDirection: "row"
// });

// export const DesignExamples = styled("div")({
//     // display: "flex",
//     // flexDirection: "row",
//     justifyContent: "space-around",
//     marginTop: "20px",
// });

// export const DesignExample = styled("div")({
//     textAlign: "center",
// });

// export const DesignExampleImg = styled("img")({
//     width: "150px",
//     height: "150px",
//     objectFit: "cover",
// });


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
        flexWrap: 'wrap',
        gap: '20px',
        flexDirection: 'row',

    },
    designExample: {
        textAlign: 'center',

    },
    designExampleImg: {
        width: '350px',
        height: '350px',
        objectFit: 'cover',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    },
});
export default UseStylesHome;