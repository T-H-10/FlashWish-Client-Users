import { Box, Paper } from "@mui/material";
import CategoriesList from "../categories/CategoriesList";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import EditableCanvas from "./EditableCanvas";

const CreatingCard = () => {
    const defaultTemplate = "https://res.cloudinary.com/dnschz6cr/image/upload/v1742676818/Flux_Schnell_Create_a_vibrant_and_whimsical_frame_design_for_a_3.jpeg.jpg"
    const [selectedCategoryId, setSelectedCategoryId] = useState(1012);

    return (
        //להוסיף הגדרת לפי גודל המסך שאם מידי קטן יהיה flex wrap.
        <>
            <Box display="flex" flexDirection={'row'} justifyContent="space-between" p={2} width={"100%"} marginTop={'100px'}>
                <Paper style={{ width: '50%', padding: '16px', }}>
                    <CategoriesList onCategorySelect={setSelectedCategoryId} />
                    <Outlet context={{ selectedCategoryId }} />
                </Paper>
                <Paper style={{ width: '70%', padding: '16px' }}>
                    {/* <h1> here will be the picture!</h1> */}
                    <EditableCanvas imageUrl={defaultTemplate} />
                </Paper>
            </Box >
        </>
    )
};
export default CreatingCard;