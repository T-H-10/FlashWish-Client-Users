export type GreetingMessage = {
    textID: number;
    categoryID: number;
    title: string;
    content: string;
    signature: string;
    userID: number;
    createdAt: Date;
    updatedAt: Date;
}

export type GreetingMessagePostModel = {
    categoryID: number;
    title: string;
    content: string;
    signature: string;
    userID: number;
}
