import { IsAuthInterface, ActionTypes, AuthenticatedUserInterface, RecordOrderIdInterface } from "../actions/actionTypes";
import Store from "../store/Store";

import { StoreDataInterface } from "../store/Store";

export const authReducer = (store: StoreDataInterface, action: IsAuthInterface | AuthenticatedUserInterface) => {
    switch(action.type){
        case ActionTypes.IS_AUTHENTICATED:
            store.isAuthenticated = action.payload as boolean;
            return({
                ...store
            });
        case ActionTypes.AUTHENTICATED_USER:
            store.authenticatedUserName = action.payload as string;
            return({
                ...store
            });
        default:
            return({
            ...store
        });

    };
};

