import React from "react";
import {SafeAreaView, Text} from "react-native";

export default function ShoppingCart({navigation}) {
    return (
        <SafeAreaView style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text>Shopping cart</Text>
        </SafeAreaView>
    );
}