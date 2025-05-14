import React, { useMemo } from 'react';
import { Avatar } from '@mui/material';
import { UserType } from '../../types/UserTypes';
import '../cssPages/header/MyAvatar.css';
interface MyAvatarProps {
  user: UserType;
}

const MyAvatar: React.FC<MyAvatarProps> = ({ user }) => {
  const getColorFromString = (input: string) => {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash += input.charCodeAt(i);
    }
    
    // Create a color from the hash
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      const hex = value.toString(16).padStart(2, '0');
      color += hex;
    }
    
    return color;
  };

  const firstLetter = useMemo(() => user.userName.charAt(0).toUpperCase(), [user.userName]);
  const avatarColor = useMemo(() => getColorFromString(user.userName + user.email), [user.userName, user.email]);

  return (
    <Avatar 
      className="cosmic-avatar" 
      style={{ backgroundColor: avatarColor }} 
    >
      <div className="avatar-content">
        <span className="avatar-letter">{firstLetter}</span>
        <div className="avatar-inner-glow"></div>
      </div>
    </Avatar>
  );
};

export default MyAvatar;