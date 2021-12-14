import React, { useReducer, FC, ReactNode } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import AppStore, {StoreDataInterface} from "../store/Store";
import combinedReducers from "../reducers";

interface Props {
    children: ReactNode
};

const AppContextProvider: FC<Props> = (props: Props) => {
    const initialState: StoreDataInterface = {
        isAuthenticated: false,
        authenticatedUserName: "",
        timeData: {},
        dateData: {},
        greetData: "",
    };
    
    const [ state, dispatch ] = useReducer(combinedReducers, initialState);

    return (
        <AppStore.Provider value={{state, dispatch}}>
            {props.children}
        </AppStore.Provider>
    );
};


const styles = StyleSheet.create({});

export default AppContextProvider;