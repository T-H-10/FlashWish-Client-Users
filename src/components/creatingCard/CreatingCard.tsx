import { Box, Paper } from "@mui/material";
import CategoriesList from "../categories/CategoriesList";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { appDispatch } from "../../Store/Store";
import { fetchTemplates } from "../../Store/templatesStore/TemplatesApi";
import { selectTemplates } from "../../Store/templatesStore/TemplatesSlice";
import { Template } from "../../types/TemplateType";
import { CurrentCardContext } from "../../Store/cardReducer/CardReducer";
import LoadingIndicator from "../LoadingIndicator";
import EditableCanvas from "./editCanvas/EditableCanvas";
import { initialGreetingCardState } from "../../types/GreetingCardsTypes";

const CreatingCard = () => {
    const { currentCard, cardDispatch} = useContext(CurrentCardContext);
    const [selectedCategoryId, setSelectedCategoryId] = useState(1012);
    const dispatch = useDispatch<appDispatch>();
    const { templatesList, loading } = useSelector(selectTemplates);

    useEffect(() => {
        if (templatesList.length === 0) {
            dispatch(fetchTemplates());
        }
    }, [dispatch, templatesList.length]);

    useEffect(() => {
        if (currentCard && currentCard.templateID && templatesList.length > 0) {
            const template = templatesList.find((template: Template) => template.templateID === currentCard.templateID);
            if (template) {
                cardDispatch({
                    type: 'UPDATE_CARD',
                    data: {templateID: template.templateID}
                })
                // setCurrentTemplate(template);
            }
        }
    }, [currentCard.templateID, templatesList]);

    const getInitialContent=()=>{
        if(!currentCard || !currentCard.templateID){
            return initialGreetingCardState;
        } else{
            return currentCard;
        }
    };
    const initialCardData = getInitialContent();
    // currentTemplate=templatesList.find((template: Template)=>template.templateID===currentCard.templateID) || initialTemplate;
    // currentMessage=greetingMessagesList.find((message:GreetingMessage)=> message.textID===currentCard.textID) || initialMessage;
    // console.log(currentCard);

    // if (!loading) {
    //     currentTemplate = templatesList.find((template: Template) => template.templateID === currentCard.templateID) || initialTemplate;
    //     // currentMessage = greetingMessagesList.find((message: GreetingMessage) => message.textID === currentCard.textID) || initialMessage;
    // }
    return (
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
                    ) : (
                        <EditableCanvas cardData={initialCardData} />
                    )}
                </Paper>
            </Box >
        </>
    )
};
export default CreatingCard;