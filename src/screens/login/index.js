import React, { useEffect, useState } from 'react';
import {View, Text, StatusBar, Dimensions} from 'react-native';
import {TextInput, Title, Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import authApi from '../../api/authApi';

const statusBarHeight = StatusBar.currentHeight;
const fullWidth = Dimensions.get('screen').width; //full width

const LoginScreen = (props) => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [codeNumberValue, setCodeNumber] = useState('');
    const [passwordValue, setPasswordValue] = useState(''); 
    const [valueForm, setValueForm] = useState({});

    const handleOnPress = async () => {
        setValueForm(prevState => ({
            ...prevState,
            codeNumber: codeNumberValue,
            password: passwordValue
        }))

        try {
            const loginInfo = await authApi.login(valueForm);
            AsyncStorage.setItem('userToken', loginInfo.token); 
            dispatch({ type: 'SIGN_IN', token: loginInfo.token });
        } catch (error) {
            console.log('Fail to login', error);
        }
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