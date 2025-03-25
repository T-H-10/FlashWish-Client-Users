export type GreetingCardPostModel = {
    userID: number;
    TemplateID: number;
    TextID: number;
    CategoryID: number;
}

export type GreetingMessageDTO = {
    TextID: number;
    CategoryID: number;
    Title: string;
    Content: string;
    Signature: string;
    UserID: number;
    CreatedAt: Date;
    UpdatedAt: Date;
}
