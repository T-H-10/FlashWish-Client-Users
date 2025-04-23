import { Avatar } from '@mui/material';
import UseStylesHeader from './UseStyleHeader';
import { UserType } from '../../types-change/UserTypes';


const MyAvatar = ({user}:{user:UserType}) => {
    const classes = UseStylesHeader();

    const getColorFromString  = (input: string) => {
        let hash = 0;
        for (let i = 0; i < input.length; i++) {
            hash += input.charCodeAt(i);
        }
        
        // השתמש ב-hash כדי ליצור צבע
        let color = '#';
        for (let i = 0; i < 3; i++) {
            const value = (hash >> (i * 8)) & 0xFF; // קח את הבתים של ה-hash
            const hex = value.toString(16).padStart(2, '0'); // הפוך ל-hex
            color += hex;
        }
        
        return color;
    }

    const firstLetter = user.userName.charAt(0).toUpperCase();
    const avatarColor = getColorFromString (user.userName+user.email);

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
