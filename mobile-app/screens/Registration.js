import React, {useCallback, useEffect, useState} from 'react';
import {Text, SafeAreaView, View, TouchableOpacity, Alert} from 'react-native';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {Formik} from "formik";
import axios from "axios";
import FormField from "../components/FormField";
import {registrationValidationSchema} from "../validation";
import {globalStyles} from "../styles/globalStyles";

export default function Registration({navigation}) {
    function onSubmitHandler(values) {
        let user = {
            "id": null,
            "firstName": values[0],
            "lastName": values[1],
            "email": values[2],
            "phoneNumber": values[3],
            "password": values[4],
            "role": "client",
            "shoppingCartId": null
        }

        let query = Object.keys(user)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(user[k]))
            .join('&');

        let url = "https://localhost:7153/Users";

        try {
            const response = axios.post(url, user);

            // response
            //     .then((res) => {
            //         localStorage.setItem("user", JSON.stringify(res?.data))
            //     })
            //     .catch((error) => console.log(error.response))
        } catch (error) {
            console.log(error)
        }

        Alert.alert(
            "Register Successfully!",
            "Form data: " + JSON.stringify(values)
        );
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
                            firstName: "",
                            lastName: "",
                            email: "",
                            phoneNumber: "",
                            password: "",
                            confirmPassword: "",
                        }}
                        onSubmit={onSubmitHandler}
                        validationSchema={registrationValidationSchema}
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
                                    field="firstName"
                                    label="First Name"
                                    autoCapitalize="words"
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />

                                <FormField
                                    field="lastName"
                                    label="Last Name"
                                    autoCapitalize="words"
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />

                                <FormField
                                    field="email"
                                    label="Email Address"
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />

                                <FormField
                                    field="phoneNumber"
                                    label="Phone Number"
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

                                <FormField
                                    field="confirmPassword"
                                    label="Confirm Password"
                                    secureTextEntry={true}
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />

                                <TouchableOpacity
                                    onPress={handleSubmit}
                                >
                                    <View
                                        style={[
                                            globalStyles.signUpButton,
                                            {
                                                opacity: isFormValid(isValid, touched) ? 1 : 0.5,
                                            },
                                        ]}
                                    >
                                        <Text style={globalStyles.buttonText}>SUBMIT</Text>
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
