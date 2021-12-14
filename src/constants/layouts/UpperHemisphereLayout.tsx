import React, { FC, ReactNode } from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';

interface Props extends ViewProps {
    children?: ReactNode
}

const CONTAINER_HEIGHT = 180;
const UpperHemisphereLayout: FC<Props> = (props: Props) => {
    return (
        <View style={[props.style]} >
            {props.children}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        height: CONTAINER_HEIGHT,
        alignItems: "center"

    },
    
});

export default UpperHemisphereLayout;