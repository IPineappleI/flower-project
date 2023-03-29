import {globalStyle} from "../styles/globalStyle";
import React, {useCallback, useEffect, useState} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';


export default function Header() {
    return (
        <View style={styles.main}>
            <Text style={globalStyle.title}>Flower App</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        paddingTop: 50,
        height: 100,
        backgroundColor: '#fafafa'
    }
})