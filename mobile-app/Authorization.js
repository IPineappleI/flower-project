import React from 'react';
import {globalStyles} from "./styles/globalStyles";
import {createStackNavigator} from "@react-navigation/stack";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Home from "./Home";
import {Image} from "react-native";

const Stack = createStackNavigator();

export default function Authorization() {
    const backArrow = () => (
        <Image
            source={require('./assets/back-arrow.png')}
            style={{width: 25, height: 25, tintColor: '#ffffff', marginLeft: 15, marginTop: 5}}
        />
    );

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: globalStyles.header,
            headerTitleStyle: globalStyles.headerText,
            headerBackTitleStyle: globalStyles.backTitleText,
            headerBackTitleVisible: false,
            headerBackImage: backArrow
        }}>
            <Stack.Screen name={'SignIn'} component={SignIn}/>
            <Stack.Screen name={'SignUp'} component={SignUp}/>
        </Stack.Navigator>
    );
}
