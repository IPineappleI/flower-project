import React from 'react';
import {globalStyles} from "./styles/globalStyles";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import Authorization from "./screens/Authorization";
import Registration from "./screens/Registration";
import {Image} from "react-native";

const Stack = createStackNavigator();

const CustomArrow = <Image source={require('./assets/white_back_arrow.png')}></Image>

export default function Navigate() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: globalStyles.header,
                headerTitleStyle: globalStyles.headerText,
                headerBackTitleStyle: globalStyles.backTitleText,
                headerBackTitleVisible: false,
                headerBackImageSource: require('./assets/white_back_arrow.png')
            }}>
                <Stack.Screen name={"Authorization"} component={Authorization}/>
                <Stack.Screen name={"Registration"} component={Registration}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
