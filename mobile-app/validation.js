import * as Yup from "yup";

const phoneRegExp = /^\(?\+?[0-9]{1,3}\)? ?-?[0-9]{1,3} ?-?[0-9]{3,5} ?-?[0-9]{4}( ?-?[0-9]{3})?$/
const emailRegExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

export const registrationValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
        .matches(emailRegExp, "Email is not valid")
        .required("Please enter an email address"),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
        .required("Please enter a phone number"),
    password: Yup.string()
        .required("Please enter a password")
        .min(6, "Password must have at least 6 characters"),
    confirmPassword: Yup.string()
        .required("Please confirm password")
        .oneOf([Yup.ref("password")], "Password & Confirm Password does not match"),
});

export const authorizationValidationSchema = Yup.object().shape({
    email: Yup.string()
        .matches(emailRegExp, "Please enter a valid email address")
        .required("Please enter a registered email"),
    password: Yup.string()
        .required("Please enter a password")
        .min(6, "Password must have at least 6 characters"),
});

export const editUserInfoValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
        .matches(emailRegExp, "Email is not valid")
        .required("Please enter an email address"),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid')
        .required("Please enter a phone number")
});

export const editPasswordValidationSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .required("Please enter an old password"),
    newPassword: Yup.string()
        .required("Please enter a new password")
        .min(6, "Password must have at least 6 characters"),
    confirmNewPassword: Yup.string()
        .required("Please confirm password")
        .oneOf([Yup.ref("newPassword")], "New Password & Confirm Password does not match")
});
