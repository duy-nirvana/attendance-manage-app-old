import React from 'react';
import {StyleSheet, Text, View, StatusBar } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import Navigator from './src/navigators';
import {Provider} from 'react-redux';
import store from './store';

import { RootToaster } from 'react-native-root-toaster';

export default function App() {

    return (
        <Provider store={store}>
            <NavigationContainer>
                <StatusBar barStyle="dark-content"
                    hidden={false}
                    backgroundColor="#fff"
                    translucent={true}
                />
                <Navigator/>
            </NavigationContainer>
            <RootToaster />
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});
