import React from 'react';
import { Button } from '@mui/material';
import { Link, NavigateFunction } from 'react-router-dom';
import LogoutUser from '../Logout';
import '../cssPages/header/UserActions.css';
import { UserType } from '../../types/UserTypes';
import MyAvatar from './MyAvatar';

interface UserActionsProps {
  isLogin: boolean;
  user: UserType;
  selectedButton: string;
  setSelectedButton: (button: string) => void;
  setModalOpen: (open: boolean) => void;
  userDispatch: any;
  navigate: NavigateFunction;
  setIsLogin: (isLogin: boolean) => void;
}

const UserActions: React.FC<UserActionsProps> = ({
  isLogin,
  user,
  selectedButton,
  setSelectedButton,
  setModalOpen,
  userDispatch,
  navigate,
  setIsLogin
}) => {
  return (
    <div className="user-actions">
      {!isLogin ? (
        <>
          <Link to='/login' className="auth-link">
            <Button 
              className={`cosmic-auth-button ${selectedButton === 'login' ? 'active' : ''}`}
              onClick={() => setSelectedButton('login')}
            >
              <span className="button-text">התחברות</span>
              <div className="button-glow"></div>
            </Button>
          </Link>
          <Link to='/register' className="auth-link">
            <Button 
              className={`cosmic-auth-button ${selectedButton === 'register' ? 'active' : ''}`}
              onClick={() => setSelectedButton('register')}
            >
              <span className="button-text">הרשמה</span>
              <div className="button-glow"></div>
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Button 
            className={`cosmic-auth-button ${selectedButton === 'logout' ? 'active' : ''}`}
            onClick={() => {
              setSelectedButton('logout');
              LogoutUser(userDispatch, navigate, setIsLogin);
            }}
          >
            <span className="button-text">התנתקות</span>
            <div className="button-glow"></div>
          </Button>
          
          <Button 
            className="cosmic-profile-button"
            onClick={() => setModalOpen(true)}
          >
            <span className="button-text">פרטי משתמש</span>
            <div className="button-glow"></div>
          </Button>
          
          <div className="avatar-container">
            <MyAvatar user={user} />
            <div className="avatar-glow"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserActions;