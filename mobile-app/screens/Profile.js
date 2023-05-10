import React, {useEffect, useState} from "react";
import {Image, SafeAreaView, ScrollView, Text, View, StyleSheet, FlatList, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({navigation}) {
    const [userInfo, setUserInfo] = useState('');
    const [userLoaded, loadUser] = useState(false);

    useEffect(() => {
        if (userLoaded) {
            return;
        }

        AsyncStorage.getItem("user").then(res => {
            setUserInfo(res);
        });

        loadUser(true);
    })

    if (userLoaded && userInfo === null) {
        return (
            <SafeAreaView style={{flex: 1}}>

            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView>
                <View style={styles.userInfoBlock}>
                    <View style={styles.avatarContainer}>
                        <Image source={require("../assets/user-profile.png")} style={styles.avatarImage}/>
                    </View>

                    <View>
                        <Text>{userInfo}</Text>
                        <Text></Text>
                    </View>
                </View>
                {/*<FlatList data={} renderItem={}/>*/}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    avatarContainer: {
        borderRadius: 10,
        marginLeft: 25,
        marginTop: 10,
        marginBottom: 10
    },
    avatarImage: {
        width: 100,
        height: 100,
        borderRadius: 63,
        borderWidth: 5,
        borderColor: "rgba(87, 87, 87, 1)",
        tintColor: "rgba(87, 87, 87, 0.8)"
    },
    userInfoBlock: {
        flex: 1,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "rgba(158, 150, 150, .4)"
    }
});
