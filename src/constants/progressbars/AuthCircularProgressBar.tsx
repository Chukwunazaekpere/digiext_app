import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, Animated, ViewProps } from 'react-native'

import Svg, { Circle } from "react-native-svg";
import colors from '../../assets/colors';

const CIRCULAR_CIRCUMFERENCE = 270;
const CIRCLE_RADIUS = String(CIRCULAR_CIRCUMFERENCE/(2*Math.PI));

interface Props extends ViewProps {
    style?: any
};

const { width, height } = Dimensions.get("screen");
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AuthCircularProgressBar = (props: Props) => {
    const stringifiedWidth = String(width/7); 
    const stringifiedHeight = String(height/20); 
    const [progressValue, setProgressValue] = useState(0)

    // console.log("\n\t SVG: ", stringifiedWidth, stringifiedHeight, CIRCLE_RADIUS);
    const progress = new Animated.Value(1);
    useEffect(() => {
        Animated.timing(progress, {
            useNativeDriver: true,
            toValue: 0,
            duration: 1000,
            delay: 200
        }).start();

        progress.addListener(e => setProgressValue(e.value));
        setTimeout(() => {
            progress.removeAllListeners();
        }, 3000);
    }, []);
    // console.log("\n\t Progress: ", 1*progressValue);
            
    const animatedProps = (() => ({
        strokeDashoffset: CIRCULAR_CIRCUMFERENCE*progressValue
    }));
    
    return (
        <Animated.View style={{...styles.container}} >
            <Svg style={{display: "flex", justifyContent: "center", position: "absolute"}} height={height} width={width/2} viewBox={`0 0 100 ${width}`}>
                <Text style={styles.counterStyle}>
                    {`${Math.floor(-1*((progressValue*100)-100))}%`}
                </Text>
                <Circle 
                    cx={stringifiedWidth}
                    cy={stringifiedHeight}
                    r={CIRCLE_RADIUS}
                    stroke={colors.secondary}
                    strokeWidth={10}
                />
                <AnimatedCircle 
                    cx={stringifiedWidth}
                    cy={stringifiedHeight}
                    r={CIRCLE_RADIUS}
                    stroke={colors.strokeColor}
                    strokeWidth={5}
                    strokeDasharray={CIRCULAR_CIRCUMFERENCE}
                    strokeLinecap="round"
                    {...animatedProps()}
                />
            </Svg>
        </Animated.View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center", 
        alignItems: "center", 
        position: "absolute", 
        marginTop: height/5,
        marginLeft: 170,
        elevation: 50
    },
    svgStyle: {
        flex: 1,
        display: "flex",
        alignItems: "center", 
        marginTop: height/2.2,
        justifyContent: "center", 
    },
    counterStyle: {
        textAlign: "center", 
        fontWeight: "bold", 
        fontSize: 30, 
        marginVertical: 90
    }
});

export default AuthCircularProgressBar;