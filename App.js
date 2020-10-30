import React from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import Navigator from './src/navigators';

export default function App() {
  
    return (
    <NavigationContainer>
        <StatusBar barStyle="dark-content"
            hidden={false}
            backgroundColor="#fff"
            translucent={true}/>
        <Navigator/>
    </NavigationContainer>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
