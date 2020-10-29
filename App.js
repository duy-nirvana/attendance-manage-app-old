import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import ScanScreen from './src/screens/scan';
import SettingsScreen from './src/screens/settings';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        activeColor="#fff"
        style={{ backgroundColor: 'tomato' }}
      >
        <Tab.Screen 
          name="Scan"
          component={ScanScreen}
          options={{
          tabBarLabel: 'Scan',
        }}/>
        <Tab.Screen 
          name="Settings"
          component={SettingsScreen}
          options={{
          tabBarLabel: 'Settings',
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
