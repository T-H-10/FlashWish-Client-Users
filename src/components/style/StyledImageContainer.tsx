import { Box, styled } from "@mui/material";

const StyledImageContainer = styled(Box)(() => ({
    // border: '2px solid #25173b',
    // borderRadius: '8px',
    // height: '200px',
    width: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: '3px',
    '&:hover img': {
        transform: 'scale(1.05)',
        transition: 'transform 0.3s ease',
    },
    '&:hover .image-title': {
        opacity: 0,
        transition: 'opacity 0.3s ease',
    },
}));
export default StyledImageContainer;