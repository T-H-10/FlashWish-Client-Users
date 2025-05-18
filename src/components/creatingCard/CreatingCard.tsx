"use client"

import { useContext, useEffect, useState } from "react"
import { Box, Paper } from "@mui/material"
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import type { appDispatch } from "../../Store/Store"
import { fetchTemplates } from "../../Store/templatesStore/TemplatesApi"
import { selectTemplates } from "../../Store/templatesStore/TemplatesSlice"
import type { Template } from "../../types/TemplateType"
import { CurrentCardContext } from "../../Store/cardReducer/CardReducer"
import { initialGreetingCardState } from "../../types/GreetingCardsTypes"
import LoadingIndicator from "../LoadingIndicator"
import EditableCanvas from "./editCanvas/EditableCanvas"
import { COSMIC_COLORS } from "../../utils/Comsic-theme"
import CategoriesList from "../CategoriesList"

const CreatingCard = () => {
  const { currentCard, cardDispatch } = useContext(CurrentCardContext)
  const [selectedCategoryId, setSelectedCategoryId] = useState(1012)
  const dispatch = useDispatch<appDispatch>()
  const { templatesList, loading } = useSelector(selectTemplates)

  useEffect(() => {
    if (templatesList.length === 0) {
      dispatch(fetchTemplates())
    }
  }, [dispatch, templatesList.length])

  useEffect(() => {
    if (currentCard && currentCard.templateID && templatesList.length > 0) {
      const template = templatesList.find((template: Template) => template.templateID === currentCard.templateID)

      if (template) {
        cardDispatch({
          type: "UPDATE_CARD",
          data: { templateID: template.templateID },
        })
      }
    }
  }, [currentCard, templatesList, cardDispatch]) // Updated to include currentCard as a dependency

  const getInitialContent = () => {
    if (!currentCard || !currentCard.templateID) {
      return initialGreetingCardState
    } else {
      return currentCard
    }
  }

  const initialCardData = getInitialContent()

  return (
    <Box
      className={`
        min-h-screen pt-24 pb-12 px-4
        bg-gradient-to-b from-[${COSMIC_COLORS.primaryDark}] to-[${COSMIC_COLORS.primary}]
      `}
    >
      <div className="max-w-7xl mx-auto">
        <h1
          className={`
          text-3xl font-bold mb-8 text-center
          text-[${COSMIC_COLORS.textLight}]
          bg-clip-text text-transparent
          bg-gradient-to-r from-[${COSMIC_COLORS.secondary}] to-[${COSMIC_COLORS.secondaryLight}]
        `}
        >
          יצירת כרטיס ברכה
        </h1>

        <Box
          display="flex"
          flexDirection={{ xs: "column-reverse", md: "row" }}
          flexWrap={{ xs: "wrap", md: "nowrap" }}
          justifyContent="space-between"
          gap={4}
          width="100%"
        >
          <Paper
            elevation={6}
            className={`
              w-full max-w-[600px] p-4 rounded-xl
              bg-gradient-to-b from-[${COSMIC_COLORS.primary}] to-[${COSMIC_COLORS.primaryDark}]
              border border-[${COSMIC_COLORS.primaryLight}]
              shadow-xl
            `}
          >
            <CategoriesList onCategorySelect={setSelectedCategoryId} />
            <Outlet context={{ selectedCategoryId }} />
          </Paper>

          <Paper
            elevation={6}
            className={`
              w-full max-w-[600px] p-4 rounded-xl
              bg-gradient-to-b from-[${COSMIC_COLORS.primary}] to-[${COSMIC_COLORS.primaryDark}]
              border border-[${COSMIC_COLORS.primaryLight}]
              shadow-xl
            `}
          >
            {loading ? (
              <LoadingIndicator content="טוען תבניות..." />
            ) : (
              <EditableCanvas cardData={initialCardData} />
            )}
          </Paper>
        </Box>
      </div>

      {/* Cosmic background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1]">
        {/* Stars */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                opacity: Math.random() * 0.7 + 0.3,
                animation: `twinkle ${Math.random() * 5 + 3}s infinite alternate`,
              }}
            ></div>
          ))}
        </div>

        {/* Nebula */}
        <div
          className="absolute opacity-10"
          style={{
            top: "10%",
            left: "20%",
            width: "60%",
            height: "60%",
            background: `radial-gradient(ellipse at center, ${COSMIC_COLORS.cosmicPink} 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
        ></div>

        <div
          className="absolute opacity-10"
          style={{
            top: "30%",
            left: "50%",
            width: "70%",
            height: "40%",
            background: `radial-gradient(ellipse at center, ${COSMIC_COLORS.cosmicBlue} 0%, transparent 70%)`,
            filter: "blur(60px)",
          }}
        ></div>
      </div>
    </Box>
  )
}

export default CreatingCard


// import { Box, Paper } from "@mui/material";
// import CategoriesList from "../categories/CategoriesList";
// import { useContext, useEffect, useState } from "react";
// import { Outlet } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { appDispatch } from "../../Store/Store";
// import { fetchTemplates } from "../../Store/templatesStore/TemplatesApi";
// import { selectTemplates } from "../../Store/templatesStore/TemplatesSlice";
// import { Template } from "../../types/TemplateType";
// import { CurrentCardContext } from "../../Store/cardReducer/CardReducer";
// import LoadingIndicator from "../LoadingIndicator";
// import EditableCanvas from "./editCanvas/EditableCanvas";
// import { initialGreetingCardState } from "../../types/GreetingCardsTypes";

// const CreatingCard = () => {
//     const { currentCard, cardDispatch} = useContext(CurrentCardContext);
//     const [selectedCategoryId, setSelectedCategoryId] = useState(1012);//change it!!!
//     const dispatch = useDispatch<appDispatch>();
//     const { templatesList, loading } = useSelector(selectTemplates);

//     useEffect(() => {
//         if (templatesList.length === 0) {
//             dispatch(fetchTemplates());
//         }
//     }, [dispatch, templatesList.length]);

//     useEffect(() => {
//         if (currentCard && currentCard.templateID && templatesList.length > 0) {
//             const template = templatesList.find((template: Template) => template.templateID === currentCard.templateID);
//             if (template) {
//                 cardDispatch({
//                     type: 'UPDATE_CARD',
//                     data: {templateID: template.templateID}
//                 })
//             }
//         }
//     }, [currentCard.templateID, templatesList]);

//     const getInitialContent=()=>{
//         if(!currentCard || !currentCard.templateID){
//             return initialGreetingCardState;
//         } else{
//             return currentCard;
//         }
//     };
//     const initialCardData = getInitialContent();
//     return (
//         <>
//             <Box
//                 display="flex"
//                 flexDirection={{ xs: 'column-reverse', md: 'row' }}
//                 flexWrap={{ xs: 'wrap', md: 'nowrap' }}
//                 justifyContent="space-between"
//                 p={2}
//                 width="100%"
//                 marginTop={'100px'}
//             >
//                 <Paper style={{ width: '100%',marginBottom: '16px', maxWidth: '600px', padding: '16px', }}>
//                     <CategoriesList onCategorySelect={setSelectedCategoryId} />
//                     <Outlet context={{ selectedCategoryId }} />
//                 </Paper>
//                 <Paper style={{ width: '100%',maxWidth:'600px', padding: '16px' }}>
//                     {loading ? (
//                         <LoadingIndicator content='' />
//                     ) : (
//                         <EditableCanvas cardData={initialCardData} />
//                     )}
//                 </Paper>
//             </Box >
//         </>
//     )
// };
// export default CreatingCard;