import { AutoAwesome } from '@mui/icons-material';
import '../../cssPages/messages/GeneratorHeader.css'

const GeneratorHeader = () => {
  return (
    <div className="cosmic-generator-header">
      <div className="header-icon-container">
        <AutoAwesome className="header-icon" />
        <div className="icon-glow"></div>
      </div>
      
      <h2 className="generator-title">בקש ברכה אישית</h2>
      
      <div className="header-decoration">
        <div className="decoration-line"></div>
        <div className="decoration-stars">
          <div className="decoration-star ds1"></div>
          <div className="decoration-star ds2"></div>
          <div className="decoration-star ds3"></div>
        </div>
      </div>
    </div>
  );
};

export default GeneratorHeader;