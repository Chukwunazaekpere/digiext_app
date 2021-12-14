import React, { FC } from 'react'
import { StyleSheet, Text, View, Dimensions, ViewProps } from 'react-native'
import colors from "../../assets/colors";

interface Props extends ViewProps {
    containerHeight?: number
    innerViewHeight?: number
}

const OvalLayout: FC<Props> = (props: Props) => {
    const { width, height } = Dimensions.get("screen");
    return (
        <View style={{...styles.container, backgroundColor: colors.mainBlue,flex: 1, height: props.containerHeight || 600, alignItems: "center",}}>
            <View style={{backgroundColor: colors.white, width: width/.87, height: props.innerViewHeight || height/1.5, borderRadius: 200, padding: 35}}>
                {props.children}
            </View>
        </View>
    )
}

export default OvalLayout

const styles = StyleSheet.create({
    container: {
        
    }
})
