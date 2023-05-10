import React from 'react';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {globalStyles} from "./styles/globalStyles";
import Catalog from "./screens/Catalog";
import Profile from "./screens/Profile";
import ShoppingCart from "./screens/ShoppingCart";
import {Image} from "react-native";
import {NavigationContainer} from "@react-navigation/native";

const BottomTab = createBottomTabNavigator();

export default function Home() {
    return (
        <NavigationContainer>
            <BottomTab.Navigator
                initialRouteName={'Catalog'}
                backBehavior={'history'}
                screenOptions={{
                    headerStyle: globalStyles.header,
                    headerTitleStyle: globalStyles.headerText,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: "#ffffff",
                    tabBarInactiveTintColor: "#c388ef",
                    tabBarStyle: {
                        backgroundColor: "#ab50ee",
                        flex: 0.1
                    }
                }}
            >
                <BottomTab.Screen name={'Profile'} component={Profile} options={
                    {
                        title: "Profile",
                        headerTitleAlign: "center",
                        tabBarIcon: ({color}) => {
                            return (<Image
                                    source={require("./assets/user.png")}
                                    style={{width:25, height: 25, tintColor: color}}
                            />);
                        },
                    }
                }/>
                <BottomTab.Screen name={'Catalog'} component={Catalog} options={
                    {
                        title: "Shop",
                        headerTitleAlign: "center",
                        tabBarIcon: ({color}) => {
                            return (<Image
                                source={require("./assets/shop.png")}
                                style={{width:25, height: 25, tintColor: color}}
                            />);
                        }
                    }
                }/>
                <BottomTab.Screen name={'ShoppingCart'} component={ShoppingCart} options={
                    {
                        title: "Shopping Cart",
                        headerTitleAlign: "center",
                        tabBarIcon: ({color}) => {
                            return (<Image
                                source={require("./assets/shopping-cart.png")}
                                style={{width:25, height: 25, tintColor: color}}
                            />);
                        }
                    }
                }/>
            </BottomTab.Navigator>
        </NavigationContainer>
    );
}