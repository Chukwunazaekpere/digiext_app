import React, { useEffect, useRef, FC } from 'react'
import { useState } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native'

interface Props {
    style?: any
};

const ImageAnimator:FC<Props> = (props: Props) => {
    let animtionStartValue = 0;
    const animteImage = useRef(new Animated.Value(animtionStartValue)).current;
    const [showFirstImage, setShowFirstImage] = useState(true);

    useEffect(() => {
        Animated.timing(animteImage, {
            useNativeDriver: true,
            toValue: 1,
            duration: 7000,
            delay: 100
        }).start();
        // console.log("\n\t Effect....", animteImage);
        
    }, [showFirstImage]);

    const [showSecondImage, setShowSecondImage] = useState(false);
    const [showThirdImage, setShowThirdImage] = useState(false);

    const hideFirstShowSecondImage = (firstImageStatus: boolean, secondImageStatus: boolean) => {
        setTimeout(() => {
            setShowFirstImage(firstImageStatus);
            setShowSecondImage(secondImageStatus);
        }, 3000);
        // console.log("\n\t showFirstImage-First: ", animteImage);
    };

    const loopImages = () => {
        setTimeout(() => {
            setShowSecondImage(false);
            setShowThirdImage(true);
        }, 2500);
        // console.log("\n\t showFirstImage: ", showFirstImage, animteImage);
        setTimeout(() => {
            animteImage.setValue(0);
        }, 4500);
    };

    return (
        <Animated.View style={{elevation: 300, alignItems: "center"}} {...props.style} >
            
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    imageStyle: {
        resizeMode: "contain",
        height: 100,
        width: 250,
        borderRadius: 15,
        marginTop: -50
    }
});

export default ImageAnimator;