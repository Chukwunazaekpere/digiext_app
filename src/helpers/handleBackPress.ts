import { BackHandler, Alert } from "react-native";

export const handleHardwareBackPress = () => {
    Alert.alert("Exit Crearld?", "Would you like to close the app?",[
        {
            text: "Yes",
            onPress: () => BackHandler.exitApp()
        },
        {
            text: "No",
            onPress: () => null
        }
    ]);
    return true
};


export const notifyLogout = (action: (route: string) => void) => {
    Alert.alert("Log out?", "Logging out would erase all your data from the app:", [
        {
            text: "Continue",
            onPress: () => action("onboarding")
        },
        {
            text: "Cancel",
            onPress: () => null
        }
    ]); 
    return true
}