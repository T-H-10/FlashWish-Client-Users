import { Template } from "../../Types/TemplateType";

const TemplateCard = ({ template, onSelect }:{template: Template, onSelect: Function}) => {
    return (
        <div onClick={() => onSelect(template)}>
            <h3>{template.templateName}</h3>
            <img src={template.imageURL} alt={template.templateName} />
        </div>
    );
};

export default TemplateCard;
