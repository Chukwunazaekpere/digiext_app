
export enum ActionTypes  {
    IS_AUTHENTICATED = "IS_AUTHENTICATED",
    AUTHENTICATED_USER = "AUTHENTICATED_USER",
    TIME = "TIME",
    DATE = "DATE",
    GREET = "GREET",
}

export interface IsAuthInterface {
    type: string
    payload: boolean
} 

export interface AuthenticatedUserInterface {
    type: string
    payload: string
}


export interface TimeInterface {
    type: string
    payload: object
}


export interface DateInterface {
    type: string
    payload: object
}


export interface GreetingInterface {
    type: string
    payload: string
}
