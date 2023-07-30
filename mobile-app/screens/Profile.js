import React, {useCallback, useEffect, useState} from "react";
import {
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    StyleSheet,
    RefreshControl,
    Dimensions,
    TouchableOpacity
} from "react-native";
import {FlashList} from "@shopify/flash-list";
import axios from "axios";
import OrdersHistoryItem from "../components/OrdersHistoryItem";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile({navigation, route}) {
    let user = JSON.parse(route.params.userInfo);
    const [orders, setOrders] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        getOrders();
    }, []);

    const getOrders = () => {
        axios.get(`http://localhost:7153/Orders/byClientId?clientId=${user.id}`)
            .then((res) => {
                setOrders(res.data);
                console.log("Axios get request done - orders set res.data");
            }).catch((e) => {
                console.log(e);
        })
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        getOrders();
        setRefreshing(false);
        console.log("refreshed");
    }, []);

    return (
        <SafeAreaView style={{flex: 1}}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
            }>
                <View style={styles.userNameBlock}>
                    <View style={styles.avatarContainer}>
                        <Image source={require("../assets/user-profile.png")} style={styles.avatarImage}/>
                    </View>

                    <View style={styles.fullName}>
                        <Text style={styles.fullNameText}>{user.firstName}</Text>
                        <Text style={styles.fullNameText}>{user.lastName}</Text>
                    </View>
                </View>

                <View style={styles.contactDetails}>
                    <View>
                        <Text style={styles.contactDetailsText}>email: {user.email}</Text>
                        <Text style={styles.contactDetailsText}>phone: {user.phoneNumber}</Text>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('EditProfile', {user})}>
                        <Image source={require("../assets/edit.png")} style={styles.editImage}/>
                    </TouchableOpacity>
                </View>

                <View style={{height: Dimensions.get("screen").height}}>
                    <Text style={styles.historyTitle}>Orders history</Text>
                    {
                        !refreshing && orders !== [] ? (
                            <View style={{flex: 1}}>
                                <FlashList data={orders.sort((a, b) => b.id - a.id)} estimatedItemSize={50}
                                           renderItem={({item}) => <OrdersHistoryItem orderInfo={item}/>}
                                />
                            </View>
                        ) : (
                            <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
                                <Text>No orders yet</Text>
                            </View>
                        )
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    avatarContainer: {
        borderRadius: 10,
        marginBottom: 10,
        paddingTop: 10,
    },
    avatarImage: {
        width: 80,
        height: 80,
        borderRadius: 63,
        borderWidth: 5,
        borderColor: "rgba(87, 87, 87, 1)",
        tintColor: "rgba(87, 87, 87, 1)"
    },
    userNameBlock: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    fullName: {
        padding: 20,
    },
    fullNameText: {
        fontFamily: "os-bold",
        fontSize: 20,
    },
    contactDetails: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: "rgba(158, 150, 150, .4)",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    contactDetailsText: {
        fontFamily: "os-light",
        fontSize: 15,
    },
    historyTitle: {
        fontFamily: "os-bold",
        fontSize: 16,
        alignSelf: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    editImage: {
        width: 25,
        height: 25,
        tintColor: "rgba(87, 87, 87, 1)"
    }
});
