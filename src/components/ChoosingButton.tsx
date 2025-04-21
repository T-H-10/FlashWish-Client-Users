import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { IconButton } from '@mui/material';

const ChoosingButton = ({ onClick }: { onClick: Function }) => {
    return (
        <>
            <IconButton onClick={() => onClick()} color="default" sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                color: '#25173b',
                '&:hover': {
                    color: '#eeb451',
                }
            }}>
                <CheckCircleOutlineRoundedIcon />
            </IconButton>
        </>
    )
};
export default ChoosingButton;