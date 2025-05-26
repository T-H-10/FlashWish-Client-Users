import React from "react";
import { Template } from "../../types/TemplateType";
import TemplateItem from "./TemplateItem";
import "../cssPages/templates/TemplatesGrid.css";

interface TemplatesGridProps {
  templates: Template[];
  onTemplateClick: (templateId: number) => void;
  isEditable: boolean;
  currentUserId: number;
}

const TemplatesGrid: React.FC<TemplatesGridProps> = ({ 
  templates, 
  onTemplateClick, 
  isEditable, 
  currentUserId 
}) => {
  return (
    <div className="cosmic-templates-grid">
      {templates.map((template: Template) => (
        <TemplateItem
          key={template.templateID}
          template={template}
          onClick={() => onTemplateClick(template.templateID)}
          isEditable={isEditable}
          currentUserId={currentUserId}
        />
      ))}
    </div>
  );
};

export default TemplatesGrid;