import React from 'react';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../cssPages/header/NavigationLinks.css';

interface NavigationLinksProps {
  selectedButton: string;
  setSelectedButton: (button: string) => void;
  isLogin: boolean;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({ 
  selectedButton, 
  setSelectedButton,
  isLogin
}) => {
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

  return (
    <div className="nav-links">
      {navLinks.map(link => (
        (link.alwaysShow || isLogin) && (
          <Link to={link.path} key={link.id} className="nav-link-wrapper">
            <Button 
              className={`cosmic-nav-button ${selectedButton === link.id ? 'active' : ''}`}
              onClick={() => setSelectedButton(link.id)}
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