import React, { FC } from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';
import colors from '../../assets/colors';

interface Props extends ViewProps {
    elevetion?: number,
    backgroundColor?: string,
    cutterHeight?: number,
    marginTop?: number,
    width?: number,

    style?: any,
    containerHeight?: number
    outerContainerColor?: string
};

const CONTAINER_HEIGHT = 180;

const LowerHemisphereLayout: FC<Props> = (props: Props) => {
    return (
        <View style={{ elevation: props.elevetion, height: props.containerHeight || CONTAINER_HEIGHT, backgroundColor: props.outerContainerColor || colors.mainBlue, ...styles.container,}}>
            <View {...props.style} style={{...styles.cutter, width: props.width || 310, marginTop: props.marginTop || CONTAINER_HEIGHT/2,  backgroundColor: props.backgroundColor || colors.mainBlue, borderColor: colors.strokeColor, borderWidth: 2, height: props.cutterHeight || undefined}}>
                {props.children}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        transform: [{rotate: "180deg"}],
    },
    cutter: {
        // elevation: 10,
    }
});

export default LowerHemisphereLayout;