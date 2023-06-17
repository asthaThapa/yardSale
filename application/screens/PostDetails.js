import React from 'react';
import {
    SafeAreaView,
    View,
    Button,
    FlatList,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    Dimensions,
    Animated,
    TouchableOpacity,
    Alert
} from 'react-native';
import { useEffect, useState } from "react";
import {
    initDB,
    setUpDetailListener,
    saveFavorite,
    removeFavorite
} from "../helper/fb-data";

//Importing icons
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PostDetails = ({ route, navigation }) => {

    const [postDetail, setPostDetails] = useState({});

    const [favoritePostId, setFavoritePostId] = useState('')

    //Connecting DB
    useEffect(() => {
        try {
            initDB();
            setUpDetailListener(setPostDetails, '/postAd', route.params)
        } catch (err) {
            console.log(err);
        }
    }, []);

    scrollX = new Animated.Value(0)
    let position = Animated.divide(this.scrollX, width);


    const [isOutline, setIsOutline] = useState(false);

    const toggleIcon = () => {

        if (!isOutline) {
            Alert.alert('Added to favorites!');
            try {
                const postId = saveFavorite(postDetail, 'favorites')
                setFavoritePostId(postId)
            } catch (err) {
                console.log(err);
            }
        } else {
            Alert.alert('Removed from favorites!');
            console.log(favoritePostId)
            removeFavorite(favoritePostId, 'favorites')
            setFavoritePostId('')
        }

        setIsOutline(!isOutline);

    };


    const renderPost = ({ item }) => {

        const postImages = item?.items[0]?.images //Get Images from DB

        const photos = postImages.map((item) => ({ uri: item }));

        return (
            <View style={styles.itemContainer}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width, height: width }}>
                        <ScrollView
                            horizontal={true}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={false}
                            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: this.scrollX } } }], { useNativeDriver: false })}
                            scrollEventThrottle={16}
                        >
                            {photos.map((source, i) => {
                                return (
                                    <Image
                                        key={i}
                                        style={{ width, height: width }}
                                        source={source}
                                    />
                                );
                            })}

                        </ScrollView>
                    </View>
                    <View style={{ flexDirection: 'row' }} >
                        {photos.map((_, i) => {
                            let opacity = position.interpolate({
                                inputRange: [i - 1, i, i + 1],
                                outputRange: [0.3, 1, 0.3],
                                extrapolate: 'clamp'
                            });
                            return (
                                <Animated.View key={i} style={{ opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 8, borderRadius: 5 }} />
                            );
                        })}
                    </View>
                </View>

                <View style={styles.detailContainer}>

                    <View style={styles.titleHeader}>
                        <Text style={styles.title}>{item.title}</Text>
                        <TouchableOpacity onPress={toggleIcon}>
                            {isOutline ? (
                                <MaterialCommunityIcons name="cards-heart" size={35} color="#5DB075" />
                            ) : (
                                <MaterialCommunityIcons name="cards-heart-outline" size={35} color="#5DB075" />
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.locationDetail}>

                        <View style={styles.subHeader}>
                            <Ionicons name="md-location-sharp" size={24} color="#5DB075" />
                            <Text style={styles.description}>{item.address}, {item.city},{item.zip}</Text>
                        </View>

                        <View style={styles.subHeader}>
                            <MaterialCommunityIcons name="calendar-check" size={24} color="#5DB075" />
                            <Text style={styles.description}>{item.date}</Text>
                        </View>

                        <View style={styles.subHeader}>
                            <MaterialCommunityIcons name="clock" size={24} color="#5DB075" />
                            <Text style={styles.description}>{item.time}</Text>
                        </View>
                    </View>
                    <View style={styles.subContainer}>
                        <View style={styles.row}>
                            <MaterialCommunityIcons name="details" size={24} color="#5DB075" />
                            <Text style={styles.descriptionTitle}>About the sale</Text>
                        </View>

                        <Text style={styles.saleDescription}>{item.description}</Text>
                    </View>


                    <View style={styles.subContainer}>
                        <View style={styles.row}>
                            <MaterialCommunityIcons name="format-list-checkbox" size={24} color="#5DB075" />
                            <Text style={styles.descriptionTitle}>Selling Items</Text>
                        </View>
                        <View style={styles.sellingItem}>
                            {item?.items.map((element, index) => (
                                <View style={styles.eachSelling}>
                                    <MaterialCommunityIcons name="arrow-right" size={24} color="#808080" />
                                    <Text style={styles.saleDescription}>{element.itemTitle}</Text>
                                </View>
                            ))}
                        </View>

                    </View>


                    <View style={styles.subContainer}>
                        <View style={styles.row}>
                            <Feather name="user" size={24} color="black" />
                            <Text style={styles.descriptionTitle}>Seller Information</Text>
                        </View>
                        <View style={styles.sellingItem}>
                            <Text>Phone Number: {item?.sellerPhone}</Text>
                            <Text>Email: {item.sellerEmail}</Text>
                        </View>
                    </View>
                </View>

            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>

            <View>
                {postDetail.length > 0 ? (
                    <FlatList
                        data={postDetail}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderPost}
                    />
                ) : (
                    <Text>No post details found.</Text>
                )}
            </View>

        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subContainer: {
        margin: 10,
        borderRadius: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#a2c9a2',
    },
    descriptionTitle: {
        fontSize: 20,
        fontWeight: '500',
        marginLeft: 10,
        fontStyle: 'italic'
    },
    detailContainer: {
        margin: 5
    },
    titleHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    subHeader: {
        flexDirection: 'row',
        marginTop: 10,
    },
    itemContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        padding: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    description: {
        fontSize: 16,
        marginTop: 5,
        marginLeft: 10,
        fontStyle: 'italic'
    },
    saleDescription: {
        fontSize: 16,
        marginTop: 5,
        marginLeft: 10,
    },
    row: {
        flexDirection: 'row'
    },
    sellingItem: {
        margin: 10,
        padding: 10,
    },
    eachSelling: {
        flexDirection: 'row'
    },
    locationDetail: {
        margin: 10
    }
});


export default PostDetails;