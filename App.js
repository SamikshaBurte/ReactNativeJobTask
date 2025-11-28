import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; 
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons'; 


import { AppProvider } from './state/AppContext'; 

import FeedScreen from './screens/FeedScreen';
import SavedScreen from './screens/SavedScreen';
import DetailScreen from './screens/DetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false, 
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'FeedTab') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'SavedTab') {
                        iconName = focused ? 'heart' : 'heart-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            {/* Tab A: The Feed (Data list, Prime/Price Logic) */}
            <Tab.Screen name="FeedTab" component={FeedScreen} options={{ title: 'The Feed' }} />
            {/* Tab B: Saved Items (Persistence Demo) */}
            <Tab.Screen name="SavedTab" component={SavedScreen} options={{ title: 'Saved' }} />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <AppProvider> 
            <NavigationContainer>
                {/* STACK NAVIGATOR: Sits at the root to allow DetailScreen to appear over tabs */}
                <Stack.Navigator screenOptions={{ 
                    headerShown: false, 
                }}>
                    {/* 1st Screen: The Main Tabs (our home base) */}
                    <Stack.Screen name="Home" component={MainTabs} /> 
                    
                    {/* 2nd Screen: The Detail View (REQUIRED: Product Detail Screen) */}
                    <Stack.Screen 
                        name="DetailScreen" 
                        component={DetailScreen} 
                        options={{ 
                            headerShown: true, 
                            title: 'Product Details',
                            animation: 'fade' 
                        }} 
                    />
                </Stack.Navigator>
                <StatusBar style="auto" />
            </NavigationContainer>
        </AppProvider>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#fff',
    }
});