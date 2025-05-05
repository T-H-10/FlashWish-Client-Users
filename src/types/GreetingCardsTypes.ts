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
}

export let initialGreetingCardState:GreetingCard={
    cardID: -1,
    userID: 0,
    templateID: 0,
    textID: 0,
    categoryID: 0,
    canvasStyle: ''
}