import { createContext } from "react";

export interface StoreDataInterface {
    isAuthenticated: boolean
    authenticatedUserName: string
    timeData: object
    dateData: object
    greetData: string
}

export interface AppContext  {
    state: StoreDataInterface,
    dispatch: Function
} 


const Store = createContext(
    {} as AppContext
);


export default Store;