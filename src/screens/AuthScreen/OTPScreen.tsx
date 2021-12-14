import React, { useState, useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../../assets/colors";
import Button from "../../constants/Button";
import Input from '../../constants/Input';

import MessageComponent from '../../constants/MessageComponent';
import UpperHemisphereLayout from "../../constants/layouts/UpperHemisphereLayout";
import ImageComponent from "../../constants/ImageComponent";

import axios from "axios";

import envs, { EnvsInterface } from "../../config/envs";
import ScaleAnimation from '../../constants/animations/ScaleAnimation';

// =================== Context imports ==============================
import AppStore from "../../context/store/Store";
import { isAuthenticatedAction } from "../../context/actions/actions";
import { asyncGetItem, asyncSetItem } from '../../helpers/asyncStorage';
// ===================================================================

interface Props {
    navigation: {
        navigate:(screen: string) => void
    };
    route?: {
        params: any
    }
};

const OTPScreen = (props: Props) => {
    const BASE_URL = (envs as EnvsInterface).REMOTE_BASE_URL;
    const registeredUsersEmail = props.route?.params;
    console.log("\n\t OTPScreen-registeredUsersEmail: ", registeredUsersEmail);
    
    const { state, dispatch } = useContext(AppStore);

    const { BrandLogo } = ImageComponent;
    const { navigate } = props.navigation;
    const [otpData, setOTPData] = useState("");
    const [loadingText, setLoadingText] = useState("");
    const [emailTokenText, setEmailTokenText] = useState(true);
    const [tokenError, setTokenError] = useState("");

    const handleChangeOTPInput = (value: string | number) => {
        const stringifiedValue = String(value);
        setOTPData(stringifiedValue);
    };

    const handleTokenVerification = async () => {
        setLoadingText("Please wait, while token is being verified...");
        setTokenError("");
        setEmailTokenText(false);
        try {
            await axios.post(`${BASE_URL}/auth/verify-token/`, {"token": otpData, ...registeredUsersEmail}, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setTimeout(async () => {
                setLoadingText("");
                navigate("sign-in");
            }, 7000);
        } catch (error: any) {
            setTimeout(() => {
                setTokenError("Invalid token, please try again.");
                setLoadingText("");
            }, 5000);
        };
    };
    return (
        <View style={styles.container}>
            <ScaleAnimation style={{flex: 1, justifyContent: "center"}} scaleEndValue={4}>
                <UpperHemisphereLayout style={{elevation: 30, height: 200, alignItems: "center", backgroundColor: colors.mainBlue, borderWidth: 2, borderColor: colors.strokeColor, borderRadius: 12}} >
                    <BrandLogo style={styles.turboHeaderLogoStyle} />
                    <Text style={styles.otpHeaderText}>OTP - Verification</Text>
                </UpperHemisphereLayout>
                <View style={{borderBottomWidth: 3, borderBottomColor: colors.strokeColor, width: "100%", marginVertical: 7}}></View>
                <ScrollView>
                    <View style={{marginTop: 20, elevation: 12, alignItems: "center", marginBottom: 25, paddingHorizontal: 12}}>
                        {
                            tokenError.length > 0 ?
                            <MessageComponent fontSize={17} level="error" message={tokenError} />
                            :
                            <Text style={{color: colors.white, fontSize: 15, fontWeight: "600", marginTop: 5, textAlign: "center", fontFamily: "Merriweather-Regular"}}>
                                Please, enter the OTP-code sent to your phone, to complete the registration process.
                            </Text>
                        }
                        <Input 
                            onChangeText={value => handleChangeOTPInput(value)} 
                            style={styles.otpInputStyle} 
                        />
                        {
                            loadingText.length > 0 &&
                            <ScaleAnimation>
                                <Text style={styles.waitingText}>{loadingText}</Text>
                            </ScaleAnimation>
                        }
                    </View>
                    {
                        loadingText.length === 0 &&
                        <Button 
                            btnText="Verify OTP" onPress={() => handleTokenVerification()} 
                            containerStyle={styles.btnContainerStyle} 
                            textStyle={styles.textContainerStyle}
                        />
                    }
                    {
                        emailTokenText &&
                        <Text style={{color: colors.white, fontSize: 13, fontWeight: "600", marginTop: 17, textAlign: "center", fontFamily: "Merriweather-Regular"}}>
                            If you never got the OTP; then, check the email address you provided.
                        </Text>
                    }
                    {/* <BrandLogo style={styles.turboFooterLogoStyle} /> */}
                    <View style={{borderBottomWidth: 3, borderBottomColor: colors.strokeColor, width: "100%", marginVertical: 12}}></View>
                </ScrollView>
            </ScaleAnimation>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: "space-between",
        backgroundColor: colors.mainBlue,
        
    },
    inputContainer: {
        elevation: 7, 
        paddingHorizontal: 20,
        marginBottom: 30,
        marginTop: 17
    },
    inputStyle: {
        elevation: 7,
        backgroundColor: colors.white,
        borderColor: colors.flameRed,
        borderWidth: 2,
        borderRadius: 7,
        marginVertical: 10
    },
    btnContainerStyle: {
        borderWidth: 2,
        borderColor: colors.strokeColor,
        elevation: 10,
        marginHorizontal: 30,
        paddingVertical: 17,
        borderRadius: 10,
        backgroundColor: colors.strokeColor,
    },
    textContainerStyle: {
        color: colors.mainBlue,
        fontFamily: "Merriweather-Regular"
    },
    turboHeaderLogoStyle: {
        resizeMode: "contain",
        width: 180,
        height: 100,
        marginTop: 15
    },
    turboFooterLogoStyle: {
        resizeMode: "contain",
        width: 170,
        height: 100,
        backgroundColor: colors.mainBlue,
        // flex: 1
    },
    loginTextContainer: {
        marginLeft: 5
    },
    otpInputStyle: {
        borderWidth: 2, 
        borderColor: colors.strokeColor, 
        borderRadius: 8, 
        marginRight: 7, 
        elevation: 12, 
        backgroundColor: colors.white, 
        color: colors.black,
        fontSize: 20,
        width: "45%",
        textAlign: "center",
        marginTop: 12,
        fontFamily: "Merriweather-Regular"

    },
    otpHeaderText: {
        color: colors.strokeColor, 
        fontSize: 20, 
        fontWeight: "600", 
        marginTop: -10,
        fontFamily: "Merriweather-Regular"
    },
    waitingText: {
        fontWeight: "600", 
        fontSize: 17, 
        textAlign: "center", 
        marginTop: 10, 
        color: colors.strokeColor,
        fontFamily: "Merriweather-BoldItalic"
    },
    lowerHemisphereStyle: {
        borderRadius: 260,
        borderWidth: 2,
        
    }

});


export default OTPScreen;