import React, { useState } from 'react';
import {View, Text, StatusBar, Dimensions} from 'react-native';
import {TextInput, Title, Button} from 'react-native-paper';

const statusBarHeight = StatusBar.currentHeight;
const fullWidth = Dimensions.get('screen').width; //full width

const LoginScreen = (props) => {
    const [codeNumberValue, setCodeNumber] = useState('');
    const [passwordValue, setPasswordValue] = useState(''); 
    const [valueForm, setValueForm] = useState({});

    const handleOnPress = () => {
        setValueForm(prevState => ({
            ...prevState,
            codeNumber: codeNumberValue,
            password: passwordValue
        }))
    }

    return (
        <View style={{flex: 1, marginTop: statusBarHeight + 100, alignItems: "center" }}>
            <Title style={{fontSize: 25, marginBottom: 10 }} >APP ĐIỂM DANH</Title>
            <TextInput 
                label="MSSV"
                mode="outlined"
                value={codeNumberValue}
                onChangeText={(value) => setCodeNumber(value)}
                theme={{ colors: { primary: 'black',underlineColor:'transparent' }}}
                style={{width: fullWidth * 0.9, marginBottom: 15}}
            />
            <TextInput 
                label="Mật Khẩu"
                mode="outlined"
                secureTextEntry={true}
                value={passwordValue}
                onChangeText={(value) => setPasswordValue(value)}
                theme={{ colors: { primary: 'black',underlineColor:'transparent' }}}
                style={{width: fullWidth * 0.9, marginBottom: 15}}
            />
            <Button 
                mode="outlined" 
                color="white" 
                style={{width: fullWidth * .9,  backgroundColor: '#2d88ff', padding: 10}}
                onPress={handleOnPress}
            > 
                ĐĂNG NHẬP
            </Button>
        </View>
    )
}

export default LoginScreen;