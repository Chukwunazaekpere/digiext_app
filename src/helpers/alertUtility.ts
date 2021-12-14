import { Alert } from "react-native"

export const alertUtility = (messageTitle: string, message: string, confirmText: string, confirmActionFunction: Function, cancelText: string, cancelActionFunction: Function) => {
    Alert.alert(messageTitle, message,
    [
        {
            text: confirmText,
            onPress: () => confirmActionFunction(),
        },
        {
            text: cancelText,
            onPress: () => cancelActionFunction(),
        }
    ])
}
