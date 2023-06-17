import * as React from 'react';
import {
    Keyboard,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    FlatList,
} from "react-native";

import {
    initDB,
    setUpListener
} from "../helper/fb-data";

import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from "react";
import { TextInput } from 'react-native-gesture-handler';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { TabView, SceneMap } from 'react-native-tab-view';


function SearchScreen({ navigation }) {

    const [clickstate, setState] = useState(false);

    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            initDB();
            setUpListener(setData, "/postAd")
        } catch (err) {
            console.log(err);
        }
    }, []);

    const handleCreatePost = () => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is logged in, allow them to add a post
                navigation.navigate("Create Your Post");
            } else {
                alert("Please Log In first!");
                navigation.navigate("Log In");
            }
        });
    };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <TouchableOpacity
                        onPress={() => {
                            if (clickstate) return;

                            // Handle create post action
                            setState(true);
                            handleCreatePost();
                            console.log("created pressed");
                            setState(false);
                        }}
                    >
                        <Text style={styles.headerButton}>Create</Text>
                    </TouchableOpacity>
                );
            },
            // headerButton:() {

            // },
        });
    });

    const searchText = '';

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.title} <MaterialIcons name="arrow-forward-ios" size={20} color="#5DB075" style={flexDirection = "row"} /></Text>
            <Text style={styles.location}>
                <MaterialIcons name="location-on" size={20} color="#5DB075" />{item.address},{item.city},{item.zip}
            </Text>
            <Text style={styles.date}>{item.date}</Text>
        </View>
    );


    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search Yard Sales"
                    value={searchText}
                    color="#BDBDBD"
                />
                <Feather name="search" size={24} color="#5DB075" />
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    itemContainer: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    location: {
        fontSize: 16,
        color: '#888',
        fontStyle: 'italic'
    },
    date: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
        textAlign: 'right'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        padding: 5,
        borderWidth: 0,
        borderColor: '#888',
        borderRadius: 25,
        backgroundColor: '#E8E8E8',
        height: 40
    },
    searchInput: {
        flex: 1,
        paddingHorizontal: 10,
        fontSize: 18,
    },
    searchIcon: {
        paddingHorizontal: 10
    },
    headerButton: {
        marginRight: 10,
        color: "#1be3a7",
        fontWeight: "bold",
    },
});

export default SearchScreen;