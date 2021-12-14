import AsyncStorage from "@react-native-async-storage/async-storage";


export const asyncSetItem = async (key: string, value: string): Promise<string | null> => {
    try {
        await AsyncStorage.setItem(key, value);
        return "Successful"
    } catch (error: any) {
        return null
    };
};

export const asyncGetItem = async (key: string): Promise<string | null> => {
    try {
        const savedData = await AsyncStorage.getItem(key);
        console.log("\n\t Async-getItem saved: ", savedData);
        return savedData;
    } catch (error: any) {
        return null
    };
};

export const asyncClearItem = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        //...
    }
};