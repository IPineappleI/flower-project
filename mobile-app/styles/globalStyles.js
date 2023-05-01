import { StyleSheet, Platform } from "react-native";
import Constants from "expo-constants";

const HEADER_BACKGROUND = "#ab50ee";
const CONTENT_BACKGROUND = "#f9f9f9";

export const globalStyles = StyleSheet.create({
    mainSafeArea: {
        backgroundColor: HEADER_BACKGROUND,
        flex: 1
    },
    topSafeArea: {
        backgroundColor: HEADER_BACKGROUND,
    },
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor:
            Platform.OS === "ios" ? CONTENT_BACKGROUND : HEADER_BACKGROUND,
    },
    header: {
        height: 60,
        backgroundColor: HEADER_BACKGROUND,
    },
    headerText: {
        color: "#fff",
        fontSize: 18
    },
    backTitleText: {
        color: "#30135b",
        fontSize: 18
    },
    content: {
        padding: 20,
        backgroundColor: CONTENT_BACKGROUND
    },
    formGroup: {
        marginBottom: 10,
    },
    label: {
        color: "#7d7e79",
        fontSize: 16,
        lineHeight: 30
    },
    input: {
        height: 50,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#e3e3e3",
        backgroundColor: "#fff"
    },
    errorContainer: {
        marginVertical: 5,
    },
    errorText: {
        color: "#ff7675",
    },
    signInButton: {
        marginTop: 20,
        backgroundColor: HEADER_BACKGROUND,
        padding: 15,
        borderRadius: 15,
    },
    signUpButton: {
        marginTop: 20,
        backgroundColor: HEADER_BACKGROUND,
        padding: 15,
        borderRadius: 15,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
    },
});
