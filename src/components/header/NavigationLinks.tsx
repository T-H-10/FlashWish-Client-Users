import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import '../cssPages/header/NavigationLinks.css';

interface NavigationLinksProps {
  selectedButton: string;
  setSelectedButton: (button: string) => void;
  isLogin: boolean;
  closeMobileMenu?: () => void;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({ 
  selectedButton, 
  setSelectedButton,
  isLogin,
  closeMobileMenu
}) => {
  const location = useLocation();
  
  const navLinks = [
    {
      id: 'home-page',
      label: 'עמוד בית',
      path: '/',
      alwaysShow: true
    },
    {
      id: 'choose-template',
      label: 'בחירת רקע',
      path: '/Gallery/templates',
      alwaysShow: true
    },
    {
      id: 'choose-content',
      label: 'בחירת תוכן',
      path: '/Gallery/content',
      alwaysShow: true
    },
    {
      id: 'compose-blessing',
      label: 'יצירת ברכה',
      path: '/creatingCard',
      alwaysShow: true
    },
    {
      id: 'personal-area',
      label: 'אזור אישי',
      path: '/myCards',
      alwaysShow: false
    }
  ];

  // Update selected button based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    
    const matchingLink = navLinks.find(link => {
      if (link.path === '/' && currentPath === '/') {
        return true;
      }
      // Check if current path starts with link path (for nested routes)
      return currentPath !== '/' && (currentPath === link.path || currentPath.startsWith(link.path + '/'));
    });
    
    if (matchingLink) {
      setSelectedButton(matchingLink.id);
    }
  }, [location.pathname, setSelectedButton]);

  const handleLinkClick = (linkId: string) => {
    setSelectedButton(linkId);
    // Close mobile menu when a link is clicked
    if (closeMobileMenu) {
      closeMobileMenu();
    }
  };

  return (
    <div className="nav-links">
      {navLinks.map(link => (
        (link.alwaysShow || isLogin) && (
          <Link to={link.path} key={link.id} className="nav-link-wrapper">
            <Button 
              className={`cosmic-nav-button ${selectedButton === link.id ? 'active' : ''}`}
              onClick={() => handleLinkClick(link.id)}
            >
              <span className="button-text">{link.label}</span>
              <div className="button-glow"></div>
              <div className="button-indicator"></div>
            </Button>
          </Link>
        )
      ))}
    </div>
  );
};

export default NavigationLinks;

// import React, { useEffect } from 'react';
// import { Button } from '@mui/material';
// import { Link, useLocation } from 'react-router-dom';
// import '../cssPages/header/NavigationLinks.css';

// interface NavigationLinksProps {
//   selectedButton: string;
//   setSelectedButton: (button: string) => void;
//   isLogin: boolean;
// }

// const NavigationLinks: React.FC<NavigationLinksProps> = ({ 
//   selectedButton, 
//   setSelectedButton,
//   isLogin
// }) => {
//   const location = useLocation();
  
//   const navLinks = [
//     {
//       id: 'home-page',
//       label: 'עמוד בית',
//       path: '/',
//       alwaysShow: true
//     },
//     {
//       id: 'choose-template',
//       label: 'בחירת רקע',
//       path: '/Gallery/templates',
//       alwaysShow: true
//     },
//     {
//       id: 'choose-content',
//       label: 'בחירת תוכן',
//       path: '/Gallery/content',
//       alwaysShow: true
//     },
//     {
//       id: 'compose-blessing',
//       label: 'יצירת ברכה',
//       path: '/creatingCard',
//       alwaysShow: true
//     },
//     {
//       id: 'personal-area',
//       label: 'אזור אישי',
//       path: '/myCards',
//       alwaysShow: false
//     }
//   ];

//   // Update selected button based on current route
//   useEffect(() => {
//     const currentPath = location.pathname;
    
//     // Find the matching nav link for the current path
//     // const matchingLink = navLinks.find(link => {
//     //   if (link.path === '/' && currentPath === '/') {
//     //     return true;
//     //   }
//     //   console.log(link);
      
//     //   // Check if current path starts with link path (for nested routes)
//     //   return currentPath !== '/' && currentPath.startsWith(link.path);
//     // });
//     const matchingLink = navLinks.find(link => {
//       return currentPath === link.path || currentPath.startsWith(link.path + '/');
//     });
    
    
//     if (matchingLink) {
//       setSelectedButton(matchingLink.id);
//     }
//   }, [location.pathname, setSelectedButton]);

//   return (
//     <div className="nav-links">
//       {navLinks.map(link => (
//         (link.alwaysShow || isLogin) && (
//           <Link to={link.path} key={link.id} className="nav-link-wrapper">
//             <Button 
//               className={`cosmic-nav-button ${selectedButton === link.id ? 'active' : ''}`}
//               onClick={() => setSelectedButton(link.id)}
//             >
//               <span className="button-text">{link.label}</span>
//               <div className="button-glow"></div>
//               <div className="button-indicator"></div>
//             </Button>
//           </Link>
//         )
//       ))}
//     </div>
//   );
// };

// export default NavigationLinks;