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
    setupSignUpListener,
    storeUser,
} from "../helper/fb-data";

import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from "react";
import { TextInput } from 'react-native-gesture-handler';
import { getAuth, onAuthStateChanged } from "firebase/auth";


function SearchScreen({ navigation }) {

    useEffect(() => {
        try {
            initDB();
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
                if (navigation.isFocused()) {
                    return (
                        <TouchableOpacity
                            onPress={() => {
                                // Handle create post action
                                handleCreatePost();
                            }}
                        >
                            <Text style={styles.headerButton}>Create</Text>
                        </TouchableOpacity>
                    );
                } else {
                    return null; // Don't show any header button when user is not logged in or not on the focused screen
                }
            },
        });
    });

    //This needs to be fetched from database
    const result = [
        { id: '1', title: 'Big Yard Sale', location: 'Division Avenue', date: 'June 15, 2023' },
        { id: '2', title: 'Vintage Treasures', location: 'Gerald R. Ford Presidential Museum', date: 'July 2, 2023' },
        { id: '3', title: 'Neighborhood Sale', location: 'Downtown Market Grand Rapids', date: 'August 10, 2023' },
        { id: '4', title: 'Big Neighborhood Sale', location: 'Grand Rapids Public Museum', date: 'September 14, 2023' },
        { id: '5', title: 'Small Yard Sale', location: 'John Ball Zoo', date: 'October 11, 2023' },
        { id: '6', title: 'Old Stuff Sale', location: 'Van Andel Arena', date: 'November 18, 2023' },
        { id: '7', title: 'Friendly neighbour Sale', location: 'Grand Rapids Art Museum', date: 'December 24, 2023' },
        { id: '8', title: '72th Street Yard Sale', location: 'Heritage Hill Historic District', date: 'May 15, 2023' },
        { id: '9', title: 'Kids stuff only Sale', location: 'Fish Ladder Park', date: 'April 7, 2023' },
        { id: '10', title: 'Car stuff Sale', location: 'Riverside Park', date: 'January 1, 2023' },
        { id: '11', title: 'Neighborhood Sale', location: 'Grand Rapids Symphony', date: 'November 19, 2023' },
        { id: '12', title: 'Summer Yard Sale', location: 'Wealthy Street', date: 'December 5, 2023' },
        { id: '13', title: 'Heritage Yard Sale', location: 'Monroe Center Street', date: 'February 3, 2023' },
        { id: '14', title: 'Yard Sale with snacks!', location: 'Frederik Meijer Gardens & Sculpture Park', date: 'March 8, 2023' },
        { id: '15', title: 'Happy Yard Sale', location: 'Robinettes Apple Haus & Winery', date: 'April 28, 2023' },
        { id: '16', title: 'Small Neighborhood Sale', location: 'Cherry Street', date: 'August 21, 2023' },
    ]

    const searchText = '';

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.title}  <MaterialIcons name="arrow-forward-ios" size={20} color="#5DB075" style={flexDirection = "row"} /></Text>
            <Text style={styles.location}>
                <MaterialIcons name="location-on" size={20} color="#5DB075" />{item.location}
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
                data={result}
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