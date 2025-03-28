export type GreetingCardPostModel = {
    userID: number;
    TemplateID: number;
    TextID: number;
    CategoryID: number;
}



export type GreetingCard={
    cardID: number;
    userID:number;
    templateID:number;
    textID: number;
    categoryID:number;
    // createdAt: Date;
    // updatedAt: Date;
}

export let initialGreetingCardState:GreetingCard={
    cardID: 0,
    userID: 0,
    templateID: 20,
    textID: 0,
    categoryID: 0,
    // createdAt: new Date(Date.now()),
    // updatedAt: new Date(Date.now())
}