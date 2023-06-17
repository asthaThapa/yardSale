import {
    Keyboard,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { Button, Input } from '@rneui/themed';
import React, { useEffect, useRef, useState } from "react";

import { handleLogin } from "../helper/authcontoller";

function LoginScreen({ navigation }) {
    const [state, setState] = useState({
        username: "Baozi",
        email: "User2@mail.com",
        password: "123456",
    });

    const [hidePassword, setHidePassword] = useState(true);
    const [isUserSignedIn, setuser] = useState(false);
    const initialField = useRef(null);

    useEffect(() => {
        navigation.setOptions({
            headerRight: isUserSignedIn ? null : () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("Sign Up");
                    }}
                >
                    <Text style={styles.headerButton}>Sign Up</Text>
                </TouchableOpacity>
            ),
        });
    });

    const dismissKeyboard = () => {
        console.log('Platform=', Platform.OS);
        if (Platform.OS != "web") {
            Keyboard.dismiss();
        }
    };

    const updateStateObject = (vals) => {
        setState({
            ...state,
            ...vals,
        });
    };

    const togglehidepassword = () => {
        setHidePassword(!hidePassword);
    };

    function validate(value) {
        return (value) ? "Must be a number" : "";
    }

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={styles.container}>
                <Input
                    placeholder="Email"
                    ref={initialField}
                    value={state.email}
                    autoCorrect={false}
                    inputContainerStyle={styles.input}
                    inputStyle={styles.inputtext}
                    // errorStyle={styles.inputError}
                    // errorMessage={validate(state.username)}
                    onChangeText={(val) => updateStateObject({ email: val })}
                />
                <Input
                    placeholder="Password"
                    ref={initialField}
                    value={state.password}
                    autoCorrect={false}
                    secureTextEntry={hidePassword}
                    inputContainerStyle={styles.input}
                    inputStyle={styles.inputtext}
                    rightIcon={
                        <TouchableOpacity onPress={togglehidepassword}>
                            <Text style={styles.text}>{hidePassword ? "Show" : "Hide"}</Text>


                        </TouchableOpacity>
                    }
                    rightIconContainerStyle={styles.iconstyle}
                    // errorStyle={styles.inputError}
                    // errorMessage={validate(state.username)}
                    onChangeText={(val) => updateStateObject({ password: val })}
                />
                <View>
                    <Button
                        title="Log In"
                        color="#1be3a7"
                        buttonStyle={styles.buttons}
                        titleStyle={styles.btitle}
                        onPress={() => {
                            const error = handleLogin(state);
                            if(!error){
                                navigation.navigate("Main");
                            }

                        }
                        }
                    />
                </View>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Log In")
                    }>
                    <Text style={styles.text}>Forgot Your Password?</Text>

                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "white",
        flex: 1,
    },
    buttons: {
        padding: 10,
        borderRadius: 30,
    },
    inputError: {
        color: "red",
    },
    input: {
        borderBottomWidth: 0,
        backgroundColor: "#e6e6e6",
        borderRadius: 10,
        height: 50,
    },
    inputtext: {
        marginLeft: 10,
    },
    headerButton: {
        marginRight: 10,
        color: "#1be3a7",
        fontWeight: "bold",
    },
    text: {
        color: "#1be3a7",

    },
    btitle: {
        fontWeight: 'bold',
        fontSize: 23,
    },
    iconstyle: {
        marginRight: 10,
    },
});

export default LoginScreen;