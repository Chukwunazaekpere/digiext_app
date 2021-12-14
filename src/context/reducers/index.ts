import { authReducer } from "./authReducers";
import { orderReducer } from "./orderReducers";

import { StoreDataInterface } from "../store/Store";
import { timeReducer, dateReducer, greetReducer } from "./timeDateReducer";

const reducers = [
    authReducer,
    orderReducer,
    timeReducer,
    dateReducer,
    greetReducer
];

const combinedReducer = (reducers: Function[]) => (state: StoreDataInterface, action: any) => {
    for(let re in reducers){
        state = reducers[re](state, action);
    };
    return state;
};

const rootReducer = combinedReducer(reducers);
export default rootReducer;
