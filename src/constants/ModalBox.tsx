import React from 'react'
import { Modal, Dimensions, StyleSheet, Text, View, Image } from 'react-native'
import colors from '../assets/colors'
import Button from './Button'
import RowAlignment from './layouts/RowAlignment'

interface Props {
    data: any
    cancelText: string
    proceedText: string
    modalHeaderTitle: string
    modalStatus: boolean
    cancelAction: Function
    proceedAction: Function

}

const { width, height } = Dimensions.get("screen");
// const data = {} as 
const ModalBox = (props: Props) => {
    return (
        <Modal visible={props.modalStatus}  style={{backgroundColor: colors.midnightBlue}}>
            <View style={styles.modalStyle}>
                <Text style={{color: colors.light, fontSize: 15, fontWeight: "600", fontFamily: "Merriweather-Bold"}}>{props.modalHeaderTitle}</Text>
                <View style={{borderBottomWidth: 3, borderBottomColor: colors.flameRed, width: "100%", marginVertical: 7}}></View>
                <View>
                    {
                        Object.keys(props.data).map(detail => (
                            <RowAlignment style={{paddingVertical: 3,}} key={detail}>
                                {
                                    detail.toLowerCase().includes("image") ?
                                    <Image style={styles.packageImageStyle} source={{uri: `${props.data[detail]}`}} />
                                    :
                                    <RowAlignment>
                                        <Text style={{color: colors.light, fontSize: 14, fontWeight: "600", marginRight: 7, fontFamily: "Merriweather-Regular"}}>{detail}:</Text>
                                        <Text style={{color: colors.christmasRed, fontSize: 12, fontWeight: "600", fontFamily: "Merriweather-Bold", marginTop: 2}}>{props.data[detail]}</Text>
                                    </RowAlignment>
                                }
                            </RowAlignment>
                        ))
                    }
                </View>
                <View style={{borderBottomWidth: 3, borderBottomColor: colors.flameRed, width: "100%", marginVertical: 7}}></View>
                <RowAlignment style={styles.modalButtonAlignment}>
                    <Button 
                        btnText={props.cancelText} onPress={() => props.cancelAction(false)} 
                        containerStyle={{marginRight: 35}} 
                        textStyle={{...styles.textContainerStyle, color: colors.christmasRed}}
                    />
                    <Button 
                        btnText={props.proceedText} onPress={() => props.proceedAction(true)} 
                        containerStyle={{}} 
                        textStyle={{...styles.textContainerStyle, color: colors.success}}
                    />
                </RowAlignment>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    carriageTextTitle: {
        fontWeight: "bold",
        fontSize: 14,
        color: colors.midnightBlue,
        marginTop: 5,
        marginBottom: 3
    },
    waitingText: {
        fontWeight: "bold", 
        fontStyle: "italic", 
        fontSize: 15, 
        textAlign: "center", 
        marginTop: 10, 
        color: colors.steelBlue
    },
    modalStyle: {
        backgroundColor: colors.midnightBlue,
        alignItems: "center",
        // justifyContent: "center",
        marginTop: height/4.2,
        elevation: 12,
        marginHorizontal: 10,
        borderRadius: 12,
        paddingVertical: 5
    },
    modalButtonAlignment: {
        marginVertical: 5
    },
    textContainerStyle: {
        color: colors.white,
        fontFamily: "Merriweather-Regular"
    },
    packageImageStyle: {
        width: 200,
        height: 100, 
        resizeMode: "cover", 
        borderRadius: 12, 
        alignSelf: 'center'
    },
})

export default ModalBox;