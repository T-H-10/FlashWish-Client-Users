import { useContext, useState } from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { UserContext } from '../../types/UserTypes';
import { IsLogin } from '../../App';
import CosmicBackground from './CosmicBackground';
import NavigationLinks from './NavigationLinks';
import UserActions from './UserActions';
import UserProfileModal from './UserProfileModal';
import '../cssPages/header/Header.css'

const Header = () => {
  const { user } = useContext(UserContext);
  const [isLogin, setIsLogin] = useContext(IsLogin);
  const [selectedButton, setSelectedButton] = useState<string>('home-page');
  const [modalOpen, setModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

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
              <img src={import.meta.env.VITE_LOGO_URL || "/placeholder.svg"} alt="Logo" className="logo" />
              <div className="logo-glow"></div>
            </div>
          </div>
          
          <div className="mobile-menu-toggle">
            <IconButton 
              color="inherit" 
              aria-label="menu"
              onClick={toggleMobileMenu}
              className="menu-button"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </div>
          
          <div className={`nav-container ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <NavigationLinks 
              selectedButton={selectedButton}
              setSelectedButton={setSelectedButton}
              isLogin={isLogin}
              closeMobileMenu={closeMobileMenu}
            />
          </div>
          
          <div className="spacer"></div>
          
          <UserActions 
            isLogin={isLogin}
            user={user}
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
            setModalOpen={setModalOpen}
            setIsLogin={setIsLogin}
          />
        </Toolbar>
      </AppBar>
      
      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
      )}
      
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

// import { useContext, useState } from 'react';
// import { AppBar, Toolbar } from '@mui/material';
// import { UserContext } from '../../types/UserTypes';
// import { IsLogin } from '../../App';
// import CosmicBackground from './CosmicBackground';
// import NavigationLinks from './NavigationLinks';
// import UserActions from './UserActions';
// import UserProfileModal from './UserProfileModal';
// import '../cssPages/header/Header.css'

// const Header = () => {
//   const { user, } = useContext(UserContext);
//   const [isLogin, setIsLogin] = useContext(IsLogin);
//   const [selectedButton, setSelectedButton] = useState<string>('home-page');
//   const [modalOpen, setModalOpen] = useState(false);
//   // const navigate = useNavigate();

//   return (
//     <>
//       <AppBar className="cosmic-app-bar" position="fixed">
//         <CosmicBackground />
//         <Toolbar className="cosmic-toolbar">
//           <div className="logo-container">
//             <div className="logo-orbit">
//               <div className="orbit-particle op1"></div>
//               <div className="orbit-particle op2"></div>
//               <div className="orbit-particle op3"></div>
//             </div>
//             <div className="logo-wrapper">
//               <img src={import.meta.env.VITE_LOGO_URL} alt="Logo" className="logo" />
//               <div className="logo-glow"></div>
//             </div>
//           </div>
          
//           <NavigationLinks 
//             selectedButton={selectedButton}
//             setSelectedButton={setSelectedButton}
//             isLogin={isLogin}
//           />
          
//           <div className="spacer"></div>
          
//           <UserActions 
//             isLogin={isLogin}
//             user={user}
//             selectedButton={selectedButton}
//             setSelectedButton={setSelectedButton}
//             setModalOpen={setModalOpen}
//             // userDispatch={userDispatch}
//             // navigate={navigate}
//             setIsLogin={setIsLogin}
//           />
//         </Toolbar>
//       </AppBar>
      
//       {modalOpen && (
//         <UserProfileModal 
//           open={modalOpen} 
//           handleClose={() => setModalOpen(false)} 
//         />
//       )}
//     </>
//   );
// };

// export default Header;