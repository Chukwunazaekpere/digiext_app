import React, { useEffect, useRef, FC } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'

interface Props {
    style?: any,
    animateElevationEndValue: number
    translationStartValue?: number

}

const TranslateY: FC<Props> = ({ children, style, animateElevationEndValue, translationStartValue }) => {
    const translateY = useRef(new Animated.Value(0)).current;
    const translateValues = translateY.interpolate({
        inputRange: [0, 5, 10],
        outputRange: [translationStartValue || -220, 45, 0],
    });

    const elevationValues = translateY.interpolate({
        inputRange: [0, 5, 10],
        outputRange: [80, 7, animateElevationEndValue],
    })
    useEffect(() => {
        Animated.timing(translateY, {
            useNativeDriver: true,
            toValue: 10,
            duration: 4000,
            delay: 200
        }).start();
    }, [])

    return (
        <Animated.View style={{elevation: elevationValues, transform: [{translateY: translateValues}]}} {...style} >
            {children}
        </Animated.View>
    );
};
const styles = StyleSheet.create({});
    
export default TranslateY;