import React, { useEffect, useState } from 'react';
import {Image, View, Modal, ScrollView, Dimensions, StatusBar, Alert} from 'react-native';
import {TextInput, Button, Avatar} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UpdatePassword from './components/UpdatePassword';

const fullWidth = Dimensions.get('screen').width; //full width
const statusBarHeight = StatusBar.currentHeight;

const SettingsScreen = (props) => {
    const [hasOpenChangePassword, setOpenChangePassword] = useState(false);
    const profileUser = useSelector(state => state.profile.profile);
    const dispatch = useDispatch();

    const handleOpenChangePassword = (status) => {
        setOpenChangePassword(status);
    }

    const verifySignOut = () => {
        Alert.alert(
            "",
            "Bạn chắc chắn muốn đăng xuất?",
            [
                {
                    text: "Hủy"
                },
                {
                    text: "OK",
                    onPress: () => handleSignOut()
                },
            ],
            { cancelable: false }
        );
    }

    const handleSignOut = () => {
        dispatch({ type: 'SIGN_OUT' });
        AsyncStorage.removeItem('userToken');
    } 

    return (
        <View style={{backgroundColor: 'white'}}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingTop: statusBarHeight + 20 }}>
                <Image 
                    style={{width: 100, height: 100, borderRadius: 50, marginBottom: 20}}
                    source={{
                        uri: `${profileUser.avatar}`
                    }}
                />
                <TextInput
                    style={{width: fullWidth * .9,  backgroundColor: 'white'}}
                    label="HỌ VÀ TÊN"
                    value={profileUser.fullName}
                    editable={false}
                />
                <TextInput
                    style={{width: fullWidth * .9,  backgroundColor: 'white'}}
                    label="MSSV"
                    value={profileUser.codeNumber}
                    editable={false}
                />
                <TextInput
                    style={{width: fullWidth * .9,  backgroundColor: 'white'}}
                    label="LỚP"
                    value={profileUser.classroom.name}
                    editable={false}
                />
                <TextInput
                    style={{width: fullWidth * .9,  backgroundColor: 'white'}}
                    label="SĐT"
                    value={profileUser.phone}
                    editable={false}
                />
                <TextInput
                    style={{width: fullWidth * .9,  backgroundColor: 'white'}}
                    label="EMAIL"
                    value={profileUser.email}
                    editable={false}
                />
                <Button 
                    mode="outlined" 
                    color="white" 
                    style={{width: fullWidth * .9,  backgroundColor: 'navy', padding: 10, marginTop: 10}}
                    onPress={() => handleOpenChangePassword(true)}
                > 
                    ĐỔI MẬT KHẨU
                </Button>
                <Button 
                    mode="outlined" 
                    color="white" 
                    style={{width: fullWidth * .9,  backgroundColor: 'black', padding: 10, marginTop: 10}}
                    onPress={verifySignOut}
                > 
                    ĐĂNG XUẤT
                </Button>
                <Modal
                    animationType="slide"
                    visible={hasOpenChangePassword}
                >   
                    <UpdatePassword 
                        handleOpenChangePassword={handleOpenChangePassword}
                        handleSignOut={handleSignOut}
                    />
                </Modal>
            </ScrollView>

        </View>
    )
}

export default SettingsScreen;