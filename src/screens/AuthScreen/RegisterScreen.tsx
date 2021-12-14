import React, { useState, useRef, useContext } from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View, ScrollView, Dimensions } from 'react-native';
import envs, { EnvsInterface } from "../../config/envs";

import axios from "axios";
import colors from "../../assets/colors";
import Button from "../../constants/Button";
import Input from '../../constants/Input';
import FadeAnimation from "../../constants/animations/FadeAnimation";

import AuthCircularProgressBar from '../../constants/progressbars/AuthCircularProgressBar';

import UpperHemisphereLayout from "../../constants/layouts/UpperHemisphereLayout";
import LowerHemisphereLayout from "../../constants/layouts/LowerHemisphereLayout";
import ImageComponent from "../../constants/ImageComponent";

import { titleCase } from "../../helpers/utilityFunctions";

import OvalLayout from '../../constants/layouts/OvalLayout';
import FormMap from '../../constants/FormMap';
import MessageComponent from "../../constants/MessageComponent";
import PhoneInput from 'react-native-phone-number-input';

// =================== Context imports ==============================
import AppStore from "../../context/store/Store";
import { isAuthenticatedAction } from "../../context/actions/actions";
import ScaleAnimation from '../../constants/animations/ScaleAnimation';
import { asyncSetItem } from '../../helpers/asyncStorage';
import IconComponents from '../../constants/IconComponents';
import { floor } from 'react-native-reanimated';
// ===================================================================

interface Props {
    navigation: {
        navigate:(screen: string, data?: any) => void
    }
};

interface SignupInterface {
    email: string
    firstname: string 
    lastname: string
    phone: string
    password: string 
    "confirm password": string 
    address: string
    [key: string]: string
};

