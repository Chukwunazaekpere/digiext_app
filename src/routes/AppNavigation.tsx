import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import screens from '../screens';

import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
const StackNavigator = createStackNavigator();

interface Props {
    
}

const AppNavigation = (props: Props) => {
    return (
        <StackNavigator.Navigator>

            <StackNavigator.Screen options={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter || CardStyleInterpolators.forHorizontalIOS
            }} name="onboarding" component={screens.OnboardingScreen} />

            <StackNavigator.Screen options={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid || CardStyleInterpolators.forHorizontalIOS
            }} name="sign-up" component={screens.RegisterScreen} />

            <StackNavigator.Screen options={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid || CardStyleInterpolators.forHorizontalIOS
            }} name="sign-in" component={screens.LoginScreen} />

            <StackNavigator.Screen options={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid || CardStyleInterpolators.forHorizontalIOS
            }} name="otp" component={screens.OTPScreen} />

            <StackNavigator.Screen options={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid || CardStyleInterpolators.forHorizontalIOS
            }} name="reset-password" component={screens.ForgotPasswordScreen} />

            <StackNavigator.Screen options={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid || CardStyleInterpolators.forHorizontalIOS
            }} name="dashboard" component={screens.SuperAdminDashboardBottomTabs} />

        </StackNavigator.Navigator>
    );
};


const styles = StyleSheet.create({});

export default AppNavigation;