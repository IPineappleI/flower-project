import React, {useEffect} from "react";
import {SafeAreaView, Text, StyleSheet} from "react-native";
import axios from "axios";

export default function Catalog({navigation}) {
    const items = [];

    // useEffect(() => {
    //     axios.get("http://localhost:7153/Items")
    //         .then()
    // })

    return(
        <SafeAreaView style={styles.container}>
            <Text>Catalog</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})