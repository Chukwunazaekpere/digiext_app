import React, { useEffect, useRef, FC } from 'react';
import { StyleSheet, Text, View, Animated, ViewProps } from 'react-native';

interface Props extends ViewProps {

}

const FadeAnimation: FC<Props> = ({ children, style }) => {
    const fadeAnimation = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        Animated.timing(fadeAnimation, {
            useNativeDriver: true,
            toValue: 1,
            duration: 7000
        }).start();
    });

    return (
        <Animated.View style={{opacity: fadeAnimation,}} {...style} >
            {children}
        </Animated.View>
    );
};


const styles = StyleSheet.create({});

export default FadeAnimation;