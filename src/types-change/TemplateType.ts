export type Template = {
    templateID: number,
    templateName: string,
    categoryID: number,
    userID: number,
    imageURL: string,
    // createdAt: Date,
    // updatedAt: Date
}
// הגדרת TemplatePostModel
export type TemplatePostModel = {
    templateName: string;     // שם
    categoryID: number;       // מזהה הקטגוריה
    userID: number;           // מזהה המשתמש
    image: File;         // URL לתמונה
}
export const initialTemplate:Template={
    templateID : 0,
    templateName: 'רקע ברירת מחדל',
    categoryID: 0,
    userID: 0,
    imageURL: 'https://res.cloudinary.com/dnschz6cr/image/upload/v1745241133/Flux_Schnell_Create_a_lush_and_naturalthemed_border_for_Sukkot_2.jpeg.jpg',
    // createdAt: new Date(Date.now()),
    // updatedAt: new Date(Date.now())
}

// הגדרת שגיאה API
export type ApiError = {
    message: string;          // הודעת שגיאה
    status: number;           // קוד סטטוס HTTP של השגיאה
}

// export type GreetingCard = {
//     id: number;
//     message: string; 
//     createdAt: Date;
//     userId: number;
// }
export type Role = {
    id: number;
    name: string;
}