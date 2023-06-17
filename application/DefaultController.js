import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from "@react-navigation/native-stack";


//Import Screens
import loginScreen from './screens/LoginScreen';
import SearchScreen from './screens/SearchScreen';
import AddPostScreen from './screens/AddPostScreen';
import FavoriteScreen from './screens/FavoriteScreen';
import SettingScreen from './screens/SettingsScreen';
import SignupScreen from './screens/SignupScreen';
import PostDetails from './screens/PostDetails';

//Screen names
const loginPage = "Log In";
const searchPage = "Yard Sales";
const addPostPage = "Create Your Post";
const favoritePage = "Favorites";
const settingsPage = "Settings";
const signupPage = "Sign Up";
const detailPage = "Details";

const myTab = createBottomTabNavigator();
const logStack = createNativeStackNavigator();
const AppNavigator = createNativeStackNavigator();
const detailStack = createNativeStackNavigator();

function LogInStack() {
    return (
        <logStack.Navigator>
            <logStack.Screen name={"Log In "} component={loginScreen} />
            <logStack.Screen name={signupPage} component={SignupScreen} />
        </logStack.Navigator>
    );
}
function DetailsStack(){
    return (
        <detailStack.Navigator>
            <detailStack.Screen name={searchPage} component={SearchScreen} />
            <detailStack.Screen name={detailPage} component={PostDetails} />
        </detailStack.Navigator>
    );
}
function Main() {
    return (
        <NavigationContainer>
            <AppNavigator.Navigator>
                <AppNavigator.Screen name="Login" component={LogInStack} options={{ headerShown: false }} />
                <AppNavigator.Screen name="Main" component={DefaultController} options={{ headerShown: false }} />
            </AppNavigator.Navigator>
        </NavigationContainer>
    );
}


function DefaultController() {
    return (
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
            <myTab.Screen name={"Search"} component={DetailsStack} />
            <myTab.Screen name={addPostPage} component={AddPostScreen} />
            <myTab.Screen name={favoritePage} component={FavoriteScreen} />
            <myTab.Screen name={settingsPage} component={SettingScreen} />
        </myTab.Navigator>

    )
}

export default Main;