/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
 import "react-native-gesture-handler";
 import React,{ useEffect } from 'react';
  
 import {
     SafeAreaView,
     StatusBar,
     StyleSheet,
 } from 'react-native';
  
 import AppNavigation from "./src/routes/AppNavigation"
 import SplashScreen from "react-native-splash-screen";
 import { NavigationContainer } from "@react-navigation/native";
 import AppContextProvider from "./src/context/provider/AppContextProvider";
import colors from "./src/assets/colors";
  
 const App = () => {
     useEffect(() => {
         setTimeout(() => {
             SplashScreen.hide();
         }, 1000);
     }, []);
 
     return (
         <SafeAreaView style={styles.appContainer}>
             <StatusBar backgroundColor={colors.mainBlue} />
             <AppContextProvider>
                 <NavigationContainer>
                     <AppNavigation />
                 </NavigationContainer>
             </AppContextProvider>
         </SafeAreaView>
     );
 };
   
   const styles = StyleSheet.create({
     appContainer: {
         flex: 1
     }
  });
   
 export default App;
   