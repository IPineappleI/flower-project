import React from "react";
import { View, Text, TextInput } from "react-native";
import { globalStyles } from "../styles/globalStyles";

export default function FormField({
                                      field,
                                      label,
                                      secureTextEntry,
                                      autoCapitalize,
                                      values,
                                      touched,
                                      errors,
                                      handleChange,
                                      handleBlur,
                                  }) {
    return (
        <View style={globalStyles.formGroup}>
            <Text style={globalStyles.label}>{label}</Text>

            <TextInput
                style={globalStyles.input}
                value={values[field]}
                onChangeText={handleChange(field)}
                onBlur={handleBlur(field)}
                secureTextEntry={secureTextEntry}
                autoCapitalize={autoCapitalize || "none"}
            />

            {touched[field] && errors[field] ? (
                <View style={globalStyles.errorContainer}>
                    <Text style={globalStyles.errorText}>{errors[field]}</Text>
                </View>
            ) : null}
        </View>
    );
}
