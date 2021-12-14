import {
    LOCAL_BASE_URL,
    REMOTE_BASE_URL
} from "react-native-dotenv";

const devEnvVariables ={
    LOCAL_BASE_URL,
    REMOTE_BASE_URL

}
const prodEnvVariables = {
    REMOTE_BASE_URL
}

export interface EnvsInterface {
    LOCAL_BASE_URL: string
    REMOTE_BASE_URL: string
}


export default __DEV__ ? devEnvVariables : prodEnvVariables;