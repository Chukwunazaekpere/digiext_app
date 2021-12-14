import React, { FC, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, Animated } from 'react-native'

interface Props {
    
};

const SpinAnimation: FC<Props> = ({ children }) => {
    const spinAnimation = useRef(new Animated.Value(0)).current;
    const spinValues = spinAnimation.interpolate({
        inputRange: [0, 20],
        outputRange: ["0deg", "360deg"]
    });

    useEffect(() => {
        Animated.timing(spinAnimation, {
            useNativeDriver: true,
            toValue: 20,
            duration: 2000,
            delay: 200
        }).start();
    });

    return (
        <Animated.View style={{transform: [{rotate: spinValues}]}}>
            {children}
        </Animated.View>
    );
};


const styles = StyleSheet.create({});

export default SpinAnimation;