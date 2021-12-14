import React from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import colors from '../assets/colors';
import MessageComponent from './MessageComponent';
import { Picker, PickerIOS } from "@react-native-picker/picker";

interface Props {
    pickerHeader: string
    pickerItemsArray: string[]
    error: boolean
    handleInputChange: (field: string,  value: string, detailType?: string)  => void
    errorDetail: string
    selectedValue: string
    field: string
    detailType: string
}

const PickerComponent = (props: Props) => {
    // console.log("\n\t PickerComponent: ", props.pickerItemsArray);
    
    return (
        <View>
            <Text style={styles.titleHeaderText}>
                {props.pickerHeader}
            </Text>
            {
                Platform.OS === "android" ?
                <View>
                    <Text style={styles.carriageTextTitle}>{props.pickerHeader}</Text>
                    {
                        props.error &&
                        <MessageComponent level="error" message={props.errorDetail} />
                    }
                    <TouchableOpacity style={styles.pickerContainer}>
                        <Picker style={styles.pickerStyle} selectedValue={props.selectedValue} 
                            onValueChange={(itemValue: string, itemIndex) => props.handleInputChange(props.field, itemValue, props.detailType)}>
                            {
                                props.pickerItemsArray.map(pickerItem => (
                                    <Picker.Item style={styles.pickerTextStyle} value={pickerItem} label={pickerItem} key={pickerItem} />
                                ))
                            }
                        </Picker>
                    </TouchableOpacity>
                </View>
                :
                <View>
                    <Text style={styles.carriageTextTitle}>{props.pickerHeader}</Text>
                    {
                        props.error &&
                        <MessageComponent level="error" message={props.errorDetail} />
                    }
                    <TouchableOpacity style={styles.pickerContainer}>
                        <PickerIOS style={styles.pickerStyle} selectedValue={props.selectedValue}
                            onValueChange={(itemValue: any, itemIndex) => props.handleInputChange(props.field, itemValue)}>
                            {
                                props.pickerItemsArray.map(pickerItem => (
                                    <Picker.Item style={styles.pickerTextStyle}  value={pickerItem} label={pickerItem} key={pickerItem} />
                                ))
                            }
                        </PickerIOS>
                    </TouchableOpacity>
                </View>
            }
        </View>
    )
}


const styles = StyleSheet.create({
    titleHeaderText: { 
        color: colors.white, 
        fontSize: 15, 
        fontWeight: "600", 
        textAlign: "center", 
        fontFamily: "Lora-Italic",
        elevation: 20
    },
    btnContainerStyle: {
        borderWidth: 2,
        borderColor: colors.flameRed,
        elevation: 10,
        marginHorizontal: 60,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: colors.midnightBlue,
        marginTop: 12
    },
    textContainerStyle: {
        color: colors.white,
        fontFamily: "Lora-Bold"
    },
    pickerContainer: {
        borderWidth: 2,
        borderRadius: 12,
        borderColor: colors.christmasRed,
        elevation: 7,
        backgroundColor: colors.light
    },
    pickerStyle: {
        borderRadius: 10,
        borderWidth: 2,
        elevation: 12,
        fontFamily: "Lora-MediumItalic",
        fontWeight: "600"
    },
    carriageTextTitle: {
        fontWeight: "900",
        fontSize: 15,
        color: colors.midnightBlue,
        marginTop: 5,
        marginBottom: 3,
        fontFamily: "Lora-MediumItalic",
    },
    pickerTextStyle: {
        marginRight: 7, 
        fontWeight: "600", 
        fontSize: 15, 
        fontFamily: "Lora-Bold"
    },
    responseValueText: {
        marginRight: 7, 
        fontWeight: "600", 
        fontSize: 14, 
        fontFamily: "Lora-MediumItalic"
    }
});

export default PickerComponent;