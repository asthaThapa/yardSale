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
    Modal,
    Button,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { Input } from 'react-native-elements';


const settingsData = [
    { id: '1', title: 'Email' },
    { id: '2', title: 'Password' },
    { id: '3', title: 'Phone Number' },
    { id: '4', title: 'Name' },
    { id: '5', title: 'Location' },
    { id: '6', title: 'Log Out' },
];

function SettingScreen({ navigation }) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [settingValue, setSettingValue] = useState('');


    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    const handleSave = () => {
        // Perform the necessary actions to save the updated setting
        // For example, make an API call to update the setting on the server

        // Close the modal after saving
        closeModal();
    };

    const handleSettingPress = (setting) => {
        if (setting.id === '1') {
            // Handle log out action
            console.log('Log out');
        }
        else if (setting.id === '2') {
            // Handle log out action
            console.log('Log out');
        }
        else if (setting.id === '3') {
            // Handle log out action
            console.log('Log out');
        }
        else if (setting.id === '4') {
            // Handle log out action
            console.log('Log out');
        }
        else if (setting.id === '5') {
            // Handle log out action
            console.log('Log out');
        }
        else if (setting.id === '6') {
            // Handle log out action
            console.log('Log out');
        } else {
            // Handle other setting actions
            console.log(`Selected setting: ${setting.title}`);
        }
        setSettingValue(setting);
        openModal();
    };

    const renderSettingItem = ({ item }) => (
        <View>
        <TouchableOpacity
            style={styles.settingItem}
            onPress={() => handleSettingPress(item)}
        >
            <Text style={styles.settingTitle}>{item.title}</Text>
        </TouchableOpacity>
        
        </View>
    );

    return (
        <View style={styles.container}>
            <Modal visible={isModalVisible} animationType="slide" transparent={false}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{settingValue.title}</Text>
                        <Input
                            style={styles.input}
                            value={settingValue}
                            onChangeText={text => setSettingValue(text)}
                            placeholder="Enter new value"
                        />

                        <Button title="Save" onPress={handleSave} />
                        <Button title="Cancel" onPress={closeModal} />
                    </View>
                </View>
            </Modal>
            <FlatList
                data={settingsData}
                renderItem={renderSettingItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    list: {
        paddingHorizontal: 16,
    },
    settingItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    settingTitle: {
        fontSize: 18,
    },
});

export default SettingScreen;