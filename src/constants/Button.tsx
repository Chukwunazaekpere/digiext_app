import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TouchableOpacityProps } from 'react-native'

import colors from "../assets/colors";

interface Props extends TouchableOpacityProps {
    btnText: string,
    // onPress: (),
    containerStyle?: any
    textStyle?: any
};

const Button = (props: Props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={{...props.containerStyle}}>
            <Text style={{
                    textAlign: "center",
                    ...props.textStyle
                    }}>
                    {props.btnText}
            </Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
   
});

export default Button;