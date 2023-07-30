import React, {useEffect, useState} from "react";
import {Image} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {createStackNavigator} from "@react-navigation/stack";
import Profile from "./screens/Profile";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import {globalStyles} from "./styles/globalStyles";
import EditProfile from "./screens/EditProfile";

const Stack = createStackNavigator();

const backArrow = () => (
    <Image
        source={require('./assets/back-arrow.png')}
        style={{width: 25, height: 25, tintColor: '#ffffff', marginLeft: 20, padding: 13}}
    />
);

export default function UserPage({navigation, route}) {
    const isUserInfoChanged = route.params === undefined ? false : route.params.isUserInfoChanged;

    const [userInfo, setUserInfo] = useState(null);
    const [userLoaded, setUserLoaded] = useState(false);

    useEffect(() => {
        AsyncStorage.getItem("user").then(res => {
            setUserInfo(res);
            console.log(res);
        });
        console.log("getUser in userPage");
    }, [isUserInfoChanged]);

    useEffect(() => {
        if (userInfo === null) {
            setUserLoaded(false);
        } else {
            setUserLoaded(true);
        }
    }, [userInfo]);

    return (
        <Stack.Navigator screenOptions={{
            headerStyle: globalStyles.header,
            headerTitleStyle: globalStyles.headerText,
            headerBackTitleVisible: false,
            headerTitleAlign: "center",
            headerBackImage: backArrow
        }}>
            {(userLoaded || isUserInfoChanged) && userInfo !== null ? (
                <Stack.Group>
                    <Stack.Screen name={'Profile'} component={Profile} initialParams={{userInfo}}/>
                    <Stack.Screen name={'EditProfile'} component={EditProfile} options={{
                        title: "Edit Profile"
                    }}/>
                </Stack.Group>
            ) : (
                <Stack.Group screenOptions={{animationTypeForReplace: "pop"}}>
                    <Stack.Screen name={'SignIn'} component={SignIn} options={{
                        title: "Sing In"
                    }}/>
                    <Stack.Screen name={'SignUp'} component={SignUp} options={{
                        title: "Sign Up"
                    }}/>
                </Stack.Group>
            )}
        </Stack.Navigator>
    );
}
