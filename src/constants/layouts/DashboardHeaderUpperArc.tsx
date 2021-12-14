import React, { FC, useEffect, useState, useRef, useContext } from 'react';

import { StyleSheet, Text, View, Animated, ViewProps, ImageBackground } from 'react-native';
import ImageComponent from '../ImageComponent';
import UpperHemisphereLayout from './UpperHemisphereLayout';
import colors from '../../assets/colors';
import AsyncStorage from "@react-native-async-storage/async-storage";

import RowAlignment from "./RowAlignment"
import { asyncGetItem } from '../../helpers/asyncStorage';

interface Props extends ViewProps {
    timeData: {actualHour: any, actualMinute: any, AmPmStatus: any}
    dateData: {dayOfTheWeek: any, todaysDate: any, monthOfTheYear: any, thisYear: any}
    greetData: string
}

const DashboardHeaderUpperArc: FC<Props> = (props: Props) => {
    const { BrandLogo } = ImageComponent;
    const [userName, setUserName] = useState("");

    const setVariarbles = async () => {
        if(!userName){
            const authenticatedUserName = await asyncGetItem("authenticatedUserName");
            setUserName(authenticatedUserName as string);
        };
    };
    
    useEffect(() => {
        setVariarbles();
    }, []);
    return (
        <View style={[props.style]}>
            <ImageBackground resizeMode="cover" source={require("../../assets/images/worlds_map.jpeg")} style={{}}>
                <UpperHemisphereLayout style={{alignItems: "center", height: 300, elevation: 20, }}>
                    <View style={styles.headerImageStyle} />
                    <RowAlignment style={{justifyContent: "space-evenly",}}>
                        <View style={{width: "69%"}}>
                            <Animated.Text style={styles.greetingText}>{props.greetData},</Animated.Text>
                            <Text style={styles.nameText}>{ userName.replace(" ", "\n") }</Text>
                        </View>
                        <View style={{}}>
                            <Animated.Text style={{...styles.dateText, marginTop: 0}}>{props.dateData.dayOfTheWeek}, {props.dateData.todaysDate}</Animated.Text>
                            <Animated.Text style={styles.dateText}>{props.dateData.monthOfTheYear}, {props.dateData.thisYear}.</Animated.Text>
                            <Animated.Text style={styles.dateText}>{props.timeData.actualHour}:{props.timeData.actualMinute} {props.timeData.AmPmStatus}</Animated.Text>
                        </View>
                    </RowAlignment>
                    <View style={styles.cutter}></View>
                </UpperHemisphereLayout>
            </ImageBackground>
        </View>
    );
};


const styles = StyleSheet.create({
    greetingDateTimeContainer: {
        width: "100%", 
        flexDirection: "row", 
        justifyContent: "center", 
        // paddingHorizontal: 12, 
        alignItems: "center", 
        paddingVertical: 10
    },
    cutter: {
        borderWidth: 2,
        borderColor: colors.mainBlue,
        backgroundColor: colors.white,
        borderTopLeftRadius: 700,
        borderTopRightRadius: 700,
        width: 900,
        height: 900
    },
    userDashboardTitle: {
        width: "100%", 
        paddingHorizontal: 12, 
        justifyContent: "space-between",
        flexDirection: "row"
    },
    greetingText: {
        color: colors.white, 
        fontSize: 13, 
        fontFamily: "Lora-MediumItalic",
        fontWeight: "600",
    },
    nameText: {
        width: "100%", 
        color: colors.white, 
        fontSize: 15, 
        fontWeight: "600",
        fontFamily: "Lora-BoldItalic",
    },
    dateText: {
        // width: "100%", 
        color: colors.white, 
        fontSize: 13, 
        fontWeight: "600",
        fontFamily: "Lora-Italic",
        // marginRight: 7

    },
    headerImageStyle: {
        resizeMode: "contain",
        width: "70%",
        height: 50,
        marginTop: 30,
        marginLeft: 55
    }
});

export default DashboardHeaderUpperArc;