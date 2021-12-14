import React from 'react'
import { Image } from 'react-native'

interface ImageProps {
    style?: any
}



const BrandLogo = (props: ImageProps) => <Image style={{...props.style}} source={require("../assets/images/digiext.jpg")}  />

const ImageComponent = {
    BrandLogo
};

export default ImageComponent;
