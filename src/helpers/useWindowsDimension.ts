import { useRef, useEffect, useState } from "react";
import { Dimensions } from "react-native";

const useScreenDimensions = () => {
    const defaultDimensions = useRef({
        width: Dimensions.get("screen").width,
        height: Dimensions.get("screen").height,
    }).current;

    const getAlteredDimensions = () => {
        defaultDimensions.width = Dimensions.get("screen").width
        defaultDimensions.height = Dimensions.get("screen").height
    }

    useEffect(() => {
        
    })
}