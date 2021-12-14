import {ActionTypes, RecordOrderIdInterface, PaymentDataInterface, PickupFromUserInterface } from "../actions/actionTypes";

import { StoreDataInterface } from "../store/Store";

export const orderReducer = (store: StoreDataInterface, action: RecordOrderIdInterface | PaymentDataInterface | PickupFromUserInterface) => {
    switch(action.type){
        case ActionTypes.RECORD_ORDER_ID:
            store.orderId = action.payload as number;
            console.log("\n\t Order Reducer RECORD_ORDER_ID: ", action.payload, " ", store.orderId);
            return<StoreDataInterface>({
                ...store,
                orderId: action.payload
            });
        case ActionTypes.DATA_FOR_PAYMENT:
            store.dataForPayment = action.payload as any;
            console.log("\n\t Order Reducer DATA_FOR_PAYMENT: ", action.payload, " ", store.orderId);
            return<StoreDataInterface>({
                ...store,
            });
        case ActionTypes.PICKUP_FROM_USER:
            store.pickupFromUser = action.payload as boolean;
            console.log("\n\t Order Reducer PICKUP_FROM_USER: ", action.payload, " ", store.orderId);
            return<StoreDataInterface>({
                ...store,
            });
        default:
            return({
            ...store
        });

    };
};