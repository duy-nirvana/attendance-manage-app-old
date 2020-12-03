import React, { useEffect, useState } from 'react';
import {View, Text, Dimensions, StatusBar, Alert} from 'react-native';
import {TextInput, Button, Title} from 'react-native-paper';
import Toast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import userApi from '../../../api/userApi';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const fullWidth = Dimensions.get('screen').width; //full width
const statusBarHeight = StatusBar.currentHeight;

const UpdatePassword = (props) => {
    const {handleOpenChangePassword, handleSignOut} = props;
    const profileUser = useSelector(state => state.profile.profile);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState(''); 
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [valueForm, setValueForm] = useState({});

    useEffect(() => {
        setValueForm((prevState) => ({
            ...prevState,
            currentPassword,
            newPassword,
            confirmNewPassword
        }))

    }, [currentPassword, newPassword, confirmNewPassword])

    console.log('form submit: ', valueForm);

    const handleChangeErrorsToString = (errors) => {
        let errorsString = "";
        errors.errors.map((err) => {
            errorsString += `${err.msg} \n`
        })
        return errorsString;
    }

    const handleChangePassword = async () => {
        await userApi.updatePassword(profileUser._id, valueForm)
        .then((res) => {
            Alert.alert(
                "",
                `Thay đổi mật khẩu thành công! Hãy đăng nhập lại.
                `,
                [
                  {
                    text: "OK",
                    onPress: () => handleSignOut()
                  },
                ],
                { cancelable: false }
            );
        })
        .catch((err) => {
            const errors = JSON.parse(err.response.request._response);
            Toast.show(`${handleChangeErrorsToString(errors)}`, Toast.LONG);
        });
    }

    return (
        <View >
            <View style={{justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                <MaterialCommunityIcons name="close" size={40} color="#000" onPress={() => handleOpenChangePassword(false)} />
            </View>

            <View
                style={{ marginTop: statusBarHeight + 20, alignItems: "center"}}
            >

                <Title style={{fontSize: 25, marginBottom: 10 }} >Thay đổi mật khẩu</Title>
                <TextInput 
                    label="Mật Khẩu hiện tại"
                    mode="outlined"
                    value={currentPassword}
                    secureTextEntry={true}
                    onChangeText={(value) => setCurrentPassword(value)}
                    theme={{ colors: { primary: 'black',underlineColor:'transparent' }}}
                    style={{width: fullWidth * 0.9, marginBottom: 15}}
                />
                <TextInput 
                    label="Mật Khẩu mới"
                    mode="outlined"
                    secureTextEntry={true}
                    value={newPassword}
                    onChangeText={(value) => setNewPassword(value)}
                    theme={{ colors: { primary: 'black',underlineColor:'transparent' }}}
                    style={{width: fullWidth * 0.9, marginBottom: 15}}
                />
                <TextInput 
                    label="Xác nhận Mật Khẩu mới"
                    mode="outlined"
                    secureTextEntry={true}
                    value={confirmNewPassword}
                    onChangeText={(value) => setConfirmNewPassword(value)}
                    theme={{ colors: { primary: 'black',underlineColor:'transparent' }}}
                    style={{width: fullWidth * 0.9, marginBottom: 15}}
                />
                <Button 
                    mode="outlined" 
                    color="white" 
                    style={{width: fullWidth * .9,  backgroundColor: 'black', padding: 10, marginTop: 10}}
                    onPress={handleChangePassword}
                > 
                    Đổi mật khẩu
                </Button>
            </View>
        </View>
    )
}

export default UpdatePassword;