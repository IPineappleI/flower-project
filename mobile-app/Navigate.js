import React from 'react';
import {globalStyles} from "./styles/globalStyles";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import Authorization from "./screens/Authorization";
import Registration from "./screens/Registration";
import Home from "./Home";
import {Image} from "react-native";

const CustomArrow = () => (
    <Image
    source={require('./assets/back-arrow.png')}
    style={{width: 24, height: 24, tintColor: '#fff', marginLeft: 15, marginTop: 5}}
    />
);

const Stack = createStackNavigator();

export default function Navigate() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: globalStyles.header,
                headerTitleStyle: globalStyles.headerText,
                headerBackTitleStyle: globalStyles.backTitleText,
                headerBackTitleVisible: false,
                headerBackImage: CustomArrow
            }}>
                <Stack.Screen name={'Authorization'} component={Authorization}/>
                <Stack.Screen name={'Registration'} component={Registration}/>
                <Stack.Screen
                    name={'Home'} component={Home} options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
