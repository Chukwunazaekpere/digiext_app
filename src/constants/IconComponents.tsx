import React, { FC } from 'react'
import { StyleSheet, Text, View, } from 'react-native'
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons"
import Fontisto from "react-native-vector-icons/Fontisto";
import Entypo from "react-native-vector-icons/Entypo";
// import { IconProps } from 'react-native-elements';

interface Props {
    type: "material-icon" | "entypo" | "fontisto" | "evil-icons" | "material-community-icon" | "ant-design" | "font-awesome" | "ion-icons",
    name: string
    size: number
    style?: any
    color?: string
};

const iconType = (iconType: string) => {
    switch(iconType){
        case "material-icon":
            return MaterialIcons;
        case "material-community-icon":
            return MaterialCommunityIcons;
        case "ant-design":
            return AntDesign;
        case "font-awesome":
            return FontAwesome;
        case "ion-icons":
            return Ionicons;
        case "fontisto":
            return Fontisto;
        case "evil-icons":
            return Fontisto;
        case "entypo":
            return Entypo;
        default:
            return Feather;
    };
};

const IconComponents: FC<Props> = ({ type, name, size, color, style }) => {
    const Icon = iconType(type);
    return (
        <Icon name={name} size={size} {...style} color={color} />
    );
};



const styles = StyleSheet.create({});
export default IconComponents;