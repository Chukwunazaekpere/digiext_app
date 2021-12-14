import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native';
import envs, { EnvsInterface } from "../../config/envs";

import colors from "../../assets/colors";
import Button from "../../constants/Button";
import Input from '../../constants/Input';

import UpperHemisphereLayout from "../../constants/layouts/UpperHemisphereLayout";
import ImageComponent from "../../constants/ImageComponent";

import { titleCase } from "../../helpers/utilityFunctions";

import FadeAnimation from "../../constants/animations/FadeAnimation";
import axios from "axios";

import OvalLayout from '../../constants/layouts/OvalLayout';
// =================== Context imports ==============================
import AppStore from "../../context/store/Store";
import { isAuthenticatedAction, authenticatedUserAction } from "../../context/actions/actions";
// ===================================================================  

import AuthCircularProgressBar from '../../constants/progressbars/AuthCircularProgressBar';
import MessageComponent from '../../constants/MessageComponent';
import ScaleAnimation from '../../constants/animations/ScaleAnimation';

import IconComponents from '../../constants/IconComponents';
import { asyncSetItem } from '../../helpers/asyncStorage';

interface Props {
    navigation: {
        navigate:(screen: string) => void
    };
};

interface LoginInterface {
    email: string
    password: string 
    [key: string]: string
};

