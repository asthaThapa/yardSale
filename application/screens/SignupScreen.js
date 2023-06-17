import {
    Keyboard,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native"; import { Button, Input } from '@rneui/themed';
import React, { useEffect, useRef, useState } from "react";
import { handleSignUp } from "../helper/authcontoller";

function SignupScreen({ navigation }) {
    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        phonenumber: "",
        name: "",
        location: "",
    });

    const [hidePassword, setHidePassword] = useState(true);
    const initialField = useRef(null);
    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Log In", { state })
                    }>
                    <Text style={styles.headerButton}>Log In</Text>
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
                    placeholder="Name"
                    ref={initialField}
                    value={state.username}
                    autoCorrect={false}
                    inputContainerStyle={styles.input}
                    inputStyle={styles.inputtext}
                    // errorStyle={styles.inputError}
                    // errorMessage={validate(state.username)}
                    onChangeText={(val) => updateStateObject({ username: val })}
                />
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
                    placeholder="Enter Password"
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
                        title="Sign Up"
                        color="#1be3a7"
                        buttonStyle={styles.buttons}
                        titleStyle={styles.btitle}
                        onPress={() => {
                            // console.log("log in");
                            // storeUser(state);
                            
                            const error = handleSignUp(state);
                            if(!error){
                                navigation.navigate("Log In ");
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

export default SignupScreen;