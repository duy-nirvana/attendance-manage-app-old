import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ScanScreen from '../screens/scan';
import SettingsScreen from '../screens/settings';

const Tab = createMaterialBottomTabNavigator();

const Navigator = (props) => {
    
    return (
        <Tab.Navigator
            initialRouteName="App"
            activeColor= "navy"
            barStyle={{ backgroundColor: '#fff' }}
        >
            <Tab.Screen 
                name="Scan"
                component={ScanScreen}
                options={{
                    tabBarLabel: 'Scan',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="qrcode" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="settings" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default Navigator;