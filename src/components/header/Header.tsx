import { useContext, useState } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../types/UserTypes';
import { IsLogin } from '../../App';
import CosmicBackground from './CosmicBackground';
import NavigationLinks from './NavigationLinks';
import UserActions from './UserActions';
import UserProfileModal from './UserProfileModal';
import '../cssPages/header/Header.css'

const Header = () => {
  const { user, userDispatch } = useContext(UserContext);
  const [isLogin, setIsLogin] = useContext(IsLogin);
  const [selectedButton, setSelectedButton] = useState<string>('home-page');
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <AppBar className="cosmic-app-bar" position="fixed">
        <CosmicBackground />
        <Toolbar className="cosmic-toolbar">
          <div className="logo-container">
            <div className="logo-orbit">
              <div className="orbit-particle op1"></div>
              <div className="orbit-particle op2"></div>
              <div className="orbit-particle op3"></div>
            </div>
            <div className="logo-wrapper">
              <img src="../public/logo.jpg" alt="Logo" className="logo" />
              <div className="logo-glow"></div>
            </div>
          </div>
          
          <NavigationLinks 
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
            isLogin={isLogin}
          />
          
          <div className="spacer"></div>
          
          <UserActions 
            isLogin={isLogin}
            user={user}
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
            setModalOpen={setModalOpen}
            userDispatch={userDispatch}
            navigate={navigate}
            setIsLogin={setIsLogin}
          />
        </Toolbar>
      </AppBar>
      
      {modalOpen && (
        <UserProfileModal 
          open={modalOpen} 
          handleClose={() => setModalOpen(false)} 
        />
      )}
    </>
  );
};

export default Header;