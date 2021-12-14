import React, { FC, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, Animated, Easing, ViewProps } from 'react-native'

interface Props extends ViewProps {
    scaleEndValue?: number
}

const ScaleAnimation: FC<Props> = (props: Props) => {
    const scaleAnimation = useRef(new Animated.Value(0)).current;
    
    const scaleValues = scaleAnimation.interpolate({
        inputRange: [0, 1.5, 2],
        outputRange: [0, 1.2, props.scaleEndValue || 2],
    });

    useEffect(() => {
        Animated.timing(scaleAnimation,{
            useNativeDriver: true,
            toValue: 1,
            duration: 3500,
            delay: 200,
        }).start();
    }, []);

    return (
        <Animated.View {...props.style} style={{transform: [{scale: scaleValues}]}} > 
            {props.children}
        </Animated.View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        elevation: 100
    }
});

export default ScaleAnimation;