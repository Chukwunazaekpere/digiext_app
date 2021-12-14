import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SuperAdminDashboardHome from './SuperAdminDashboardHome';
import ProfileSettings from './ProfileSettings';
import Industries from './Industries';
import Chat from './Chat';
import colors from '../../../assets/colors';

import IconComponents from '../../../constants/IconComponents';

import { createMaterialBottomTabNavigator,  } from "@react-navigation/material-bottom-tabs";
const DashboardTabs = createMaterialBottomTabNavigator();

interface Props {
    
}

const DashboardBottomTabs = (props: Props) => {
    return (
        <DashboardTabs.Navigator initialRouteName="dashboard-home" shifting={true} activeColor={colors.warning} barStyle={{backgroundColor: colors.mainBlue}}>
            <DashboardTabs.Screen options={{
                title: "Industries",
                tabBarColor: colors.mainBlue,
                tabBarIcon: () => <IconComponents style={{fontWeight: "bold"}} size={23} type="entypo" name="popup" color={colors.white} />

            }} name="industries" component={Industries} />

            <DashboardTabs.Screen options={{
                title: "Home",
                tabBarIcon: () => <IconComponents style={{color: colors.white, fontWeight: "bold"}} size={25} type="ion-icons" name="home" color={colors.white} />,
                tabBarColor: colors.mainBlue,
            }} name="dashboard-home" component={SuperAdminDashboardHome} />

            <DashboardTabs.Screen options={{
                title: "Chat",
                tabBarColor: colors.mainBlue,
                tabBarIcon: () => <IconComponents color={colors.white} size={25} type="entypo" name="chat" />
            }} name="chat" component={Chat} />

            <DashboardTabs.Screen options={{
                title: "Profile",
                tabBarColor: colors.mainBlue,
                tabBarIcon: () => <IconComponents color={colors.white} size={25} type="ant-design" name="profile" />
            }} name="profile-settings" component={ProfileSettings} />
        </DashboardTabs.Navigator>
    );
};


const styles = StyleSheet.create({});

export default DashboardBottomTabs;