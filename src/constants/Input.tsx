import React, { FC } from 'react'
import { StyleSheet, TextInputProps, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native'

interface Props extends TextInputProps {
    // onChangeText: (text: string) => void
    // style?: any,
    // placeholder: string
};

const Input: FC<Props> = (props: TextInputProps) => {
    return (
        <TextInput 
            spellCheck={props.spellCheck} 
            multiline={props.multiline} 
            numberOfLines={props.numberOfLines} 
            autoCapitalize={props.autoCapitalize}
            keyboardType={props.keyboardType} 
            secureTextEntry={props.secureTextEntry} 
            placeholder={props.placeholder} 
            style={[props.style]} 
            onChangeText={props.onChangeText} 
        />
    );
};

export default Input;