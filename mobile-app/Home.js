import React from 'react';
import {globalStyles} from "./styles/globalStyles";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import Catalog from "./screens/Catalog";
import User from "./screens/User";
import ShoppingCart from "./screens/ShoppingCart";

const BottomTab = createMaterialBottomTabNavigator();

export default function Home() {
    return (
        <BottomTab.Navigator
            initialRouteName={'Catalog'}
            activeColor={'blue'}
            inactiveColor={'red'}
            backBehavior={'history'}
            screenOptions={{
            // headerStyle: globalStyles.header,
            // headerTitleStyle: globalStyles.headerText
        }}>
            <BottomTab.Screen name={'User'} component={User}/>
            <BottomTab.Screen name={'Catalog'} component={Catalog}/>
            <BottomTab.Screen name={'ShoppingCart'} component={ShoppingCart}/>
        </BottomTab.Navigator>
    );
}