export type GreetingCardPostModel = {
    userID: number;
    templateID: number;
    textID: number;
    categoryID: number;
    canvasStyle: string   
}



export type GreetingCard={
    cardID: number;
    userID:number;
    templateID:number;
    textID: number;
    categoryID:number;
    canvasStyle: string
    // createdAt: Date;
    // updatedAt: Date;
}

export let initialGreetingCardState:GreetingCard={
    cardID: -1,
    userID: 0,
    templateID: 20,
    textID: 0,
    categoryID: 0,
    canvasStyle: ''
    // createdAt: new Date(Date.now()),
    // updatedAt: new Date(Date.now())
}