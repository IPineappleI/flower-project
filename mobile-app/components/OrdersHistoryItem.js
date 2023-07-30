import React, {useState} from "react";
import { View, Text, StyleSheet} from "react-native";

export default function OrdersHistoryItem({orderInfo}) {
    const maxItemsToShow = 5;
    const [showAllItems, setShowAllItems] = useState(false);

    let order = {
        "id": orderInfo.id,
        "dateAndTime": orderInfo.dateAndTime,
        "status": orderInfo.status,
        "shoppingCart": orderInfo.shoppingCart,
        "price": orderInfo.price,
    }

    const renderedItems = showAllItems ? order.shoppingCart : order.shoppingCart.slice(0, maxItemsToShow);

    const formatDate = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        };

        return dateTime.toLocaleDateString('en', options);
    }

    return (
        <View style={styles.container}>
            <View style={styles.orderTopInfo}>
                <Text style={styles.orderTopInfoText}>Order ID: {order.id}</Text>
                <Text style={styles.orderTopInfoText}>Price: {order.price} rub</Text>
            </View>
            <View style={styles.orderTopInfo}>
                <Text style={styles.commonText}>{formatDate(order.dateAndTime)}</Text>
                <Text style={[styles.commonText, {color: 'green'}]}>{order.status}</Text>
            </View>
            <View style={{paddingTop: 10, paddingLeft: 15}}>
                <Text style={styles.orderTopInfoText}>Items:</Text>
                {
                    renderedItems.map((item) => {
                        let orderItem = {
                            "id": item.id,
                            "name": item.name,
                            "quantity": item.quantity
                        }

                        return (
                            <View key={orderItem.id}>
                                <Text style={styles.commonText}>{orderItem.name} - {orderItem.quantity} pcs</Text>
                            </View>
                        );
                    })
                }
                {
                    !showAllItems && order.shoppingCart.length > maxItemsToShow && (
                        <Text style={{alignSelf: "center"}}>...</Text>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderColor: "rgba(158, 150, 150, .4)",
        borderWidth: 1
    },
    orderTopInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 15,
        paddingRight: 15
    },
    orderTopInfoText: {
        fontFamily: "os-bold",
    },
    commonText: {
        fontFamily: "os-light"
    }
});
