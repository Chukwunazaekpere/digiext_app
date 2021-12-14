import React, { FC } from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';

import colors from "../assets/colors";
interface Props {
    showFirstDot: boolean
    showSecondDot: boolean
    showThirdDot: boolean
    style?: any
};

const FormMap: FC<Props> = ({ showFirstDot, showSecondDot, showThirdDot, style}) => {
    const InnerDot = () => <View style={styles.innerDot}></View>
    
    return (
        <View style={{...styles.formMapContainer }} {...style} >
            <View style={styles.dotContainer}>
                <View style={styles.outerDots}>
                    {
                        showFirstDot &&
                        <InnerDot />
                    }
                </View>
                <View style={styles.lineConnector}></View>
            </View>
            <View style={styles.dotContainer}>
                <View style={styles.outerDots}>
                    {
                        showSecondDot &&
                        <InnerDot />
                    }
                </View>
                <View style={styles.lineConnector}></View>
            </View>
            <View>
                <View style={styles.outerDots}>
                    {
                        showThirdDot &&
                        <InnerDot />
                    }
                </View>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    formMapContainer: {
        marginTop: 7, 
        justifyContent: "space-between", 
        alignItems: "center", 
        flexDirection: "row", 
        paddingHorizontal: 15
    },
    dotContainer: {
        flexDirection: "row", 
        alignItems: "center", 
        width: "40%"
    },
    outerDots: {
        backgroundColor: colors.white, 
        borderWidth: 1, 
        borderRadius: 50, 
        height: 37, 
        width: 37, 
        borderColor: colors.mainBlue, 
        justifyContent: "center", 
        alignItems: "center"
    },
    innerDot: {
        backgroundColor: colors.mainBlue, 
        borderRadius: 50, 
        height: 25, 
        width: 25, 
        borderColor: colors.mainBlue
    },
    lineConnector: {
        borderTopWidth: 2, 
        width: "90%", 
        borderTopColor: colors.mainBlue
    }

});

export default FormMap;