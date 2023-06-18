import * as React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Alert,
} from "react-native";

import {
    initDB,
    removeFavorite,
    setupFavoriteListener
} from "../helper/fb-data";

import { getUser } from '../helper/authcontoller';

import { useEffect, useState } from "react";

//Import Icons
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


export default function FavoriteScreen({ navigation }) {
    const [favorite, setFavorite] = useState([]);

    useEffect(() => {
        try {
            initDB();
            setupFavoriteListener(setFavorite, "/favorites", getUser())
            console.log(favorite)
        } catch (err) {
            console.log(err);
        }
    }, []);

    const toggleIcon = (postId) => {
        Alert.alert('Removed from favorites!');
        removeFavorite(postId, 'favorites');
        setFavorite([])
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("Details", item.id);
            }}>

            <View style={styles.itemContainer}>
                <View style={styles.subHeader}>
                    <Text style={styles.title}>{item.title}</Text>
                    <TouchableOpacity onPress={() => {
                        toggleIcon(item?.id)
                    }}>
                        <MaterialCommunityIcons name="heart-remove" size={35} color="#5DB075" />
                    </TouchableOpacity>
                </View>

                <View style={styles.locationDiv}>
                    <MaterialIcons name="location-on" size={30} color="#5DB075" />
                    <Text style={styles.location}>
                        {item.address},{item.city},{item.zip}
                    </Text>
                </View>

                <Text style={styles.date}>{item.date}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                My favorite yard sales
            </Text>
            <View>
                {favorite.length > 0 ? (
                    <FlatList
                        data={favorite}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                    />
                ) : (
                    <Text style={styles.noData}>You have not set your favorites yet!</Text>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10,
    }, itemContainer: {
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#e1e1e1',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    location: {
        fontSize: 18,
        color: '#888',
        fontStyle: 'italic',
        margin: 3,
        // backgroundColor: 'black'
    },
    date: {
        fontSize: 12,
        color: '#888',
        fontStyle: 'italic',
        textAlign: 'right'
    },
    header: {
        marginBottom: 10,
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        color: '#5DB075'
    },
    subHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    locationDiv: {
        flexDirection: 'row',
    },
    noData: {
        // backgroundColor: 'black',
        textAlign: 'center',
        fontSize: 20,
        margin: 100,
        fontStyle: 'italic',
        fontWeight: '300',
        color: '#808080'
    }
})