import React from 'react';
import { View, Button } from 'react-native';
import { useEffect, useState } from "react";
import {
    initDB,
  } from "../helper/fb-data";

const PostDetails = ({ route, navigation }) => {

    const [postDetail, setPostDetails] = useState([]);

    //Connecting DB
    useEffect(() => {
        try {
            initDB();
        } catch (err) {
            console.log(err);
        }
    }, []);

    useEffect(() => {
        
    }, [route.params]);

    return (
        <View>
            <Button
                title="Go to Details"
                onPress={() => navigation.navigate('Details')}
            />
        </View>
    );
};

export default PostDetails;