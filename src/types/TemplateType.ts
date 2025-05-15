export type Template = {
    templateID: number,
    templateName: string,
    categoryID: number,
    userID: number,
    imageURL: string,
}
export type TemplatePostModel = {
    templateName: string;    
    categoryID: number;   
    userID: number;           
    image: File;         
}
export const initialTemplate:Template={
    templateID : 0,
    templateName: 'רקע ברירת מחדל',
    categoryID: 0,
    userID: 0,
    imageURL: 'https://res.cloudinary.com/dnschz6cr/image/upload/v1745241133/Flux_Schnell_Create_a_lush_and_naturalthemed_border_for_Sukkot_2.jpeg.jpg', //להוסיף תחילת מחרוזת לבד - מפני בטיחות
}

// הגדרת שגיאה API
export type ApiError = {
    message: string;          // הודעת שגיאה
    status: number;           // קוד סטטוס HTTP של השגיאה
}


export type Role = {
    id: number;
    name: string;
}