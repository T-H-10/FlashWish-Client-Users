export type Template = {
    templateID: number,
    templateName: string,
    categoryID: number,
    userID: number,
    imageURL: string,
    createdAt: Date,
    updatedAt: Date
}
// הגדרת TemplatePostModel
export type TemplatePostModel = {
    templateName: string;     // שם התבנית
    categoryID: number;       // מזהה הקטגוריה
    userID: number;           // מזהה המשתמש
    image: File;         // URL לתמונה
}

// הגדרת שגיאה API
export type ApiError = {
    message: string;          // הודעת שגיאה
    status: number;           // קוד סטטוס HTTP של השגיאה
}

export type GreetingCard = {
    id: number;
    message: string; 
    createdAt: Date;
    userId: number;
}
export type Role = {
    id: number;
    name: string;
}