import { Box, CircularProgress, Paper } from "@mui/material";
import CategoriesList from "../categories/CategoriesList";
import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import EditableCanvas from "./EditableCanvas";
import { useDispatch, useSelector } from "react-redux";
import { appDispatch } from "../../Store/Store";
import { fetchTemplates } from "../../Store/templatesStore/TemplatesApi";
import { CardContext } from "../../Store/cardReducer/CardContext";
import { selectTemplates } from "../../Store/templatesStore/TemplatesSlice";
import { initialTemplate, Template } from "../../types/TemplateType";

const CreatingCard = () => {
    const defaultTemplate = "https://res.cloudinary.com/dnschz6cr/image/upload/v1742676818/Flux_Schnell_Create_a_vibrant_and_whimsical_frame_design_for_a_3.jpeg.jpg"
    const [selectedCategoryId, setSelectedCategoryId] = useState(1012);
    const dispatch = useDispatch<appDispatch>();
    // const { cardDispatch } = useContext(CardContext);
    const currentCard = useContext(CardContext).card;
    const { templatesList, loading } = useSelector(selectTemplates);
    let currentTemplate:Template | undefined=initialTemplate;
    useEffect(()=>{
        if(!loading) return;
        dispatch(fetchTemplates())
    },[dispatch, loading]);

    console.log(currentCard);
    
    if(!loading){
        currentTemplate= templatesList.find((template: Template)=>template.templateID===currentCard.templateID);
    }
    return (
        //להוסיף הגדרת לפי גודל המסך שאם מידי קטן יהיה flex wrap.
        <>
            <Box display="flex" flexDirection={'row'} justifyContent="space-between" p={2} width={"100%"} marginTop={'100px'} flexWrap={'wrap'}>
                <Paper style={{ width: '90%', padding: '16px', }}>
                    <CategoriesList onCategorySelect={setSelectedCategoryId} />
                    <Outlet context={{ selectedCategoryId }} />
                </Paper>
                <Paper style={{ width: '90%', padding: '16px' }}>
                    {/* <h1> here will be the picture!</h1> */}
                    {loading? (
                        <CircularProgress/>
                    ):(

                        <EditableCanvas imageUrl={currentTemplate?.imageURL || defaultTemplate}/>
                    )}
                </Paper>
            </Box >
        </>
    )
};
export default CreatingCard;