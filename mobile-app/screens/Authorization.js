import React, {useCallback, useEffect, useState} from 'react';
import {Text, SafeAreaView, View, TouchableOpacity, Alert} from 'react-native';
import {globalStyles} from "../styles/globalStyles";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Formik} from "formik";
import axios from "axios";
import FormField from "../components/FormField";
import {authorizationValidationSchema} from "../validation";
import Catalog from "./Catalog";

export default function Authorization({navigation}) {
    const getUser = () => {
        return fetch('https://reactnative.dev/movies.json')
            .then(response => response.json())
            .then(json => {
                return json.movies;
            })
            .catch(error => {
                console.error(error);
            });
    };

    function onSignInHandler(values) {
        console.log(values);

        let user = {
            "email": values.emailOrPhoneNumber,
            "password": values.password
        }

        let query = Object.keys(user)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(user[k]))
            .join('&');
        if (query === null) {
            console.log("Null query");
        } else {
            console.log("query = " + query);
        }

        let url = "http://localhost:5022/Users/authorizeByEmail?" + query;

        try {
            console.log("url = " + url);

            const response = axios.get(url);

            response
                .then((res) => {
                    console.log(res.data);
                })
                .catch((error) => console.log("error - " + error))

            //navigation.navigate('Home', {screen: 'Catalog'});

        } catch (error) {
            console.log(error);
        }

        // Alert.alert(
        //     "Signed In Successfully!",
        //     "Form data: " + JSON.stringify(values)
        // );
    }

    function onSignUpHandler() {
        navigation.navigate("Registration");
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
                            emailOrPhoneNumber: "",
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
                                    field="emailOrPhoneNumber"
                                    label="Email or Phone Number"
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
                                    <View style={globalStyles.signUpButton}>
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
