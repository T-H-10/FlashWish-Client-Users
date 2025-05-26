import React, { useState } from "react";
import { Template } from "../../types/TemplateType";
import DeleteButton from "./DeleteButton";
import '../cssPages/templates/TemplateItem.css';
import { deleteTemplate } from "../../Store/templatesStore/TemplatesApi";
import MyAlert from "../style/MyAlert";

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

    const [alertData, setAlertData] = useState<{
      isOpen: boolean;
      title: string;
      message?: string;
      type: 'warning' | 'success';
      confirmText?: string;
      cancelText?: string;
      isConfirmation?: boolean;
      onConfirm?: () => void;
    }>({
      isOpen: false,
      title: '',
      type: 'warning'
    });

  const showConfirmation = (data: typeof alertData) => {
    console.log("showConfirmation called with data:", data);
    
    setAlertData({ ...data, isOpen: true });
  };

  return (
    <>
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
          <div className="card-actions">
          <DeleteButton
            uploaderId={template.userID}
            currentUserId={currentUserId}
            deleteFunc={() => deleteTemplate(template.templateID)} 
            showConfirmation={showConfirmation}        
            />
          </div>
        )}
      </div>
      
      <div className="template-glow"></div>
      
      <div className="template-decoration">
        <div className="decoration-star ds1"></div>
        <div className="decoration-star ds2"></div>
        <div className="decoration-star ds3"></div>
      </div>
    </div>
    <MyAlert
        isOpen={alertData.isOpen}
        title={alertData.title}
        message={alertData.message}
        type={alertData.type}
        confirmText={alertData.confirmText}
        cancelText={alertData.cancelText}
        onConfirm={() => {
          setAlertData(prev => ({ ...prev, isOpen: false }));
          if (alertData.onConfirm) alertData.onConfirm();
        }}
        onCancel={() => {
          setAlertData(prev => ({ ...prev, isOpen: false }));
        }}
        onClose={() => {
          setAlertData(prev => ({ ...prev, isOpen: false }));
        }}
      />
    </>
  );
};

export default TemplateItem;
