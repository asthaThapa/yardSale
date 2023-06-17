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
import { getUserInfo, handleLogOut, updatePassWord, updateinfo } from '../helper/authcontoller';
import { updateEmail } from 'firebase/auth';


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
    const [inputstate, settingInput] = useState('');


    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    const handleSave = () => {
        // Perform the necessary actions to save the updated setting
        // For example, make an API call to update the setting on the server
        if(settingValue.id === '1'){
            updateEmail(inputstate);
        }else if(setSettingValue.id ==='2'){
            updatePassWord(inputstate);
        }
        else {
            updateinfo(inputstate,settingValue);
        }
        console.log(inputstate);
        // Close the modal after saving
        closeModal();
    };

    const handleSettingPress = (setting) => {
        if (setting.id === '6') {
            // Handle log out action
            const message = handleLogOut();
            if (!message) {
                navigation.navigate("Login");
            }
        } else {
            // Handle other setting actions
            setSettingValue(setting);
            openModal();
            console.log(`Selected setting: ${setting.title}`);
        }

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

    const display = (info) => {
        const profile = getUserInfo(); 
        console.log(profile);       
        switch (info.id){
            case '1': return profile.email;
            case '2': return profile.password;
            case '3': return profile.phonenumber;
            case '4': return profile.name;
            case '5': return profile.location;
            default: return null;
        }
        
    };

    return (
        <View style={styles.container}>
            <Modal visible={isModalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{settingValue.title}</Text>
                        <Text style={styles.display}>{display(settingValue)}</Text>
                        <Input
                            style={styles.input}
                            value={inputstate}
                            onChangeText={text => settingInput(text)}
                            placeholder={`Enter a new ${settingValue.title}`}
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginHorizontal: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    display: {
        fontSize: 15,

    },
    input: {

    },
});

export default SettingScreen;