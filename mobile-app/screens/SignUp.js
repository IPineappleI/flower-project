import React from 'react';
import {Text, SafeAreaView, View, TouchableOpacity, Alert} from 'react-native';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Formik} from "formik";
import FormField from "../components/FormField";
import {registrationValidationSchema} from "../validation";
import {globalStyles} from "../styles/globalStyles";
import axios from "axios";

export default function SignUp({navigation}) {
    function onSubmitHandler(values) {
        let user = {
            "firstName": values.firstName,
            "lastName": values.lastName,
            "email": values.email,
            "phoneNumber": values.phoneNumber,
            "password": values.password,
            "role": "client"
        };

        let query = Object.keys(user)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(user[k]))
            .join('&');

        try {
            axios({
                method: "post",
                url: `http://localhost:7153/Users?${query}`,
                headers: {},
                data: user
            }).then((res) => {
                AsyncStorage.setItem("user", JSON.stringify(res.data)).then()

                Alert.alert("Please verify your email!","Verification link was sent to entered email!")

                navigation.navigate("SignIn");
            }).catch((error) => {
                let res = error.response;
                if (JSON.stringify(res.data).includes("email addresses must be unique")) {
                    Alert.alert("Registered email", "Want to sign in?", [
                        {
                            text: "Yes",
                            onPress: navigation.navigate("SignIn")
                        },
                        {
                            text: "No"
                        }
                    ]);
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    function isFormValid(isValid, touched) {
        return isValid && Object.keys(touched).length !== 0;
    }

    return (
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
                          isValid
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
                                label="Email"
                                values={values}
                                touched={touched}
                                errors={errors}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                            />

                            <FormField
                                field="phoneNumber"
                                label="Phone number"
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
                                label="Confirm password"
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
                                        globalStyles.submitButton,
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
    );
}
