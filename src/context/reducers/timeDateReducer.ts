import { ActionTypes, TimeInterface, DateInterface, GreetingInterface } from "../actions/actionTypes";

import { StoreDataInterface } from "../store/Store";


export const timeReducer = (store: StoreDataInterface, action: TimeInterface) => {
    switch(action.type){
        case ActionTypes.TIME:
            store.timeData = action.payload as object;
            console.log("\n\t Called time: ", action.payload);
            return({
                ...store
            });
        default:
            return({
            ...store
        });
    };
};


export const dateReducer = (store: StoreDataInterface, action: DateInterface) => {
    switch(action.type){
        case ActionTypes.DATE:
            store.dateData = action.payload as object;
            console.log("\n\t Called date: ", action.payload);
            return({
                ...store
            });
        default:
            return({
            ...store
        });
    };
};


export const greetReducer = (store: StoreDataInterface, action: GreetingInterface) => {
    switch(action.type){
        case ActionTypes.GREET:
            store.greetData = action.payload as string;
            console.log("\n\t Called greeter: ", action.payload);
            return({
                ...store
            });
        default:
            return({
            ...store
        });
    };
};

