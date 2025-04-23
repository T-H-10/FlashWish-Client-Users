import { Typography } from "@mui/material";
import StyledImageContainer from "../style/StyledImageContainer";
import { Template } from "../../types/TemplateType";
import DeleteButton from "./DeleteButton";
import { deleteTemplate } from "../../Store/templatesStore-change/TemplatesApi";
import ChoosingButton from "../ChoosingButton";

const TemplateItem = ({ template, onClick, isEditable, currentUserId }:{ template:Template, onClick:Function, isEditable: boolean, currentUserId:number }) => (
    <StyledImageContainer width={{ xs: '100%', sm: '50%', md: '33.33%', lg: '25%' }}>
      <span style={{ height: '100%', margin: '3px', backgroundColor: '#eee',
                    display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}>
        <img src={template.imageURL} alt={template.templateName} style={{ maxWidth: '100%', maxHeight: '100%', transition: 'transform 0.3s ease' }} />
      </span>
  
      {isEditable && (
        <Typography className="image-title" variant="subtitle1" sx={{ 
            position: 'absolute',
            bottom: 10,
            left: 10,
            color: '#25173b',
            backgroundColor: 'transparent',
            padding: '5px',
            opacity: 1,
            transition: 'opacity 0.3s ease', 
            }}>
          {template.templateName}
        </Typography>
      )}
  
      <ChoosingButton onClick={onClick} />
  
      {isEditable && (
        <DeleteButton
          itemId={template.templateID}
          uploaderId={template.userID}
          currentUserId={currentUserId}
          deleteFunc={() => deleteTemplate(template.templateID)}
        />
      )}
    </StyledImageContainer>
  );

  export default TemplateItem;