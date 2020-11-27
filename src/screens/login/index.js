import React, { useEffect, useState } from 'react';
import {View, Text, StatusBar, Dimensions} from 'react-native';
import {TextInput, Title, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import authApi from '../../api/authApi';

const statusBarHeight = StatusBar.currentHeight;
const fullWidth = Dimensions.get('screen').width; //full width

const LoginScreen = (props) => {
    const dispatch = useDispatch();
    const [codeNumberValue, setCodeNumber] = useState('');
    const [passwordValue, setPasswordValue] = useState(''); 
    const [valueForm, setValueForm] = useState({});
    
    useEffect(() => {
        setValueForm((prevState) => ({
            ...prevState,
            codeNumber: codeNumberValue,
            password: passwordValue
        }))

    }, [codeNumberValue, passwordValue])

    const handleOnPress = async () => {
        try {
            await authApi.login(valueForm)
            .then((res) => {
                AsyncStorage.setItem('userToken', res.token); 
                dispatch({ type: 'SIGN_IN', token: res.token });
            })
            .catch(err => {
                console.log('dang nhap that bai!', JSON.parse(err.response.request._response));
            });
        } catch (error) {
            console.log('Fail to login', error);
        }
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