const {  height, width } = Dimensions.get("screen");
const RegisterScreen = (props: Props) => {
    const BASE_URL = (envs as EnvsInterface).REMOTE_BASE_URL;
    // =========== Form map state variables =====================
    const [showFirstDot, setShowFirstDot] = useState(true);
    const [showSecondDot, setShowSecondDot] = useState(false);
    const [showThirdDot, setShowThirdDot] = useState(false);
    // ==========================================================
    const [showPassword, setShowPassword] = useState(true);
    const [networkText, setNetworkText] = useState("");

    // console.log("\n\t isAuthenticated: ", isAuthenticated);
    const { navigate } = props.navigation;
    const { BrandLogo } = ImageComponent;
    const [loadingText, setLoadingText] = useState("");

    const [showStageOneForm, setShowStageOneForm] = useState(true);
    const [showStageTwoForm, setShowStageTwoForm] = useState(false);
    const [showStageThreeForm, setShowStageThreeForm] = useState(false);
    const [showUpperHemisphere, setShowUpperHemisphere] = useState(true);

    const [registrationData, setRegistrationData] = useState<SignupInterface>({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        "confirm password": ""
    });

    const [registrationErrors, setRegistrationErrors] = useState<SignupInterface>({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        "confirm password": ""
    });

    const stageOneFormFields = ["firstname", "lastname"];
    const stageTwoFormFields = ["email", "phone", "address"];
    const stageThreeFormFields = ["password", "confirm password"];

    const handleInputChange = (field: string, value: string) => {
        registrationData[field] = value;
        // console.log("\n\t Registration Form: ", registrationData);

        // Clear all errors when typing...
        setLoadingText("");
        if(registrationErrors[field]){
            setRegistrationErrors({
                firstname: "",
                lastname: "",
                email: "",
                phone: "",
                address: "",
                password: "",
                "confirm password": ""
            });
        };
    };

    const stageOneFormNextButton = () => {
        setShowStageOneForm(false);
        setShowStageTwoForm(true);

        setShowFirstDot(false);
        setShowSecondDot(true);
    };

    const stageTwoFormBackButton = () => {
        setShowStageOneForm(true);
        setShowStageTwoForm(false);

        setShowFirstDot(true);
        setShowSecondDot(false);
    };

    const stageTwoFormNextButton = () => {
        setShowStageTwoForm(false);
        setShowStageThreeForm(true);

        setShowSecondDot(false);
        setShowThirdDot(true);
    };

    const stageThreeFormBackButton = () => {
        setShowThirdDot(false);
        setShowSecondDot(true);

        setShowStageThreeForm(false);
        setShowStageTwoForm(true);
    };

    const submitRegistrationForm = async () => {
        setLoadingText("Please wait, digiext is signing you up...");
        try {
            await axios.post(`${BASE_URL}/auth/sign-up/`, {data: {...registrationData}}, 
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            // setShowUpperHemisphere(false);
            console.log("\n\t Successful sign up...");
            
            const registeredUsersEmail = `${registrationData["email"]}`
            setTimeout(() => {
                navigate("otp", {registeredUsersEmail});
            }, 7000);
        } catch (error: any) {
            try {
                const errors = error.response.data;
                const errorKeys = Object.keys(errors);
                // console.log("\n\t Error: ", errors, errorKeys);
                
                for(let key of errorKeys){
                    // console.log("\n\t Typeof: ", typeof(errors[key]));
                    if(typeof(errors[key]) !== "string"){
                        registrationErrors[key] = errors[key][0];
                    }else{
                        // console.log("\n\t Not array: ");
                        registrationErrors[key] = errors[key];
                    };
                };
                setRegistrationErrors({
                    ...registrationErrors
                });
                
                if(registrationErrors["firstname"].length > 0 || registrationErrors["lastname"].length > 0){
                    setShowThirdDot(false);
                    stageTwoFormBackButton();
                }else if(registrationErrors["email"].length > 0 || registrationErrors["phone"].length > 0 || registrationErrors["address"].length > 0){
                    setShowThirdDot(false);
                    stageThreeFormBackButton();
                }
            } catch (error) {
                // When there's network failure, set the error only on the first-stage form.
                setRegistrationErrors({
                    ...registrationErrors,
                    firstname: "Network error. Please; try again."
                });
                setShowThirdDot(false);
                stageTwoFormBackButton();
            };
            setTimeout(() => {
                setLoadingText("");
            }, 2000)
            // console.log("\n\t Errorsss: ", registrationErrors);
        };
    };
    // console.log("\n\t Errorsss: ", loadingText);
    return (
        <View style={styles.container}>
            <FadeAnimation>
                <UpperHemisphereLayout style={{elevation: 30, height: 180, alignItems: "center", justifyContent: "center", backgroundColor: colors.mainBlue}} >
                    {
                        showUpperHemisphere &&
                        <View style={{alignItems: "center", }}>
                            <BrandLogo style={styles.turboHeaderLogoStyle} />
                            <Text style={{color: colors.white, fontSize: 22, fontWeight: "600", marginTop: -13, fontFamily: "Merriweather-Regular"}}>Welcome</Text>
                            <View style={{flexDirection: "row", alignItems: "center"}}>
                                <Text style={{ color: colors.white, fontSize: 15, fontWeight: "600", marginTop: 1, fontFamily: "Merriweather-Regular"}}>
                                    Already have an account? 
                                </Text>
                                <TouchableOpacity onPress={() => navigate("sign-in")} style={styles.loginTextContainer}>
                                    <Text style={{color: colors.strokeColor, fontWeight: "600", fontSize: 15, fontFamily: "Merriweather-Regular"}}>Sign-in.</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{color: colors.white, fontSize: 12, fontWeight: "600", marginTop: 1, fontFamily: "Merriweather-Bold"}}>Please, fill-in all fields correctly.</Text>
                        </View>
                    }
                </UpperHemisphereLayout>
            </FadeAnimation>
            <View style={{borderBottomWidth: 3, borderBottomColor: colors.strokeColor, width: "100%", marginVertical: 7}}></View>
            <ScrollView style={{backgroundColor: colors.mainBlue}}>
                <OvalLayout innerViewHeight={height/1.57}>
                    <FadeAnimation style={{elevation: 20, flex: 1, justifyContent: "center",}}>
                        <View style={styles.inputContainer}>
                            {
                                <FormMap 
                                    style={{opacity: loadingText.length > 0 ? 0.05 : 1}} 
                                    showFirstDot={showFirstDot} 
                                    showSecondDot={showSecondDot} 
                                    showThirdDot={showThirdDot} 
                                />
                            }
                            {
                                networkText.length > 0 &&
                                <MessageComponent level="error" message={networkText} /> 
                            }
                            {
                                showStageOneForm ?
                                <View>
                                    <Text style={{marginTop: 5, textAlign: "center", color: colors.mainBlue, fontFamily: "Merriweather-Regular"}}>
                                        Please enter your firstname and lastname as you're known with.
                                    </Text>
                                    {
                                        stageOneFormFields.map(field => (
                                            <View key={field}>
                                                {
                                                    registrationErrors[field.toLowerCase()].length > 0 &&
                                                    <MessageComponent message={registrationErrors[field]} level="error" />
                                                }
                                                <Input key={field} placeholder={registrationData[field] || titleCase(field)} 
                                                    onChangeText={e => handleInputChange(field, e)} 
                                                    style={styles.inputStyle} 
                                                    defaultValue={registrationData[field]} 
                                                />
                                            </View>
                                        ))
                                    }
                                </View>
                                :
                                showStageTwoForm ?
                                <View>
                                    <Text style={{marginTop: 5, textAlign: "center", color: colors.mainBlue, fontFamily: "Merriweather-Regular"}}>
                                        Please ensure these details are accurate to avoid irregularities.
                                    </Text>
                                    {
                                        stageTwoFormFields.map(field => (
                                            <View key={field}>
                                                {
                                                    registrationErrors[field.toLowerCase()].length > 0 &&
                                                    <MessageComponent message={registrationErrors[field]} level="error" />
                                                }
                                                {
                                                    field === "phone" ?
                                                    <PhoneInput
                                                        defaultValue={registrationData[field]} 
                                                        defaultCode="US"
                                                        layout="first"
                                                        withShadow
                                                        containerStyle={styles.phoneInputs}
                                                        textContainerStyle={styles.phoneTextInputAreaStyle}
                                                        onChangeFormattedText={(value: string) => handleInputChange(field, value)} 
                                                    />
                                                    :
                                                    <Input key={field} placeholder={registrationData[field] || titleCase(field)} 
                                                        autoCapitalize="none"
                                                        onChangeText={e => handleInputChange(field, e)}
                                                        style={styles.inputStyle} 
                                                        defaultValue={registrationData[field]}
                                                        keyboardType={field === "phone" ? "number-pad" : "default"}
                                                    />
                                                }
                                            </View>
                                        ))
                                    }
                                </View>
                                :
                                showStageThreeForm &&
                                <View>
                                    <Text style={{marginTop: 5, textAlign: "center", color: colors.mainBlue, fontFamily: "Merriweather-Regular", opacity: loadingText.length > 0 ? 0.05 : 1}}>
                                        Ensure your password is confidential to you.
                                    </Text>
                                    {
                                        stageThreeFormFields.map(field => (
                                            <View key={field} style={{opacity: loadingText.length > 0 ? 0.05 : 1}}>
                                                {
                                                    registrationErrors[field.toLowerCase()].length > 0 &&
                                                    <MessageComponent message={registrationErrors[field]} level="error" />
                                                }
                                                <View key={field} style={{...styles.inputStyle}}>
                                                    <Input 
                                                        style={styles.textInputStyle} 
                                                        secureTextEntry={field.includes("password") && showPassword} 
                                                        placeholder={titleCase(field)} 
                                                        onChangeText={value => handleInputChange(field, value)} 
                                                    />
                                                    {
                                                        field === "password" &&
                                                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                                            {
                                                                !showPassword ?
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
                                    
                                </View>
                            }
                        </View>
                        {
                            showStageOneForm ?
                            <Button 
                                btnText="Next" onPress={() =>  {
                                    stageOneFormNextButton()
                                }} 
                                containerStyle={styles.firstBtnContainerStyle} 
                                textStyle={styles.textContainerStyle}
                            />
                            :
                            showStageTwoForm ?
                            <View style={{flexDirection: "row", justifyContent: "space-between",paddingHorizontal: 12}}>
                                <Button 
                                    btnText={"Back"} onPress={() => stageTwoFormBackButton()} 
                                    containerStyle={styles.btnContainerStyle} 
                                    textStyle={styles.textContainerStyle}
                                />
                                <Button 
                                    btnText={"Next"} onPress={() => stageTwoFormNextButton()} 
                                    containerStyle={styles.btnContainerStyle} 
                                    textStyle={styles.textContainerStyle}
                                />
                            </View>
                            :
                            showStageThreeForm &&
                            <View >
                                {
                                    loadingText.length === 0  &&
                                    <View style={{flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 12,}}>
                                        <Button 
                                            btnText={"Back"} onPress={() => stageThreeFormBackButton()} 
                                            containerStyle={styles.btnContainerStyle} 
                                            textStyle={styles.textContainerStyle}
                                            />
                                        <Button 
                                            btnText={"Sign-up"} onPress={() => submitRegistrationForm()} 
                                            containerStyle={styles.btnContainerStyle} 
                                            textStyle={styles.textContainerStyle}
                                        />
                                    </View>
                                   
                                }
                                {
                                    loadingText.length > 0 &&
                                    <View>
                                        <AuthCircularProgressBar />
                                        <ScaleAnimation style={{}}>
                                            <Text style={styles.loadingText}>{loadingText}</Text>
                                        </ScaleAnimation>
                                    </View>
                                }
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
        backgroundColor: colors.mainBlue,
    },
    inputContainer: {
        elevation: 7, 
        paddingHorizontal: 10,
        marginBottom: 25,
        marginTop: 10,
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
        fontFamily: "Merriweather-Regular"
    },
    firstBtnContainerStyle: {
        borderWidth: 2,
        borderColor: colors.strokeColor,
        elevation: 20,
        marginHorizontal: 50,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: colors.mainBlue,
        marginTop: -12,
        paddingHorizontal: 20
    },
    btnContainerStyle: {
        borderWidth: 2,
        borderColor: colors.strokeColor,
        elevation: 20,
        marginHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: colors.mainBlue,
        marginTop: -12,
        paddingHorizontal: 20
    },
    textContainerStyle: {
        color: colors.white,
        fontFamily: "Merriweather-Regular"
    },
    turboHeaderLogoStyle: {
        resizeMode: "contain",
        width: 180,
        height: 60,
        marginTop: 23,
        marginBottom: 10
    },
    turboFooterLogoStyle: {
        resizeMode: "contain",
        width: 170,
        height: 60,
        backgroundColor: colors.mainBlue,

    },
    loginTextContainer: {
        marginLeft: 5
    },
    indicatorStyle: {
        flex: 1,  
        borderColor: colors.flameRed,
        
    },
    loadingText: {
        fontWeight: "600", 
        fontSize: 16, 
        textAlign: "center", 
        marginTop: 10, 
        color: colors.mainBlue,
        fontFamily: "Merriweather-BoldItalic"
    },
    lowerHemisphereStyle: {
        borderRadius: 260,
        borderWidth: 2,
        
    },
    textInputStyle: {
        flex: 1,
        fontFamily: "Lora-Regular",
        fontSize: 15,
        // fontFamily: "Merriweather-Regular",
    },
    phoneInputs: {
        borderRadius: 7,
        borderBottomWidth: 3,
        width: "100%",
        borderBottomColor: colors.steelBlue,
        marginVertical: 2,
    },
    phoneTextInputAreaStyle: {
        paddingTop: 3,
        paddingBottom: 3,
        fontSize: 17,
        fontFamily: "Lora-Italic",
        // borderRadius: 7,
    },
});

export default RegisterScreen;