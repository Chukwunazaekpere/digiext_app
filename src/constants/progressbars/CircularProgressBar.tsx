import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, Image, View, Dimensions, Animated, StatusBar, StatusBarIOS } from 'react-native'

import ImageComponent from '../ImageComponent';
import Svg, { Circle } from "react-native-svg";
import colors from '../../assets/colors';

const CIRCULAR_CIRCUMFERENCE = 250;
const CIRCLE_RADIUS = String(CIRCULAR_CIRCUMFERENCE/(2*Math.PI));

interface Props {
    
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const { width, height } = Dimensions.get("screen");
const CircularProgressBar = (props: Props) => {
    // console.log("\n\t Dimensions: ",width, height);
    
    const stringifiedWidth = String(width/7); 
    const stringifiedHeight = String(height/20); 
    const [progressValue, setProgressValue] = useState(0);
    const { BrandLogo } = ImageComponent;

    const progress = new Animated.Value(1);
    useEffect(() => {
        Animated.timing(progress, {
            useNativeDriver: true,
            toValue: 0,
            duration: 2000,
            delay: 200
        }).start();

        progress.addListener(e => setProgressValue(e.value));
        setTimeout(() => {
            progress.removeAllListeners();
        }, 3000);
    }, []);
            
    const animatedProps = (() => ({
        strokeDashoffset: CIRCULAR_CIRCUMFERENCE*progressValue
    }));
    
    return (
        <Animated.View style={styles.container}>
            <StatusBar backgroundColor={colors.mainBlue} />
            <BrandLogo style={styles.imageStyle} />
            <Svg style={styles.svgStyle}  height={height} width={width/1.4} viewBox={`0 ${height/40} 100 ${width/3}`}>
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
                    origin={230}
                />
            </Svg>
        </Animated.View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        justifyContent: "center", 
        alignItems: "center",
    },
    svgStyle: {
        flex: 1,
        display: "flex",
        alignItems: "center", 
        marginTop: height/2.2,
        justifyContent: "center", 
    },
    imageStyle: {
        resizeMode: "contain",
        width: width-230,
        height: 100,
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute"

    }
});

export default CircularProgressBar;