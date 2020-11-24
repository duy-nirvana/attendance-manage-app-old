import React, { useEffect, useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ScanScreen from '../screens/scan';
import SettingsScreen from '../screens/settings';
import LoginScreen from '../screens/login';
import { useDispatch, useSelector } from 'react-redux';

const Tab = createMaterialBottomTabNavigator();

const Navigator = (props) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const [hasOpenCamera, setOpenCamera] = useState(false);
    const [hasScaned, setScaned] = useState(false);

    const handleCamera = (status) => {
        setOpenCamera(status);
    }

    const handleScan = (status) => {
        setScaned(status);
    }
    
    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;
            
            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
                // Restoring token failed
                console.log('Fail to get token', e);
            }
            
            // After restoring token, we may need to validate it in production apps
            
            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };
        
        bootstrapAsync();
    }, []);

    return (
        <>
            {
                auth.userToken === null ? (
                    <LoginScreen />
                    ) : (
                    <Tab.Navigator
                        initialRouteName="App"
                        activeColor= "navy"
                        barStyle={{ backgroundColor: '#fff', borderTopWidth: .4, borderTopColor: '#aaa' }}
                    >
                        <Tab.Screen 
                            name="Scan"
                            children={(props) => <ScanScreen {...props} handleCamera={handleCamera} hasOpenCamera={hasOpenCamera} hasScaned={hasScaned} handleScan={handleScan} />}
                            options={{
                                tabBarLabel: 'Scan',
                                tabBarIcon: ({ color }) => (
                                    <MaterialCommunityIcons name="qrcode" color={color} size={26} />
                                ),
                            }}
                        />
                        <Tab.Screen 
                            name="Settings"
                            children={(props) => <SettingsScreen {...props} handleCamera={handleCamera} handleScan={handleScan} />}
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
        </>
    )
}

export default Navigator;