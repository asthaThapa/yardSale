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

import firebase from 'firebase/app';
import {
    initDB,
    setupSignUpListener,
    storeUser,
} from "../helper/fb-data";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

function LoginScreen({ navigation }) {
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
                    onPress={() => {
                        navigation.navigate("Sign Up");
                    }}
                >
                    <Text style={styles.headerButton}>Sign Up</Text>
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

    const handleLogin = () => {
        const auth = getAuth();
        const db = getDatabase();

        signInWithEmailAndPassword(auth, state.email, state.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const userRef = ref(db, 'users/' + user.uid);
                onValue(userRef, (snapshot) => {
                    const data = snapshot.val();
                    if (snapshot.exists()) {
                        const userProfile = snapshot.val();
                        console.log("User profile data:", userProfile);
                        // Do something with the user profile data
                    } else {
                        console.log("User profile does not exist in the database");
                    }
                  });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    };

    function validate(value) {
        return (value) ? "Must be a number" : "";
    }
    //   console.log(state.username);
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
                            handleLogin();
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