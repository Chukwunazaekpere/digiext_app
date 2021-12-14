import React, { FC } from 'react'
import { ReactNode } from 'react'
import { StyleSheet, Text, View, ViewProps } from 'react-native'

interface Props extends ViewProps {
    children?: ReactNode,
    
}

const RowAlignment: FC<Props> = (props: Props) => {
    return (
        <View style={{flexDirection: "row"}} >
            {props.children}
        </View>
    );
};


const styles = StyleSheet.create({});

export default RowAlignment;