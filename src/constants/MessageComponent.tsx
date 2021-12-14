import React, { FC } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

import colors from "../assets/colors";

interface Props extends TextProps {
    message: string
    level: "success" | "error" | "info"
    extraStyles?: any
    fontSize?: number
};

const messageLevel = (level: string) => {
    switch(level){
        case "success":
            return colors.success;
        case "error":
            return colors.danger
        case "info":
            return colors.info
        default:
            return colors.light

    }
}

const MessageComponent: FC<Props> = ({message, level, extraStyles, fontSize}) => {
    // console.log("\n\t Message component: ", message);
    
    return (
        <Text style={{color: messageLevel(level), textAlign: "center", marginBottom: 3, marginTop: 2, fontFamily: "Merriweather-Bold", fontSize: fontSize || 12}}>
            {message}
        </Text>
    );
};


const styles = StyleSheet.create({})

export default MessageComponent;