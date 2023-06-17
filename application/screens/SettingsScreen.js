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
    { id: '0', username: "", },
    { id: '1', title: 'Email', email: '', },
    { id: '2', title: 'Password', password: '', },
    { id: '3', title: 'Phone Number', phonenumber: '', },
    { id: '4', title: 'Name', name: '', },
    { id: '5', title: 'Location', location: '', },
    { id: '6', title: 'Log Out' },
];

function SettingScreen({ navigation }) {
    const [isModalVisible, setModalVisible] = useState(false);
    const [settingValue, setValue] = useState('');
    const [input, setInput] = useState('');
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

    const findSettingByProperty = (id) => {
        switch (id) {
            case '1': return 'email';
            case '2': return 'password';
            case '3': return 'phonenumber';
            case '4': return 'name';
            case '5': return 'location';
            default: return null;
        }
    };
    const handleSave = () => {
        const title = findSettingByProperty(settingValue);
        if (title) {
            updateinfo(input, title);
        }

        // Close the modal after saving
        closeModal();
        setInput("");
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
            setValue(setting);
            openModal();

            getUserInfo()
                .then((data) => {
                    setCurrent(data);
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
            case '1': return currentVal.email;
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
                            value={input}
                            onChangeText={text => setInput(text)}
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