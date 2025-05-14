import React from 'react';
import { Container, Box } from '@mui/material';
import '../cssPages/login & register/CosmicFormContainer.css';

interface CosmicFormContainerProps {
  children: React.ReactNode;
}

const CosmicFormContainer: React.FC<CosmicFormContainerProps> = ({ children }) => {
  return (
    <Container maxWidth="sm" className="cosmic-container">
      <div className="cosmic-background">
        <div className="nebula-layer"></div>
        <div className="stars-layer">
          {Array.from({ length: 20 }).map((_, index) => (
            <div 
              key={index}
              className="cosmic-particle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 5 + 5}s`
              }}
            />
          ))}
        </div>
        <div className="cosmic-waves">
          <div className="cosmic-wave wave1"></div>
          <div className="cosmic-wave wave2"></div>
          <div className="cosmic-wave wave3"></div>
        </div>
      </div>
      
      <Box className="cosmic-form-box">
        <div className="form-glow"></div>
        <div className="form-content">
          {children}
        </div>
      </Box>
    </Container>
  );
};

export default CosmicFormContainer;