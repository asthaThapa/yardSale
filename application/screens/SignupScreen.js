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

import {
    initDB,
    setupSignUpListener,
    storeUser,
} from "../helper/fb-data";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";

function SignupScreen({ navigation }) {
    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
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


    useEffect(() => {
        try {
             initDB();
        } catch (err) {
            console.log(err);
        }
    }, []);

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

    const signUp = () => {
        const auth = getAuth();
        const data = getDatabase();

        createUserWithEmailAndPassword(auth, state.email, state.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                set(ref(data, 'users/' + user.uid), {
                    username: state.username,
                    email: state.email,
                    password: state.password,
                    // profile_picture: imageUrl,
                })
                .then(() => {
                    console.log("User created and data written to the database successfully");
                  })
                  .catch((error) => {
                    console.log("Error writing data to the database:", error);
                  });
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("Sign up error:", errorCode, errorMessage);
              });

    };

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
                            signUp();
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