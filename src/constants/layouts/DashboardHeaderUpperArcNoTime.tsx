import React, { FC, useEffect, useState, useRef, useContext } from 'react';

import { StyleSheet, Text, View, Animated } from 'react-native'
import ImageComponent from '../ImageComponent';
import UpperHemisphereLayout from './UpperHemisphereLayout'
import colors from '../../assets/colors';

import AppStore from "../../context/store/Store";
import { isAuthenticatedAction } from '../../context/actions/actions';

interface Props {
   
}

const DashboardHeaderUpperArc: FC<Props> = () => {
    const {TurboImage, RequetDispatchImage, RequetDispatchImage2, PriceChecker,SupportComplaint,DispatchHistory, TrackPackage } = ImageComponent;
   

    return (
        <View>
            <UpperHemisphereLayout style={{backgroundColor: colors.midnightBlue, alignItems: "center"}}>
                <TurboImage style={styles.headerImageStyle} />
               
                <View style={styles.cutter}>

                </View>
            </UpperHemisphereLayout>
        </View>
    );
};


const styles = StyleSheet.create({
    cutter: {
        borderWidth: 2,
        borderColor: colors.christmasRed,
        backgroundColor: colors.white,
        borderTopLeftRadius: 200,
        borderTopRightRadius: 200,
        width: 330,
        height: 46,
        borderBottomWidth: 0
    },
    headerImageStyle: {
        resizeMode: "contain",
        width: "70%",
        height: 50,
        marginTop: 50,
        marginLeft: 55
    }
});

export default DashboardHeaderUpperArc;