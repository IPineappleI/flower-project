import React from "react";
import {Alert, SafeAreaView, Text, TouchableOpacity, View} from "react-native";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {globalStyles} from "../styles/globalStyles";
import {Formik} from "formik";
import {editUserInfoValidationSchema} from "../validation";
import FormField from "../components/FormField";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditProfile ({navigation, route}) {
    const user = route.params.user;

    function onUserInfoChangeHandler(values) {
        let userUpdatedInfo = {
            "id": user.id,
            "firstName": values.firstName,
            "lastName": values.lastName,
            "email": values.email,
            "phoneNumber": values.phoneNumber,
            "password": user.password,
            "role": user.role,
            "shoppingCart": user.shoppingCart
        }

        let query = Object.keys(user)
            .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(user[k]))
            .join('&');

        axios.put(`http://localhost:7153/Users?${query}`, userUpdatedInfo)
            .then(() => {
                AsyncStorage.setItem("user", JSON.stringify(userUpdatedInfo))
                    .then(() => {
                        Alert.alert("Info update", "User info was successfully updated");
                        navigation.navigate("UserPage", {isUserInfoChanged: true});
                    })
            }).catch(e => {console.log(e)});
    }

    function onPasswordChangeHandler(values) {

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
                extraScrollHeight={300}
                contentContainerStyle={{paddingBottom: 40}}
            >
                <Formik
                    initialValues={{
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        phoneNumber: user.phoneNumber
                    }}
                    onSubmit={onUserInfoChangeHandler}
                    validationSchema={editUserInfoValidationSchema}
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
                                    label="Phone Number"
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
                                                opacity: isValid ? 1 : 0.5,
                                            },
                                        ]}
                                    >
                                        <Text style={globalStyles.buttonText}>SUBMIT CHANGING</Text>
                                    </View>
                                </TouchableOpacity>
                            </>
                        )
                    }
                </Formik>

                <Formik
                    initialValues={{
                        oldPassword: user.password,
                        newPassword: "",
                        confirmNewPassword: ""
                    }}
                    onSubmit={onPasswordChangeHandler}
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
                            <View style={{paddingTop: 25}}>
                                <FormField
                                    field="oldPassword"
                                    label="Old Password"
                                    secureTextEntry={true}
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />

                                <FormField
                                    field="newPassword"
                                    label="New Password"
                                    secureTextEntry={true}
                                    values={values}
                                    touched={touched}
                                    errors={errors}
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                />

                                <FormField
                                    field="confirmNewPassword"
                                    label="Confirm New Password"
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
                                        <Text style={globalStyles.buttonText}>SUBMIT CHANGING</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        )
                    }
                </Formik>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}