const { width, height } = Dimensions.get("screen");
const LoginScreen = (props: Props) => {
    const { BrandLogo } = ImageComponent;
    const [togglePasswordVisibility, setTogglePasswordVisibility] = useState(true);
    const { navigate } = props.navigation;
    const { REMOTE_BASE_URL } = envs as EnvsInterface;

    const [loadingText, setLoadingText] = useState("");
    const { state, dispatch } = useContext(AppStore);
    const [loginData, setLoginData] = useState<LoginInterface>({
        email: "",
        password: "",
    });

    const [loginErrors, setLoginErrors] = useState("");

    const submitForm = async () => {
        setLoadingText("Please wait, your credentials are being verified...");
        setLoginErrors("");
        try {
            const loginResponse = await axios.post(`${REMOTE_BASE_URL}/auth/sign-in/`, {data: {...loginData}}, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const loggedInUserDetails = loginResponse.data as any;
            console.log("\n\t loggedInUserDetails: ", loggedInUserDetails);
            
            const authenticatedUserName = loggedInUserDetails.user;
            console.log("\n\t authenticatedUserName: ", authenticatedUserName);
            // const profileImage = loggedInUserDetails.data.profile_pics;
            // await asyncSetItem("profileImage", profileImage);
            await asyncSetItem("authenticatedUserName", authenticatedUserName);
            setTimeout(async () => {
                dispatch(authenticatedUserAction(authenticatedUserName));
                dispatch(isAuthenticatedAction(true));
                navigate("dashboard");
            }, 5000);
        } catch (error: any) {
            setTimeout(() => {
                console.log("\n\t Error 1: ",error.response.data);
                try {
                    setLoginErrors(error.response.data);
                } catch (error: any) {
                    console.log("\n\t Error2: ", error.message);
                    setLoginErrors("Network error. Please; try again.");
                }
                setLoadingText("");
            }, 5000);
        }
    };
    // console.log("\n\t togglePasswordVisibility: ", togglePasswordVisibility);
    const handleInputChange = (field: string, value: string) => {
        loginData[field] = value;
        setLoginData({
            ...loginData
        });
        // Clear all errors when typing...
        loginErrors.length > 0 && setLoginErrors("");
    };
    return (
        <View style={styles.container}>
            <FadeAnimation style={{backgroundColor: colors.mainBlue, justifyContent: "flex-start"}}>
                <UpperHemisphereLayout style={{height: 200, backgroundColor: colors.mainBlue, alignItems: "center"}}>
                {
                    loadingText.length === 0 &&
                    <View style={{alignItems: "center"}}>
                        <BrandLogo style={styles.turboHeaderLogoStyle} />
                        <Text style={{color: colors.white, fontSize: 22, fontWeight: "600", marginTop: -10, textAlign: "center", fontFamily: "Merriweather-Regular"}}>
                            Welcome
                        </Text>
                        <View style={{flexDirection: "row", alignItems: "center", marginTop: 5}}>
                            <Text style={{ color: colors.white, fontSize: 15, fontWeight: "600", fontFamily: "Merriweather-Regular"}}>
                                Not registered? 
                            </Text>
                            <TouchableOpacity onPress={() => navigate("sign-up")} style={styles.loginTextContainer}>
                                <Text style={{color: colors.strokeColor, fontWeight: "600", fontSize: 15, fontFamily: "Merriweather-Regular"}}>Sign-up.</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{color: colors.white, fontSize: 12, fontWeight: "600", marginTop: 5, marginBottom: 7, fontFamily: "Merriweather-Bold"}}>Please, fill-in all fields correctly.</Text>
                    </View>
                }
                </UpperHemisphereLayout>
            </FadeAnimation>
            <View style={{borderBottomWidth: 3, borderBottomColor: colors.strokeColor, width: "100%", marginVertical: 3}}></View>
            <ScrollView>
                <OvalLayout innerViewHeight={height/1.7} containerHeight={height/1.5}>
                    <FadeAnimation style={{flex: 1, justifyContent: "center"}}>
                        <View style={{...styles.inputContainer, opacity: loadingText.length > 0 ? 0.05 : 1}}>
                            {
                                loginErrors.length > 0 &&
                                <MessageComponent level="error" message={loginErrors} />
                            }
                            {
                                Object.keys(loginData).map(field => (
                                    <View key={field} style={{...styles.inputStyle, opacity: loadingText.length > 0 ? 0.1 : 1}}>
                                        <Input 
                                            style={styles.textInputStyle} 
                                            secureTextEntry={field === "password" ? togglePasswordVisibility : undefined} 
                                            placeholder={titleCase(field)} 
                                            onChangeText={value => handleInputChange(field, value)}  
                                            // autoCapitalize={field === "email" ? "none" : "words"}  adding this makes secureTextEntry feature disfunctional
                                        />
                                        {
                                            field === "password" &&
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
                                ))
                            }
                            <View style={{marginTop: 25}}>
                                <Button 
                                    btnText="Sign-in" onPress={() => submitForm()} 
                                    containerStyle={styles.btnContainerStyle} 
                                    textStyle={styles.textStyle}
                                />
                                <Text style={{fontSize: 13, elevation: 20, fontWeight: "600", color: colors.mainBlue, fontFamily: "Merriweather-Regular", textAlign: "center", marginTop: 15}}>Forgot password?</Text>
                                <TouchableOpacity onPress={() => {
                                        setLoginErrors("")
                                        navigate("reset-password")
                                    }} 
                                    style={{elevation: 12, justifyContent: "center", alignItems: "center", }}>
                                    <Text style={{fontSize: 17, elevation: 20, fontWeight: "600", color: colors.flameRed, fontFamily: "Merriweather-LightItalic"}}>Reset my password</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {
                            loadingText.length > 0 &&
                            <View style={{marginBottom: height/12}}>
                                <AuthCircularProgressBar />
                                <ScaleAnimation >
                                    <Text style={styles.loadingText}>{loadingText}</Text>
                                </ScaleAnimation>
                            </View>
                        }
                    </FadeAnimation>
                </OvalLayout>
            </ScrollView>
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
        elevation: 12, 
        paddingHorizontal: 20,
        marginBottom: 30,
        marginTop: 17,
        flex: 1,
        justifyContent: "center"
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
        paddingHorizontal: 7
    },
    textInputStyle: {
        flex: 1,
        fontFamily: "Lora-Regular",
        fontSize: 15,
        // fontFamily: "Merriweather-Regular",
    },
    btnContainerStyle: {
        borderWidth: 2,
        borderColor: colors.strokeColor,
        elevation: 10,
        marginHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: colors.mainBlue,
        marginTop: -12
    },
    textStyle: {
        color: colors.white,
        fontFamily: "Merriweather-Regular"
    },
    turboHeaderLogoStyle: {
        resizeMode: "contain",
        width: 150,
        height: 100,
        marginTop: 20
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
    loadingText: {
        fontWeight: "600", 
        fontSize: 16, 
        textAlign: "center", 
        // marginTop: 10, 
        color: colors.mainBlue,
        fontFamily: "Merriweather-BoldItalic"
    },
    lowerHemisphereStyle: {
        borderRadius: 260,
        borderWidth: 2,
        opacity: .85
    },
    loadingStyle: {
        display: "flex",
        // justifyContent: "center"
    }
   
});

export default LoginScreen;