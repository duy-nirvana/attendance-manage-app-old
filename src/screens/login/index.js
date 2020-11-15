import React from 'react';
import {View, Text, StatusBar} from 'react-native';

const statusBarHeight = StatusBar.currentHeight;

const LoginScreen = (props) => {
    return (
        <View style={{marginTop: statusBarHeight}}>
            <Text>LOGIN SCREEN</Text>
        </View>
    )
}

export default LoginScreen;