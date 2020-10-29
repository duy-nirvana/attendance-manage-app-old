import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ScanScreen from './src/screens/scan';
import SettingsScreen from './src/screens/settings';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#fff" translucent = {true}/>
      <Tab.Navigator
        initialRouteName="Feed"
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
        }}/>
        <Tab.Screen 
          name="Settings"
          component={SettingsScreen}
          options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="settings" color={color} size={26} />
          ),
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
