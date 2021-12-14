import React, { useEffect, useState } from 'react'
import { BackHandler, Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import colors from '../../../assets/colors'
import TranslateY from '../../../constants/animations/TranslateY'
import RowAlignment from '../../../constants/layouts/RowAlignment'
import RecursiveDateTimeComponent from '../../../constants/RecursiveDateTimeComponent'
import { backAction } from '../../../helpers/hardwareBackPress'

import axios from "axios";
import envs, { EnvsInterface } from "../../../config/envs";
interface Props {
    
};

interface CountInterface {
    "Number of users": number,
    "Number of industries": number,
    [key: string | number]: number
}

const { width, height } = Dimensions.get("screen");
const SuperAdminDashboardHome = (props: Props) => {
    const { REMOTE_BASE_URL } = envs as EnvsInterface;
    const [usersCount, setUsersCount] = useState<number>(0);
    const [industrialCount, setIndustrialCount] = useState<number>(0);

    const counts: CountInterface = {
        "Number of users": usersCount,
        "Number of industries": industrialCount,
    }
    useEffect(() => {
        (async () => {
            try {
                const serverResponseUsers = await axios.get(`${REMOTE_BASE_URL}/auth/users-count/`);
                console.log("\n\t usersCount: ", serverResponseUsers.data);
                setUsersCount(serverResponseUsers.data as number);

                const serverResponseindustries = await axios.get(`${REMOTE_BASE_URL}/industries/industrial-count/`);
                console.log("\n\t industrialCount: ", serverResponseindustries.data);
                setIndustrialCount(serverResponseindustries.data as number);
            } catch (error: any) {
                // console.log("\n\t Error: ", error.response);
            }
        })();

        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <TranslateY translationStartValue={-250} animateElevationEndValue={1.2}>
                <RecursiveDateTimeComponent upperArc={false} />
            </TranslateY>
            <ScrollView style={{elevation: 12, position: "absolute", marginTop: height/2, alignSelf: "center"}}>
                {
                    Object.keys(counts).map(count => (
                        <RowAlignment key={count} style={{ justifyContent: "center", alignItems: "center", elevation: 20}}>
                            <Text style={{color: colors.black, fontSize: 17, fontFamily: "Lora-Bold"}}>{count}: </Text>
                            <Text style={{color: colors.black, fontSize: 17, fontFamily: "Lora-Bold"}}>{counts[count]}</Text>
                        </RowAlignment>
                    ))
                }
            </ScrollView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default SuperAdminDashboardHome;