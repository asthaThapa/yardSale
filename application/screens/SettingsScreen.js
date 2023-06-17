import * as React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    Modal
} from "react-native";
import { useEffect, useState } from "react";
import { Button, Input } from 'react-native-elements';
import { getUserInfo, handleLogOut, updateinfo } from '../helper/authcontoller';

const settingsData = [
    { id: '0', username: "", },
    { id: '1', title: 'Email', email: '', },
    { id: '2', title: 'Password', password: '', },
    { id: '3', title: 'Phone Number', phonenumber: '', },
    { id: '4', title: 'Name', name: '', },
    { id: '5', title: 'Location', location: '', },
    { id: '6', title: 'Log Out' },
];

import { MaterialCommunityIcons } from '@expo/vector-icons';

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
                        <View style={styles.buttonDisplay}>
                            <Button buttonStyle={styles.buttons} title="Save" onPress={handleSave} />
                            <Button buttonStyle={styles.buttons} title="Cancel" onPress={closeModal} />
                        </View>

                    </View>
                </View>
            </Modal>
            <Text style={styles.title}>
                <MaterialCommunityIcons name="account-edit" size={30} color="#5DB075" /> Edit your settings</Text>
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
        paddingVertical: 20,
        paddingHorizontal: 10,
    },

    list: {
        paddingHorizontal: 16,
    },

    settingItem: {
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc'
    },
    settingTitle: {
        fontSize: 18,
        color: '#808080'
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
    title: {
        marginBottom: 10,
        fontSize: 28,
        fontWeight: '700',
        textAlign: 'center',
        color: '#5DB075'
    },
    buttonDisplay: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    buttons: {
        backgroundColor: '#5DB075',
        width: 100,
        margin: 10
    }
});

export default SettingScreen;

