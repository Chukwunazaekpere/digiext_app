import React, { ReactNode, useRef, useState, useEffect, FC } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'

interface Props {
    children: ReactNode
}

const ScaleAnimationInterval: FC<Props> = (props: Props) => {
    const animation = useRef(new Animated.Value(0)).current;
    const animationValues = animation.interpolate({
        inputRange: [0, 4, 10],
        outputRange: [0, 2, 1]
    });

    useEffect(() => {
        Animated.timing(animation, {
            useNativeDriver: true,
            toValue: 1,
            duration: 3000,
            delay: 100
        }).start();

        // setInterval(() => {
        //     setIntervalReset(!intervalReset);
        //     animation.setValue(0);
        // }, 5000);
    }, []);

    return (
        <Animated.View style={{transform: [{scale: animationValues}]}}>
            {props.children}
        </Animated.View>
    );
};

export default ScaleAnimationInterval

const styles = StyleSheet.create({})
