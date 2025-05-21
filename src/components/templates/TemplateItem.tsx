import React, { useState } from "react";
import { Template } from "../../types/TemplateType";
import DeleteButton from "./DeleteButton";
import '../cssPages/templates/TemplateItem.css';
import { deleteTemplate } from "../../Store/templatesStore/TemplatesApi";

export const CLOUD_URL_START = import.meta.env.VITE_CLOUD_URL_START;

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
            src={CLOUD_URL_START + template.imageURL || "/placeholder.svg"}
            alt={template.templateName}
            className="template-image"
          />
          <div className="image-overlay">
            <span className="overlay-text">בחר</span>
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
