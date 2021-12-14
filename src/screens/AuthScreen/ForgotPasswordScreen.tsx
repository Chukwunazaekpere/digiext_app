import React, { useState } from 'react';
import { StyleSheet, Alert, Text, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";

import colors from "../../assets/colors";
import Button from "../../constants/Button";
import Input from '../../constants/Input';

import envs, { EnvsInterface } from "../../config/envs";

import UpperHemisphereLayout from "../../constants/layouts/UpperHemisphereLayout";
import LowerHemisphereLayout from "../../constants/layouts/LowerHemisphereLayout";
import ImageComponent from "../../constants/ImageComponent";

import { titleCase } from "../../helpers/utilityFunctions";

import OvalLayout from '../../constants/layouts/OvalLayout';
import FadeAnimation from "../../constants/animations/FadeAnimation";
import MessageComponent from '../../constants/MessageComponent';
import axios from 'axios';
import ScaleAnimation from '../../constants/animations/ScaleAnimation';
import { asyncGetItem, asyncSetItem } from '../../helpers/asyncStorage';
import RowAlignment from '../../constants/layouts/RowAlignment';
import IconComponents from '../../constants/IconComponents';

interface Props {
    navigation: {
        navigate:(screen: string) => void
    }
};

interface LoginInterface {
    email: string
};

interface PasswordResetType {
    "New Password": string,
    "Confirm New Password": string,
    [key: string]: any
};

const { width, height } = Dimensions.get("screen");
const ForgotPasswordScreen = (props: Props) => {
    const { BrandLogo } = ImageComponent;
    const { navigate } = props.navigation;
    const BASE_URL = (envs as EnvsInterface).REMOTE_BASE_URL;
    const [loadingText, setLoadingText] = useState("");
    const [togglePasswordVisibility, setTogglePasswordVisibility] = useState(true);

    const [showEmailInput, setShowEmailInput] = useState(true);
    const [showTokenInput, setShowTokenInput] = useState(false);
    const [showPaswordInput, setShowPaswordInput] = useState(false);
    const [tokenError, setTokenError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordResetSuccessful, setPasswordResetSuccessful] = useState(false);


    const [instructionText, setInstructionText] = useState(`Please, enter your regitered email to ${'\n'} reset your password.`)
    const [resetEmail, setResetEmail] = useState<LoginInterface>({
        email: "",
    });

    const [passwordResetData, setPasswordResetData] = useState<PasswordResetType>({
        "New Password": "",
        "Confirm New Password": "",
    });

    const [passwordResetError, setPasswordResetError] = useState("")

    const [smsToken, setSmsToken] = useState<number | string>();
    
    const handleChangeInput = (field: string, value: string, type: "passwordInput" | "EmailInput" | "TokenInput") => {
        switch(type){
            case "passwordInput":
                setPasswordResetError("");
                passwordResetData[field] = value;
                return setPasswordResetData({
                    ...passwordResetData,
                });
            case "EmailInput":
                setEmailError("");
                return setResetEmail({
                    email: value.toLowerCase()
                });
            case "TokenInput":
                setTokenError("");
                return setSmsToken(value)
            default:
                return null

        }
    };

    const handleSubmitEmail = async () => {
        setLoadingText("Please wait, your email is being verified...");
        setEmailError("");
        
        try {
            await axios.post(`${BASE_URL}/auth/forgot-password/`, {...resetEmail},
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            // console.log("\n\t serverResponse: ", serverResponse.data);
            await asyncSetItem("email", resetEmail['email'])
            setTimeout(async () => {
                setLoadingText("");
                setShowTokenInput(true);
                setShowEmailInput(false);
                setInstructionText(`Please enter the token sent to ${resetEmail["email"]}.`)
            }, 7000);
        } catch (error: any) {
            setTimeout(() => {
                try {
                    setEmailError(error.response.data);
                } catch (error) {
                    setEmailError("Network Error");
                }
                setLoadingText("");
            }, 3000);
        }
    };


    const handleSubmitToken = async () => {
        setLoadingText("Please wait, your token is being validated along side your email...");
        setTokenError("");
        try {
            await axios.post(`${BASE_URL}/auth/verify-token/`, {"token": smsToken, "registeredUsersEmail": resetEmail["email"]}, {
                headers: {
                    "Content-Type": "application/json"
                },
            });
            setTimeout(() => {
                setShowTokenInput(false);
                setShowPaswordInput(true);
                setLoadingText("");
                setInstructionText(`Please enter your new preferred password.`);
            }, 7000);
        } catch (error: any) {
            setTimeout(() => {
                setTokenError(error.response.data);
                setLoadingText("");
            }, 3000);
        };
    };

    const handleSubmitResetPassword = async () => {
        setLoadingText("Turbo Errands is resetting your old pasword to your new password! Please wait...");
        setPasswordResetError("");
        try {
            await axios.post(`${BASE_URL}/auth/change-password/`, {...passwordResetData, resetEmail}, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            setPasswordResetSuccessful(true)
            setTimeout(async () => {
                await AsyncStorage.clear();
                setLoadingText("");
                navigate("sign-in");
            }, 5000);
        } catch (error: any) {
            setTimeout(() => {
                setPasswordResetError(error.response.data);
                setLoadingText("");
            }, 3000);
        };
    };
    console.log("\n\t showEmailInput: ", showEmailInput);
    
    return (
        <View style={styles.container}>
            <FadeAnimation>
                <UpperHemisphereLayout style={{elevation: 30, height: 200, alignItems: "center"}} >
                    <BrandLogo style={styles.turboHeaderLogoStyle} />
                    {
                        showEmailInput &&
                        <View> 
                            <Text style={{color: colors.white, fontSize: 22, fontWeight: "600", marginTop: -10,fontFamily: "Merriweather-Regular", textAlign: "center"}}>Welcome</Text>
                            <RowAlignment style={{marginTop: 5}}>
                                <Text style={{ color: colors.white, fontSize: 15, fontWeight: "600", fontFamily: "Merriweather-Regular"}}>
                                    Not registered? 
                                </Text>
                                <TouchableOpacity onPress={() => navigate("sign-up")} style={styles.loginTextContainer}>
                                    <Text style={{color: colors.strokeColor, fontWeight: "600", fontSize: 15, fontFamily: "Merriweather-Regular"}}>Register.</Text>
                                </TouchableOpacity>
                            </RowAlignment>
                        </View>
                    }
                    <Text style={{color: colors.mainBlue, fontSize: 13, fontWeight: "600", marginTop: 5, textAlign: "center", fontFamily: "Merriweather-Bold"}}>
                        {instructionText}
                    </Text>
                </UpperHemisphereLayout>
                <View style={{borderBottomWidth: 3, borderBottomColor: colors.mainBlue, width: "100%", marginVertical: 7, marginTop: 40}}></View>
                <ScrollView style={styles.inputContainer}>
                    <OvalLayout innerViewHeight={height/1.5} containerHeight={height} style={{flex: 1, justifyContent: "center", transform: [{rotate: "-180deg"}]}}>
                        <FadeAnimation style={{flex: 1, justifyContent: "center"}}>
                        {   
                            showEmailInput &&
                            <View style={{paddingHorizontal: 15, marginTop: 15, elevation: 10}}>
                                {
                                    emailError.length > 0 &&
                                    <MessageComponent level="error" message={emailError} />
                                }
                                {
                                    Object.keys(resetEmail).map(field => (
                                        <Input 
                                            autoCapitalize="none" 
                                            key={field} 
                                            placeholder={titleCase(field)} 
                                            keyboardType="email-address" 
                                            onChangeText={value => handleChangeInput("email", value, "EmailInput")} 
                                            style={styles.inputStyle} 
                                        />
                                    ))
                                }
                                {
                                    loadingText.length > 0 ?
                                    <ScaleAnimation>
                                        <Text style={styles.waitingText}>{loadingText}</Text>
                                    </ScaleAnimation>
                                    :
                                    <View>
                                        <Button 
                                            btnText="Send Email" onPress={() => handleSubmitEmail()} 
                                            containerStyle={styles.btnContainerStyle} 
                                            textStyle={styles.textContainerStyle}
                                        />
                                        <TouchableOpacity onPress={() => navigate("sign-in")} style={{elevation: 12, justifyContent: "center", alignItems: "center", marginTop: 15}}>
                                            <Text style={{fontSize: 20, elevation: 20, fontWeight: "600", color: colors.mainBlue, fontFamily: "Lora-BoldItalic",}}>
                                                Login
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                        }
                        {   
                            showTokenInput &&
                            <View style={{paddingHorizontal: 15, marginTop: 15, elevation: 10}}>
                                {
                                    tokenError.length > 0 &&
                                    <MessageComponent level="error" message={tokenError} />
                                }
                                {
                                    Object.keys(resetEmail).map(field => (
                                        <Input key={field} placeholder={`Enter token sent to ${"\n"} ${resetEmail["email"]}`} onChangeText={value => handleChangeInput("token", value, "TokenInput")} style={{...styles.inputStyle, textAlign: "center"}} />
                                    ))
                                }
                                {
                                    loadingText.length > 0 ?
                                    <ScaleAnimation>
                                        <Text style={styles.waitingText}>{loadingText}</Text>
                                    </ScaleAnimation>
                                    :
                                    <Button 
                                        btnText="Verify Token" onPress={() => handleSubmitToken()} 
                                        containerStyle={styles.btnContainerStyle} 
                                        textStyle={styles.textContainerStyle}
                                    />
                                }
                            </View>
                        }
                        {   
                            showPaswordInput &&
                            <View style={{paddingHorizontal: 15, marginTop: 15, elevation: 10}}>
                                {
                                    passwordResetSuccessful &&
                                    <MessageComponent level="success" message="Password reset was successful." />
                                }
                                {
                                    passwordResetError.length > 0 &&
                                    <MessageComponent level="error" message={passwordResetError} />
                                }
                                {
                                    Object.keys(passwordResetData).map(field => (
                                        <View key={field}>
                                            <View key={field} style={{...styles.inputStyle, }}>
                                                <Input 
                                                    placeholder={titleCase(field)} 
                                                    onChangeText={value => handleChangeInput(field, value, "passwordInput")} 
                                                    style={styles.textInputStyle} 
                                                    secureTextEntry={togglePasswordVisibility} 
                                                />
                                                {
                                                    field === "New Password" &&
                                                    <TouchableOpacity onPress={() => setTogglePasswordVisibility(!togglePasswordVisibility)}>
                                                        {
                                                            !togglePasswordVisibility ?
                                                            <IconComponents  type="ion-icons" name="eye-outline" size={30} />
                                                            :
                                                            <IconComponents type="ion-icons" name="eye-off-outline" size={30} />
                                                        }
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                        </View>
                                    ))
                                }
                                {
                                    loadingText.length > 0 ?
                                    <ScaleAnimation>
                                        <Text style={styles.waitingText}>{loadingText}</Text>
                                    </ScaleAnimation>
                                    :
                                    !passwordResetSuccessful &&
                                    <Button 
                                        btnText="Reset Password" onPress={() => handleSubmitResetPassword()} 
                                        containerStyle={styles.btnContainerStyle} 
                                        textStyle={styles.textContainerStyle}
                                    />
                                }
                            </View>
                        }
                        </FadeAnimation>
                    </OvalLayout>
                </ScrollView>
            </FadeAnimation>
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
        // paddingHorizontal: 10,
        marginBottom: 30,
        marginTop: 12
    },
    inputStyle: {
        elevation: 5,
        backgroundColor: colors.white,
        borderColor: colors.mainBlue,
        borderBottomWidth: 2,
        borderRadius: 7,
        marginVertical: 7,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        paddingHorizontal: 7,
        fontFamily: "Merriweather-Bold"

    },
    btnContainerStyle: {
        borderWidth: 2,
        borderColor: colors.strokeColor,
        elevation: 10,
        marginHorizontal: 60,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: colors.mainBlue,
        marginTop: 12
    },
    textContainerStyle: {
        color: colors.white,
        fontFamily: "Merriweather-Regular",
    },
    turboHeaderLogoStyle: {
        resizeMode: "contain",
        width: 170,
        height: 80,
        marginTop: 40
    },
    turboFooterLogoStyle: {
        resizeMode: "contain",
        width: 170,
        height: 100,
        backgroundColor: colors.mainBlue,
    },
    loginTextContainer: {
        marginLeft: 5,
    },
    tokenInputStyle: {
        borderWidth: 2, 
        borderColor: colors.flameRed, 
        borderRadius: 8, 
        marginRight: 7, 
        elevation: 12, 
        backgroundColor: colors.white, 
        color: colors.black,
        fontSize: 20,
        width: "45%",
        textAlign: "center"
    },
    waitingText: {
        fontWeight: "600", 
        fontSize: 14, 
        textAlign: "center", 
        marginTop: 10, 
        color: colors.steelBlue,
        fontFamily: "Merriweather-BoldItalic"
    },
    lowerHemisphereStyle: {
        borderRadius: 260,
        borderWidth: 2,
        height: 700,
        flex: 1
    },
    textInputStyle: {
        flex: 1,
        fontFamily: "Lora-Regular",
        fontSize: 15,
        // fontFamily: "Merriweather-Regular",
    },
   
});


export default ForgotPasswordScreen;