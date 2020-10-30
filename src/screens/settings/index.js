import React from 'react';
import {Image, View, Dimensions, StatusBar} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

const width = Dimensions.get('window').width; //full width
const statusBarHeight = StatusBar.currentHeight;

const SettingsScreen = (props) => {

    return (
        <View style={{flex: 1, alignItems: 'center', paddingTop: statusBarHeight + 20, backgroundColor: 'white'}}>
            <Image 
                style={{width: 100, height: 100, borderRadius: 40/2, marginBottom: 20}}
                source={{
                    uri: "https://www.shareicon.net/data/2015/09/20/104335_avatar_512x512.png"
                }}
            />
            <TextInput
                style={{width: width * .9,  backgroundColor: 'white'}}
                label="HỌ VÀ TÊN"
                value="Khánh Duy"
                editable={false}
            />
            <TextInput
                style={{width: width * .9,  backgroundColor: 'white'}}
                label="MSSV"
                value="1711062181"
                editable={false}
            />
            <TextInput
                style={{width: width * .9,  backgroundColor: 'white'}}
                label="LỚP"
                value="17DTHC5"
                editable={false}
            />
            <TextInput
                style={{width: width * .9,  backgroundColor: 'white'}}
                label="EMAIL"
                value="duy@gmail.com"
                editable={false}
            />
            <Button mode="outlined" color="white" style={{width: width * .9,  backgroundColor: 'navy', marginTop: 20}}> 
                ĐỔI MẬT KHẨU
            </Button>
            <Button mode="outlined" color="white" style={{width: width * .9,  backgroundColor: 'black', marginTop: 20}}> 
                ĐĂNG XUẤT
            </Button>
        </View>
    )
}

export default SettingsScreen;