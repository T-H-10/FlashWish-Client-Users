import { Avatar } from '@mui/material';
import UseStylesHeader from './UseStyleHeader';


const MyAvatar = ({userName}:{userName:string}) => {
    const classes = UseStylesHeader();

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const firstLetter = userName.charAt(0).toUpperCase();
    const avatarColor = getRandomColor();

    return (
        <Avatar 
            className={classes.avatar} 
            style={{ backgroundColor: avatarColor }} 
        >
            {firstLetter}
        </Avatar>
    );
};

export default MyAvatar;
