import React, {useState} from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Image} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import UserPage from "./UserPage";
import Catalog from "./screens/Catalog";
import ShoppingCart from "./screens/ShoppingCart";
import {globalStyles} from "./styles/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BottomTab = createBottomTabNavigator();

export default function Home() {
    return (
        <NavigationContainer>
            <BottomTab.Navigator initialRouteName={'Catalog'} backBehavior={'history'}
                                 screenOptions={{
                                     headerStyle: globalStyles.header,
                                     headerTitleStyle: globalStyles.headerText,
                                     tabBarShowLabel: false,
                                     tabBarActiveTintColor: "#ffffff",
                                     tabBarInactiveTintColor: "#c388ef",
                                     tabBarStyle: {
                                         backgroundColor: "#ab50ee",
                                     }
                                 }}>
                <BottomTab.Screen name={'UserPage'} component={UserPage} options={
                    {
                        headerShown: false,
                        tabBarIcon: ({color}) => {
                            return (
                                <Image source={require("./assets/user.png")}
                                       style={{width:25, height: 25, tintColor: color}}
                                />
                            );
                        }
                    }
                }/>
                <BottomTab.Screen name={'Catalog'} component={Catalog} options={
                    {
                        title: "Shop",
                        headerTitleAlign: "center",
                        tabBarIcon: ({color}) => {
                            return (
                                <Image source={require("./assets/shop.png")}
                                       style={{width:25, height: 25, tintColor: color}}
                                />
                            );
                        }
                    }
                }/>
                <BottomTab.Screen name={'ShoppingCart'} component={ShoppingCart} options={
                    {
                        title: "Shopping Cart",
                        headerTitleAlign: "center",
                        tabBarIcon: ({color}) => {
                            return (
                                <Image source={require("./assets/shopping-cart.png")}
                                       style={{width:25, height: 25, tintColor: color}}
                                />
                            );
                        }
                    }
                }/>
            </BottomTab.Navigator>
        </NavigationContainer>
    );
}
