import { BackHandler, Alert } from 'react-native';

export const backAction = () => {
    Alert.alert("Exit Digiext", "Would you like to close the app?",
    [
        {
            text: "Yes",
            onPress: () => BackHandler.exitApp(),
        },
        {
            text: "Cancel",
            onPress: () => null
        }

    ]);
    return true
};


