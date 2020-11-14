import React, { useEffect, useState } from 'react';
import {Image, View,Text, ScrollView, Dimensions, StatusBar} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import { useSelector } from 'react-redux';

const fullWidth = Dimensions.get('screen').width; //full width
const statusBarHeight = StatusBar.currentHeight;

const SettingsScreen = (props) => {
    const profileUser = useSelector(state => state.profile.profile);

    return (
        <View style={{backgroundColor: 'white'}}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', paddingTop: statusBarHeight + 20 }}>
                <Image 
                    style={{width: 100, height: 100, borderRadius: 40/2, marginBottom: 20}}
                    source={{
                        uri: "https://www.shareicon.net/data/2015/09/20/104335_avatar_512x512.png"
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
                    value="17DTHC5"
                    editable={false}
                />
                <TextInput
                    style={{width: fullWidth * .9,  backgroundColor: 'white'}}
                    label="SĐT"
                    value="0932611111"
                    editable={false}
                />
                <TextInput
                    style={{width: fullWidth * .9,  backgroundColor: 'white'}}
                    label="EMAIL"
                    value="duy@gmail.com"
                    editable={false}
                />
                <Button mode="outlined" color="white" style={{width: fullWidth * .9,  backgroundColor: 'navy', padding: 10, marginTop: 10}}> 
                    ĐỔI MẬT KHẨU
                </Button>
                <Button mode="outlined" color="white" style={{width: fullWidth * .9,  backgroundColor: 'black', padding: 10, marginTop: 10}}> 
                    ĐĂNG XUẤT
                </Button>
            </ScrollView>
        </View>
    )
}

export default SettingsScreen;