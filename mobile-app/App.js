import React, {useCallback, useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {SafeAreaView} from 'react-native';
import Home from "./Home";
import {globalStyles} from "./styles/globalStyles";
import AsyncStorage, {useAsyncStorage} from "@react-native-async-storage/async-storage";

SplashScreen.preventAutoHideAsync().catch((e) => console.warn(e));

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        Font.loadAsync({
            'os-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
            'os-bold-it': require('./assets/fonts/OpenSans-BoldItalic.ttf'),
            'os-light': require('./assets/fonts/OpenSans-Light.ttf'),
            'os-light-it': require('./assets/fonts/OpenSans-LightItalic.ttf')
        }).then(() => setAppIsReady(true)).catch(e => console.warn(e));
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    // AsyncStorage.removeItem("user").then(() => console.log("User data was deleted"));

    return (
        <SafeAreaView onLayout={onLayoutRootView} style={globalStyles.mainSafeArea}>
            <Home/>
        </SafeAreaView>
    );
}
