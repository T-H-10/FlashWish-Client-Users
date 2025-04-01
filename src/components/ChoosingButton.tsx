import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import { IconButton } from '@mui/material';

const ChoosingButton = ({ onClick }: { onClick: Function }) => {
    return (
        <>
            <IconButton onClick={() => onClick()} color="default" sx={{ position: 'absolute', top: 10, left: 10 }}>
                <CheckCircleOutlineRoundedIcon />
            </IconButton>
        </>
    )
};
export default ChoosingButton;