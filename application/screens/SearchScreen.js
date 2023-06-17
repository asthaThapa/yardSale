import * as React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    useWindowDimensions,
} from "react-native";

import {
    initDB,
    setUpListener
} from "../helper/fb-data";

import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { TextInput } from 'react-native-gesture-handler';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { convertAddressesToCoordinates } from '../helper/mapcontroller';


const SearchTab = ({ navigation }) => {

    const [data, setData] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        try {
            initDB();
            setUpListener(setData, "/postAd")
        } catch (err) {
            console.log(err);
        }
    }, []);

    const handleSearchQuery = () => {
        if (searchQuery == '' || searchQuery == undefined) {
            setUpListener(setData, "/postAd")
        } else {
            const filteredData = data.filter(
                (item) =>
                    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.address.toLowerCase().includes(searchQuery.toLowerCase())
            );

            setData(filteredData);
        }
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("Details", item.id);
            }}>
            <View style={styles.itemContainer}>
                <View style={styles.subHeader}>
                    <Text style={styles.title}>{item.title}</Text>
                    <MaterialIcons name="arrow-forward-ios" size={30} color="#5DB075" style={flexDirection = "row"} />
                </View>

                <Text style={styles.location}>
                    <MaterialIcons name="location-on" size={30} color="#5DB075" />{item.address},{item.city},{item.zip}
                </Text>
                <Text style={styles.date}>{item.date}</Text>
            </View>
        </TouchableOpacity>
    );


    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search Yard Sales"
                    value={searchQuery}
                    color="#BDBDBD"
                    onChangeText={setSearchQuery}
                />
                <TouchableOpacity
                    onPress={handleSearchQuery}>
                    <Feather name="search" size={24} color="#5DB075" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};
const MapTab = () => {
    const [mylocation, setMyLocation] = useState(null);
    const [data, setData] = useState([]);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        try {
            initDB();
            setUpListener(setData, "/postAd")
        } catch (err) {
            console.log(err);
        }




    }, []);
useEffect(() =>{
    const addresses = data.map((post) => ({
        address: post.address + ", " + post.city + ", " + post.zip,
        title: post.title,
    }));
    const address = addresses.map(post => post.address);
    console.log(address);
    convertAddressesToCoordinates(address)
        .then(coordinates => {
            const mergedData = coordinates.map((coordinate, index) => ({
                title: addresses[index].title,
                coordinate: {
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude
                }
            }));

            console.log('Merged Data:', mergedData);
            setMarkers(mergedData);

        })
        .catch(error => {
            console.error(error);
        });
},[data]);




    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Location permission denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            console.log('Location:', location);
            setMyLocation(location);
        })();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            {mylocation && mylocation.coords ? (
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: mylocation.coords.latitude,
                        longitude: mylocation.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                >


                    <Marker
                        coordinate={{
                            latitude: mylocation.coords.latitude,
                            longitude: mylocation.coords.longitude,
                        }}
                        title="Your Location"
                    />
                    {markers.map(marker => (
                        <Marker
                            key={marker.title}
                            coordinate={marker.coordinate}
                            title={marker.title}
                        />
                    ))}
                </MapView>
            ) : (
                <Text>Loading...</Text>
            )}
        </View>
    );
};

function SearchScreen({ navigation }) {

    const windowWidth = useWindowDimensions().width;

    const renderScene = SceneMap({
        SearchRoute: () => <SearchTab navigation={navigation} />,
        MapRoute: MapTab,
    });

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'white' }}
            style={{ backgroundColor: 'white' }}
            labelStyle={{ color: '#1be3a7' }}
        />
    );

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'SearchRoute', title: 'Search' },
        { key: 'MapRoute', title: 'Map' },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: windowWidth }}
            style={styles.tabView}
            renderTabBar={renderTabBar}
        />
    );


};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingHorizontal: 10,
    },
    tabView: {
        flex: 1,
        backgroundColor: '#fff',
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
    subHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default SearchScreen;