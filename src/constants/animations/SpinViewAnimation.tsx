import React, {FC, useEffect, ReactNode, useRef, useLayoutEffect } from 'react';
import { Animated, } from 'react-native';

interface Props {
    children: ReactNode,
    
};

const SpinViewAnimation: FC<Props> = ({children}) => {
    let spinAnimation = useRef(new Animated.Value(0)).current;
    const spinValue = spinAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "-360deg"]
    });
    
    useEffect(() => {
        Animated.timing(spinAnimation, {
            useNativeDriver: true,
            toValue: 1,
            duration: 700,
            delay: 50
        }).start()
    }, [spinAnimation]);
    return (
        <Animated.View style={{flex: 1, transform: [{rotate: spinValue}]}}>
            {children}
        </Animated.View>
    );
};


export default SpinViewAnimation;