import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


import { StatusBar } from 'react-native';
import colors from '../../../assets/colors';
import SpinViewAnimation from '../../../constants/animations/SpinViewAnimation';
import IconComponents from '../../../constants/IconComponents';
import { asyncClearItem } from '../../../helpers/asyncStorage';
import { notifyLogout } from '../../../helpers/handleBackPress';


interface Props {
    
};

const DashboardSettings: FC<Props> = (props: Props) => {
    const { navigate } = useNavigation();

    const settingsMenu = ["Edit profile", "Security", "Help", "Logout"];
    const icons = ["account-circle", "https", "help", "logout"];
    
    const handleSettingsOption = async (menu: string) => {
        switch(menu){
            case "Logout":
                await asyncClearItem();
                notifyLogout(navigate);
                return
            default:
                return null

        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <SpinViewAnimation>
                <TouchableOpacity style={styles.pictureFrame}>
                    <View style={{backgroundColor: colors.white, borderRadius: 150, height: 150, width: 150, flexDirection: "row"}}>
                        <IconComponents name="user" type="ant-design" size={130} style={{marginTop: 4, color: colors.black, marginBottom: 4, marginLeft: 10}} />
                        <IconComponents color={colors.strokeColor} name="pluscircle" type="ant-design" size={35} style={{marginTop: 100, marginLeft: 37}}  />
                    </View>
                </TouchableOpacity>
                <View style={styles.profileDetail}>
                    <View style={styles.detailContainer}>
                        {
                            settingsMenu.map((menu, index) => (
                                <TouchableOpacity onPress={() => handleSettingsOption(menu)} key={menu} style={styles.detailItem}>
                                    <IconComponents name={icons[index]} type="material-icon" size={25} />
                                    <Text style={styles.detailText}>{menu}</Text>
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                </View>
            </SpinViewAnimation>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainBlue,

    },
    pictureFrame: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.mainBlue,
    },
    profileDetail: {
        flex: 2,
        backgroundColor: colors.white,
        borderTopLeftRadius: 55,
        borderTopRightRadius: 55,
        borderBottomWidth: 4,
        borderBottomColor: colors.mainBlue,
        paddingLeft: 10,
        paddingRight: 10,

    },
    detailContainer: {
        marginTop: StatusBar.currentHeight,
        justifyContent: "center",
    },
    detailItem: {
        // flex: 1,
        flexDirection: "row",
        marginTop: 20,
        alignItems: "center",
        elevation: 2,
        padding: 7,
        backgroundColor: colors.white,
        borderBottomWidth: 3,
        borderRadius: 5

    },
    detailText: {
        paddingLeft: 10,
        fontSize: 15,
        fontWeight: "700",
    }
});

export default DashboardSettings;