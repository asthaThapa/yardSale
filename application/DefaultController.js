import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


//Import Screens
import loginScreen from './screens/LoginScreen';
import SearchScreen from './screens/SearchScreen';
import AddPostScreen from './screens/AddPostScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import SettingScreen from './screens/SettingsScreen';
import SignupScreen from './screens/SignupScreen';


//Screen names
const loginPage = "Log In";
const searchPage = "Yard Sales";
const addPostPage = "Create Your Post";
const favoritePage = "Favorites";
const settingsPage = "Settings";
const signupPage = "Sign Up";

const myTab = createBottomTabNavigator();

function DefaultController() {
    return (
        <NavigationContainer>
            <myTab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {

                        let iconName;

                        let routeName = route.name;

                        //Getting icons for each page according to the page
                        if (routeName === searchPage) {
                            iconName = focused ? 'home-search' : 'home-search-outline';

                        } else if (routeName === addPostPage) {
                            iconName = focused ? 'plus-box' : 'plus-box-outline';

                        } else if (routeName === favoritePage) {
                            iconName = focused ? 'heart' : 'cards-heart-outline';

                        } else if (routeName === settingsPage) {
                            iconName = focused ? 'cog' : 'cog-outline';

                        }

                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    },
                    "tabBarActiveTintColor": "#5DB075",
                    "tabBarInactiveTintColor": "grey",
                    "tabBarLabelStyle": {
                        "paddingBottom": 10,
                        "fontSize": 10
                    },
                    "tabBarStyle": [
                        {
                            "display": "flex",
                            "marginTop": 15,
                            "borderColor": 'transparent',
                            "borderTopWidth": 0
                        },
                        null
                    ]
                })}
            >

                <myTab.Screen name={loginPage} component={loginScreen} />
                <myTab.Screen name={searchPage} component={SearchScreen} />
                <myTab.Screen name={addPostPage} component={AddPostScreen} />
                <myTab.Screen name={favoritePage} component={FavoriteScreen} />
                <myTab.Screen name={settingsPage} component={SettingScreen} />
                <myTab.Screen name={signupPage} component={SignupScreen}/>
            </myTab.Navigator>

        </NavigationContainer>
    )
}

export default DefaultController;