import React, {useState} from 'react';
import {Text, SafeAreaView, View, TouchableOpacity, Alert} from 'react-native';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {authorizationValidationSchema} from "../validation";
import {globalStyles} from "../styles/globalStyles";
import FormField from "../components/FormField";
import {Formik} from "formik";
import axios from "axios";

export default function SignIn({navigation}) {
    const [isUserSignedIn, setUserSignedIn] = useState(false);

    function onSignInHandler(values) {
        let user = {
            "email": values.email,
            "password": values.password
        }

        let query = Object.keys(user)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(user[k]))
            .join('&');

        try {
            axios.get(`http://localhost:7153/Users/authorizeByEmail?${query}`)
                .then((res) => {
                AsyncStorage.setItem("user", JSON.stringify(res.data))
                    .then(() => {
                    setUserSignedIn(true);
                    navigation.navigate("UserPage", {isUserInfoChanged: isUserSignedIn});
                });
            }).catch((error) => {
                    let res = error.response;
                    if (res.data === "user not found") {
                        Alert.alert("Unsigned user", "Want to sign up?", [
                            {
                                text: "Yes",
                                onPress: () => onSignUpHandler()
                            },
                            {
                                text: "No"
                            }
                        ])
                    } else if (res.data === "incorrect password") {
                        Alert.alert("Wrong password!");
                    }
                });
        } catch (error) {
            console.log(error);
        }
    }

    function onSignUpHandler() {
        navigation.navigate('SignUp');
    }

    function isFormValid(isValid, touched) {
        return isValid && Object.keys(touched).length !== 0;
    }

    return (
        <>
            <SafeAreaView style={globalStyles.container}>
                <KeyboardAwareScrollView
                    style={globalStyles.content}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    extraScrollHeight={150}
                >
                    <Formik
                        initialValues={{
                            email: "",
                            password: "",
                        }}
                        onSubmit={onSignInHandler}
                        validationSchema={authorizationValidationSchema}
                    >
                        {({
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              values,
                              errors,
                              touched,
                              isValid,
                          }) => (
                            <>
                                <FormField
                                    field="email"
                                    label="Email"
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />

                                <FormField
                                    field="password"
                                    label="Password"
                                    secureTextEntry={true}
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />

                                <TouchableOpacity onPress={handleSubmit}>
                                    <View
                                        style={[
                                            globalStyles.signInButton,
                                            {
                                                opacity: isFormValid(isValid, touched) ? 1 : 0.5,
                                            }
                                        ]}
                                    >
                                        <Text style={globalStyles.buttonText}>SIGN IN</Text>
                                    </View>
                                </TouchableOpacity>

                                <Text style={[globalStyles.label, {paddingTop: 20, textAlign: 'center'}]}>
                                    Don't have an account?
                                </Text>

                                <TouchableOpacity onPress={onSignUpHandler} style={{marginTop: -15}}>
                                    <View style={globalStyles.submitButton}>
                                        <Text style={globalStyles.buttonText}>SIGN UP</Text>
                                    </View>
                                </TouchableOpacity>
                            </>
                        )}
                    </Formik>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </>
    );
}
