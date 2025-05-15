import React from 'react';
import './cssPages/LoadingIndicator.css';

interface LoadingIndicatorProps {
  content: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ content }) => {
  return (
    <div className="cosmic-loading-container">
      <div className="cosmic-loading-animation">
        <div className="cosmic-loading-orbit">
          <div className="orbit-particle op1"></div>
          <div className="orbit-particle op2"></div>
          <div className="orbit-particle op3"></div>
        </div>
        <div className="cosmic-loading-core"></div>
      </div>
      <p className="cosmic-loading-text">{content}</p>
    </div>
  );
};

export default LoadingIndicator;

// import { CircularProgress } from "@mui/material";

// const LoadingIndicator = ({content}:{content:string}) => (
//     <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
//         <CircularProgress />
//         <h2 style={{ marginLeft: '10px' }}>{content}</h2>
//     </div>
// );

// export default LoadingIndicator;