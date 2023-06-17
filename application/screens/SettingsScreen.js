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
import { getUserInfo, handleLogOut, updateemail, updatePassWord, updateinfo } from '../helper/authcontoller';
import { AddressAutocomplete } from '../helper/mapcontroller';

const settingsData = [
    { username: "", },
    { id: '1', title: 'Email', email: '', },
    { id: '2', title: 'Password', password: '', },
    { id: '3', title: 'Phone Number', phonenumber: '', },
    { id: '4', title: 'Name', name: '', },
    { id: '5', title: 'Location', location: '', },
    { id: '6', title: 'Log Out' },
];

function SettingScreen({ navigation }) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [settingValue, setSettingValue] = useState('');
    const [inputstate, settingInput] = useState('');
    const [currentVal, setCurrent] = useState('');

    useEffect(() => {
        getUserInfo()
            .then((data) => {
                // Use the user data here
                setCurrent(data);
            })
            .catch((error) => {
                // Handle any errors that occurred
                console.error(error);
            });
    }, []);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };
    const handleSave = () => {

        updateinfo(inputstate, settingValue);

        // Close the modal after saving
        closeModal();
        settingInput("");
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
            // console.log(`Selected setting: ${setting.title}`);
        
        getUserInfo()
            .then((data) => {
                setCurrent(data);
                // console.log(`User info: ${JSON.stringify(data)}`);
            })
            .catch((error) => {
                console.error(error);
            });
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
        console.log(currentVal);
        switch (info.id) {
            case '1': currentVal.email

                ;
            case '2': return currentVal.password;
            case '3': return currentVal.phonenumber;
            case '4': return currentVal.name;
            case '5': return currentVal.location;
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