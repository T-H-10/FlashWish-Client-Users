import { Box } from "@mui/material";
import { Template } from "../../types/TemplateType";
import TemplateItem from "./TemplateItem";

const TemplatesGrid = ({ templates, onTemplateClick, isEditable, currentUserId }:{ templates: Template[], onTemplateClick: Function, isEditable: boolean, currentUserId: number }) => (
    <Box display="flex" flexWrap="wrap" justifyContent="space-around">
      {templates.length>0 && templates.map((template: Template) => (
        <TemplateItem
          key={template.templateID}
          template={template}
          onClick={() => onTemplateClick(template.templateID)}
          isEditable={isEditable}
          currentUserId={currentUserId}
        />
      ))}
    </Box>
  );
  export default TemplatesGrid;
  