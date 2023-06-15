import * as React from 'react';
import { View, Text } from 'react-native';
import { Button, Input } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import { getStorage, ref } from "firebase/storage";
import {
    initDB,
    setupSignUpListener,
    storeUser,
} from "../helper/fb-data";

import { useEffect, useRef, useState } from "react";


export default function AddPostScreen({ navigation }) {

    const [selectedPhoto, setSelectedPhoto] = useState(null);

    useEffect(() => {
        try {
            initDB();
        } catch (err) {
            console.log(err);
        }
    }, []);


    const handlePhotoUpload = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }
    
        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (!pickerResult.canceled) {
          setSelectedPhoto(pickerResult.uri);
        }
      };
      const handleUpload = () => {
        // Perform the upload logic here using the selectedPhoto
        if (selectedPhoto) {
          // Upload the selectedPhoto to Firebase or any other storage service
          // ...
        }
      };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {/* <Text
                onPress={() => alert('This is the "Home" screen.')}
                style={{ fontSize: 26, fontWeight: 'bold' }}>AddPost Screen</Text>
             */}
            <View>
                <Button title="Select Photo" onPress={handlePhotoUpload} />
                {selectedPhoto && <Image source={{ uri: selectedPhoto }} style={{ width: 200, height: 200 }} />}
                <Button title="Upload Photo" onPress={handleUpload} />
            </View>
        </View>


    );
}