import React, { useState } from "react";
import { Template } from "../../types/TemplateType";
import DeleteButton from "./DeleteButton";
import '../cssPages/templates/TemplateItem.css';
import { deleteTemplate } from "../../Store/templatesStore/TemplatesApi";

export const CLOUDE_URL_START = import.meta.env.VITE_CLOUDE_URL_START;

interface CosmicTemplateItemProps {
  template: Template;
  onClick: () => void;
  isEditable: boolean;
  currentUserId: number;
}

const TemplateItem: React.FC<CosmicTemplateItemProps> = ({
  template,
  onClick,
  isEditable,
  currentUserId
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="cosmic-template-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="template-frame">
        <div className="template-image-container" onClick={onClick}>
          <img 
            src={CLOUDE_URL_START + template.imageURL || "/placeholder.svg"}
            alt={template.templateName}
            className="template-image"
          />
          <div className="image-overlay">
            <span className="overlay-text">������</span>
          </div>
        </div>
        
        {isEditable && (
          <div className={`template-info ${isHovered ? 'visible' : ''}`}>
            <h3 className="template-name">{template.templateName}</h3>
          </div>
        )}
        
        {isEditable && (
          <DeleteButton
            uploaderId={template.userID}
            currentUserId={currentUserId}
            deleteFunc={() => deleteTemplate(template.templateID)}
          />
        )}
      </div>
      
      <div className="template-glow"></div>
      
      <div className="template-decoration">
        <div className="decoration-star ds1"></div>
        <div className="decoration-star ds2"></div>
        <div className="decoration-star ds3"></div>
      </div>
    </div>
  );
};

export default TemplateItem;

// import { Typography } from "@mui/material";
// import StyledImageContainer from "../style/StyledImageContainer";
// import { Template } from "../../types/TemplateType";
// import DeleteButton from "./DeleteButton";
// import { deleteTemplate } from "../../Store/templatesStore/TemplatesApi";

// export const CLOUDE_URL_START= import.meta.env.VITE_CLOUDE_URL_START;
// const TemplateItem = ({ template, onClick, isEditable, currentUserId }:{ template:Template, onClick:()=>{}, isEditable: boolean, currentUserId:number })=>{
//   return(
//     <StyledImageContainer width={{ xs: '100%', sm: '50%', md: '33.33%', lg: '25%' }}>
//       <span style={{ height: '100%', margin: '3px', backgroundColor: '#eee',
//                     display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer',
//             }}
//             onClick={onClick}
//             >

//         <img src={CLOUDE_URL_START+template.imageURL}
//           alt={template.templateName} 
//           style={{ maxWidth: '100%', maxHeight: '100%', transition: 'transform 0.3s ease' }} />
//       </span>

//       {isEditable && (
//         <Typography className="image-title" variant="subtitle1" sx={{ 
//             position: 'absolute',
//             bottom: 10,
//             left: 10,
//             color: '#25173b',
//             backgroundColor: 'transparent',
//             padding: '5px',
//             opacity: 1,
//             transition: 'opacity 0.3s ease', 
//             }}>
//           {template.templateName}
//         </Typography>
//       )}
  
//       {/* <ChoosingButton onClick={onClick} /> */}
  
//       {isEditable && (
//         <DeleteButton
//           // itemId={template.templateID}
//           uploaderId={template.userID}
//           currentUserId={currentUserId}
//           deleteFunc={() => deleteTemplate(template.templateID)}
//         />
//       )}
//     </StyledImageContainer>
//     );
//   }

//   export default TemplateItem;