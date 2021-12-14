import React, { useEffect, useRef, FC } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'

interface Props {
    style?: any
    animationDuration: number
}

const LeftTranslateAnimator: FC<Props> = ({ children, style, animationDuration }) => {
    const translateX = useRef(new Animated.Value(0)).current;
    const translateValues = translateX.interpolate({
        inputRange: [0, 5, 10],
        outputRange: [-80, 80, 0],
    });

    useEffect(() => {
        Animated.timing(translateX, {
            useNativeDriver: true,
            toValue: 10,
            duration: animationDuration,
            delay: 200
        }).start();
    }, []);

    return (
        <Animated.View style={{transform: [{translateX: translateValues}]}} {...style} >
            {children}
        </Animated.View>
    );
};
const styles = StyleSheet.create({})
    
export default LeftTranslateAnimator;