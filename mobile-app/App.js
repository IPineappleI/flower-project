import React, {useCallback, useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {NavigationContainer} from "@react-navigation/native";
import {Alert, SafeAreaView} from 'react-native';

import Home from "./Home";
import {globalStyles} from "./styles/globalStyles";
import SignIn from "./screens/SignIn";
import Authorization from "./Authorization";

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                // Preload fonts, making any API calls
                await Font.loadAsync({
                    'os-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
                    'os-bold-it': require('./assets/fonts/OpenSans-BoldItalic.ttf'),
                    'os-light': require('./assets/fonts/OpenSans-Light.ttf'),
                    'os-light-it': require('./assets/fonts/OpenSans-LightItalic.ttf')
                });
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <SafeAreaView onLayout={onLayoutRootView} style={globalStyles.mainSafeArea}>
            <NavigationContainer>
                <Authorization/>
            </NavigationContainer>
        </SafeAreaView>
    );
}
