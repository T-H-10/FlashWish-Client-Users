export type GreetingMessage = {
    textID: number;
    categoryID: number;
    title: string;
    content: string;
    signature: string;
    userID: number;
}


export type GreetingMessagePostModel = {
    categoryID: number;
    title: string;
    content: string;
    signature: string;
    userID: number;
}

export const initialMessage: GreetingMessage={
    textID: 0,
    categoryID: 0,
    title: 'כותרת',
    content: 'תוכן',
    signature: 'חתימה',
    userID: 0
}

