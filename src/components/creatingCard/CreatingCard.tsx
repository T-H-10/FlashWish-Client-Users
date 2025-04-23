import { Box, Paper } from "@mui/material";
import CategoriesList from "../categories/CategoriesList";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import EditableCanvas from "./EditableCanvas";
import { useDispatch, useSelector } from "react-redux";
import { appDispatch } from "../../Store/Store";
import { fetchTemplates } from "../../Store/templatesStore-change/TemplatesApi";
import { selectTemplates } from "../../Store/templatesStore-change/TemplatesSlice";
import { initialTemplate, Template } from "../../types/TemplateType";
import { CurrentCardContext } from "../../Store/cardReducer/CardReducer";
import LoadingIndicator from "../LoadingIndicator";

const CreatingCard = () => {
    const defaultTemplate = "https://res.cloudinary.com/dnschz6cr/image/upload/v1745237681/Flux_Dev_Create_a_stunning_and_intricately_designed_background_3.jpeg.jpg";//לשנות ניתוב לניתוב דפולטיבי

    const [selectedCategoryId, setSelectedCategoryId] = useState(1012);
    const [currentTemplate, setCurrentTemplate] = useState<Template>(initialTemplate);

    const dispatch = useDispatch<appDispatch>();
    // const { cardDispatch } = useContext(CardContext);
    // const currentCard = useContext(CardContext).card;
    const { templatesList, loading } = useSelector(selectTemplates);
    // const { greetingMessagesList } = useSelector(selectGreetingMessages);
    const { currentCard } = useContext(CurrentCardContext);
    // let currentTemplate: Template = initialTemplate;

    useEffect(() => {
        if (templatesList.length === 0) {
            dispatch(fetchTemplates());
        }
        // if (!loading) return;
        // dispatch(fetchGreetingMessages());
    }, [dispatch, templatesList.length]);

    useEffect(() => {
        if (currentCard.templateID && templatesList.length > 0) {
            const template = templatesList.find((template: Template) => template.templateID === currentCard.templateID);
            if (template) {
                setCurrentTemplate(template);
            }
        }
    }, [currentCard.templateID, templatesList]);
    // currentTemplate=templatesList.find((template: Template)=>template.templateID===currentCard.templateID) || initialTemplate;
    // currentMessage=greetingMessagesList.find((message:GreetingMessage)=> message.textID===currentCard.textID) || initialMessage;
    // console.log(currentCard);

    // if (!loading) {
    //     currentTemplate = templatesList.find((template: Template) => template.templateID === currentCard.templateID) || initialTemplate;
    //     // currentMessage = greetingMessagesList.find((message: GreetingMessage) => message.textID === currentCard.textID) || initialMessage;
    // }
    return (
        //להוסיף הגדרת לפי גודל המסך שאם מידי קטן יהיה flex wrap.
        <>
            <Box
                display="flex"
                flexDirection={{ xs: 'column-reverse', md: 'row' }}
                flexWrap={{ xs: 'wrap', md: 'nowrap' }}
                justifyContent="space-between"
                p={2}
                width="100%"
                marginTop={'100px'}
            >
                <Paper style={{ width: '100%',marginBottom: '16px', maxWidth: '600px', padding: '16px', }}>
                    <CategoriesList onCategorySelect={setSelectedCategoryId} />
                    <Outlet context={{ selectedCategoryId }} />
                </Paper>
                <Paper style={{ width: '100%',maxWidth:'600px', padding: '16px' }}>
                    {loading ? (
                        <LoadingIndicator content='' />
                        // <CircularProgress />
                    ) : (
                        <EditableCanvas imageUrl={currentTemplate?.imageURL || defaultTemplate} />
                    )}
                </Paper>
            </Box >
        </>
    )
};
export default CreatingCard;