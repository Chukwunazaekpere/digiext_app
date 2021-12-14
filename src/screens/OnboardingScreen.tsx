import React, { FC, useState, useEffect } from 'react'
import { StyleSheet, Text, View, StatusBar, Dimensions } from 'react-native'

import colors from "../assets/colors";
import UpperHemisphereLayout from "../constants/layouts/UpperHemisphereLayout";
import LowerHemisphereLayout from "../constants/layouts/LowerHemisphereLayout"

import ImageComponent from "../constants/ImageComponent";
import Button from "../constants/Button";

import ScaleAnimation from "../constants/animations/ScaleAnimation";
import FadeAnimation from "../constants/animations/FadeAnimation";
// import ImageAnimator from "../constants/animations/ImageAnimator";

import CircularProgressBar from "../constants/progressbars/CircularProgressBar"
import LeftTranslateAnimator from "../constants/animations/LeftTranslateAnimator";
import { asyncGetItem } from "../helpers/asyncStorage";

interface Props {
    navigation: {
        navigate:(screen: string) => void
    };
};

const { width, height } = Dimensions.get("screen");
const OnboardingScreen: FC<Props> = ({ children, navigation }) => {
    const authButtons = ["Sign-in", "Sign-up"];
    const [showProgressBar, setShowProgressBar] = useState(true);
    const { navigate } = navigation;
    // elevation works on android and zIndex for ios

    const { BrandLogo } = ImageComponent;
    useEffect(() => {
        // console.log("\n\t OnboardingScreen...");
        (async () => {
            try {
                const authenticatedUserName = await asyncGetItem("authenticatedUserName");
                console.log("\n\t User onboarding.tsx: ", authenticatedUserName);
                setShowProgressBar(false);
                if(authenticatedUserName){
                    setTimeout(() => {
                        navigate("dashboard");
                    }, 2000);
                }else{
                    setTimeout(() => {
                        setShowProgressBar(false);
                    }, 5200);
                }
            } catch (error) {
              //...
            }
        })();
    }, []);

    const handleNavigation = (screenName: string) => {
        setShowProgressBar(false);
        navigate(screenName.toLowerCase());
    };
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.mainBlue} barStyle={'light-content'} />
            {
                !showProgressBar ?
                <View style={{display: "flex", flex: 1, justifyContent: "space-around"  }}>
                    <UpperHemisphereLayout style={{backgroundColor: colors.mainBlue, height: 200}}/>
                    <FadeAnimation style={{elevation: 10, marginTop: 20}}>
                        <LeftTranslateAnimator animationDuration={6000}>
                            <Text style={styles.welcomeText}>Welcome...</Text>
                        </LeftTranslateAnimator>
                        {
                            authButtons.map(buttonName => (
                                <Button 
                                    containerStyle={{...styles.btnContainerStyle,
                                        borderWidth: buttonName === "Sign-up" ? 2 : undefined, 
                                        borderColor: buttonName === "Sign-up" ? colors.strokeColor : undefined, 
                                        backgroundColor: buttonName === "Sign-up" ? colors.mainBlue : colors.strokeColor,
                                        elevation: 10,
                                    }}
                                    
                                    btnText={buttonName} 
                                    onPress={() => handleNavigation(buttonName)} 
                                    textStyle={{
                                        ...styles.textContainerStyle,
                                        color: buttonName === "Sign-up" ? colors.strokeColor: colors.white 
                                    }}
                                    key={buttonName}
                                />
                            ))
                        }
                    </FadeAnimation>
                    <ScaleAnimation style={styles.animateVertical}>
                        <BrandLogo style={styles.brandLogoStyle} />
                    </ScaleAnimation>
                    <LowerHemisphereLayout style={{borderRadius: 150, backgroundColor: colors.mainBlue, marginTop: height, borderColor: colors.strokeColor}} containerHeight={height/13} outerContainerColor={colors.mainBlue} />
                </View>
                :
                <View style={{elevation: 300, marginTop: 50, alignItems: "center"}}>
                    <CircularProgressBar />
                </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainBlue,
        // justifyContent: "space-between",
        display: "flex",
        justifyContent: "center",
    },
    indiviualInput: {
        flex: 1,
        marginBottom: 65,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: colors.mainBlue
    },
    animateVertical: {
    },
    btnContainerStyle: {
        marginVertical: 7,
        marginHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 10,
    },
    textContainerStyle: {
        fontWeight: "600",
        fontSize: 17,
        fontFamily: "Merriweather-Light"
    },
    brandLogoStyle: {
        resizeMode: "contain",
        width: 200,
        height: 70,
        alignSelf: "center",
    },
    welcomeText: {
        elevation: 30, 
        textAlign: "center", 
        fontWeight: "600", 
        color: colors.strokeColor,
        fontSize: 25, 
        fontFamily: "Merriweather-Bold"
    }

});

export default OnboardingScreen;