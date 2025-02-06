import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import CustomButton from "../components/custombutton";

const RegisForm = ({navigation}) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({ username: "", email: "", password: "", confirmpassword: "" });
    const [confirmpassword, setConfirmpassword] = useState("");

    const handleChange = (field, value) => {
        switch (field) {
            case "username":
                setUsername(value);
                setError((preErrors) => ({ ...preErrors, username: "" }));
                break;
            case "email":
                setEmail(value);
                setError((preErrors) => ({ ...preErrors, email: "" }));
                break;
            case "password":
                setPassword(value);
                setError((preErrors) => ({ ...preErrors, password: "" }));
                break;
            case "confirmpassword":
                setConfirmpassword(value);
                setError((preErrors) => ({ ...preErrors, confirmpassword: "" }));
                break;
            default:
                break;
        }
    };

    const ValidateField = (field, value) => {
        let error = '';
        if (!value) {
            error = 'This field is required';
        } else {
            if (field === 'email' && !/\S+@\S+\.\S+/.test(value)) {
                error = "Invalid email address";
            } else if (field === "password" && value.length < 8) {
                error = "Invalid password format";
            } else if (field === "confirmpassword" && value !== password) {
                error = "Passwords do not match";
            }
        }
        setError((preError) => ({ ...preError, [field]: error }));
        return error;
    };

    const checkSubmit = () => {
        const usernameError = ValidateField('username', username);
        const emailError = ValidateField('email', email);
        const passwordError = ValidateField('password', password);
        const confirmpasswordError = ValidateField('confirmpassword', confirmpassword);
        if (!usernameError && !emailError && !passwordError && !confirmpasswordError) {
            Alert.alert('Registration result:', 'SUCCESS!!!');
            
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmpassword('');
            setError({ username: "", email: "", password: "", confirmpassword: "" });
            navigation.navigate("card");
            
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registration Form</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={(value) => handleChange("username", value)}
                onBlur={() => ValidateField("username", username)}
            />
            {error.username ? (
                <Text style={styles.errorText}>{error.username}</Text>
            ) : null}

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={(value) => handleChange("email", value)}
                onBlur={() => ValidateField("email", email)}
            />
            {error.email ? (
                <Text style={styles.errorText}>{error.email}</Text>
            ) : null}

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={(value) => handleChange("password", value)}
                onBlur={() => ValidateField("password", password)}
            />
            {error.password ? (
                <Text style={styles.errorText}>{error.password}</Text>
            ) : null}

            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmpassword}
                onChangeText={(value) => handleChange("confirmpassword", value)}
                onBlur={() => ValidateField("confirmpassword", confirmpassword)}
            />
            {error.confirmpassword ? (
                <Text style={styles.errorText}>{error.confirmpassword}</Text>
            ) : null}

            <CustomButton
                title="Register"
                backgroundColor="green"
                onPress={checkSubmit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        fontSize: 18,
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 8,
    },
});

export default RegisForm;
