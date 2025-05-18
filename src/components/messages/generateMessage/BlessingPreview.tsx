import React from 'react';
import { Celebration, Done } from '@mui/icons-material';
import { GreetingMessagePostModel } from '../../../types/GreetingMessageType';
import '../../cssPages/messages/BlessingPreview.css';

interface BlessingPreviewProps {
  blessing: GreetingMessagePostModel;
  onSave: () => void;
}

const BlessingPreview: React.FC<BlessingPreviewProps> = ({ blessing, onSave }) => {
  return (
    <div className="cosmic-blessing-preview">
      <div className="preview-header">
        <Celebration className="preview-icon" />
        <h3 className="preview-title">הברכה שלך מוכנה!</h3>
      </div>
      
      <div className="preview-content">
        <div className="blessing-card">
          <div className="blessing-background">
            <div className="nebula-layer"></div>
            <div className="stars-layer">
              {Array.from({ length: 10 }).map((_, index) => (
                <div 
                  key={index}
                  className="cosmic-particle"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${Math.random() * 2 + 1}px`,
                    height: `${Math.random() * 2 + 1}px`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${Math.random() * 3 + 3}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          <div className="blessing-content">
            <h3 className="blessing-title">{blessing.title}</h3>
            <div className="blessing-body">
              {blessing.content.split('\n').map((line, index) => (
                <p key={index} className="blessing-text">{line}</p>
              ))}
            </div>
            <p className="blessing-signature">{blessing.signature}</p>
          </div>
        </div>
      </div>
      
      <div className="preview-actions">
        <button className="cosmic-save-button" onClick={onSave}>
          <Done className="button-icon" />
          <span className="button-text">שמור ברכה</span>
          <div className="button-glow"></div>
        </button>
      </div>
    </div>
  );
};

export default BlessingPreview;

// import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
// import { Celebration, Done } from '@mui/icons-material';
// import { GreetingMessagePostModel } from '../../../types/GreetingMessageType';

// const BlessingPreview = ({ blessing, onSave }: { blessing: GreetingMessagePostModel; onSave: () => void }) => (
//   <Card sx={{ mt: 4, p: 2, backgroundColor: '#f9f9f9' }}>
//     <CardContent>
//       <Celebration color="secondary" fontSize="large" />
//       <Typography variant="h6" gutterBottom>{blessing.title}</Typography>
//       <Typography sx={{ my: 2 , whiteSpace: 'pre-line'}}>{blessing.content}</Typography>
//       <Typography variant="subtitle2" align="right">{blessing.signature}</Typography>
//     </CardContent>
//     <Box display="flex" justifyContent="center" gap={2}>
//       <IconButton onClick={onSave} title="שמור ברכה">
//         <Done />
//       </IconButton>
//     </Box>
//   </Card>
// );

// export default BlessingPreview;
