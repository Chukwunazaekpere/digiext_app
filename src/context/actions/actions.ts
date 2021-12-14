import { IsAuthInterface, 
    AuthenticatedUserInterface, 
    TimeInterface,
    DateInterface,
    GreetingInterface,
 } from "./actionTypes";

import { ActionTypes } from "./actionTypes";

export const isAuthenticatedAction = (authStatus: boolean) => {
    return <IsAuthInterface>({
    type: ActionTypes.IS_AUTHENTICATED,
    payload: authStatus
    });
};



export const authenticatedUserAction = (user: string) => {
    return <AuthenticatedUserInterface>({
    type: ActionTypes.AUTHENTICATED_USER,
    payload: user
    });
};


export const timeAction = (timeData: object) => {
    console.log("\n\t timeAction dispatched...");
    return <TimeInterface>({
    type: ActionTypes.TIME,
    payload: timeData
    });
};

export const dateAction = (dateData: object) => {
    console.log("\n\t dateAction dispatched...");
    return <DateInterface>({
    type: ActionTypes.DATE,
    payload: dateData
    });
};

export const greetAction = (paymentData: string) => {
    console.log("\n\t greetAction dispatched...");
    return <GreetingInterface>({
    type: ActionTypes.GREET,
    payload: paymentData
    });
};

