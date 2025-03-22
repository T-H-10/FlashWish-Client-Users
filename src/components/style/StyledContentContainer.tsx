import { Box, styled } from "@mui/material";

const StyledContentContainer = styled(Box)(() => ({
    border: '2px solid #25173b', // גבול
    borderRadius: '8px',
    height: '200px', // גובה
    width: '200px', // רוחב
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    marginBottom: '3px',
    backgroundColor: '#f5f5f5', // צבע רקע
    '&:hover img': {
        transform: 'scale(1.05)',
        transition: 'transform 0.3s ease',
    },
    '&:hover .image-title': {
        opacity: 0,
        transition: 'opacity 0.3s ease',
    },
}));

export default StyledContentContainer;
