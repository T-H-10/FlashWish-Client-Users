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
    imageURL: 'v1746459089/logo.jpg.jpg', //להוסיף תחילת מחרוזת לבד - מפני בטיחות
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