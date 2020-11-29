import React, { useEffect, useState } from 'react';
import { View, Modal, Text, Dimensions, StyleSheet, StatusBar, SafeAreaView, Alert, ScrollView } from 'react-native';
import { Button, ActivityIndicator } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

import classApi from '../../../api/classApi';
import qrcodeApi from '../../../api/qrcodeApi';
import subjectApi from '../../../api/subjectApi';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import MultiSelect from 'react-native-multiple-select';
import {Picker} from '@react-native-picker/picker';

const fullWidth = Dimensions.get('screen').width;

const GenerateQRCode = (props) => {
    const {handleOpenQRCode} = props;
    const [hasSettingQRCode, setSettingQRCode] = useState(false);
    const [classes, setClasses] = useState([]);
    const [subject, setSubject] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState([]);
    const [selectedTime, setSelectedTime] = useState(30000);
    const [infoQRCode, setInfoQRCode] = useState("");
    const [isLoading, setLoading] = useState(false);
    
    const stringQRCode = {
        classes: selectedClasses,
        subject: selectedSubject,
        time: selectedTime
    }
    
    const verifyCreateQRCode = () => {
        Alert.alert(
            "QRCODE",
            "Bạn có đồng ý tạo mã QRCode?",
            [
              {
                text: "Hủy",
              },
              { text: "Đồng ý", onPress: () => generateQRCode() }
            ],
            { cancelable: false }
        );
    }
    
    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const res = await classApi.getAll();
                setClasses(res);
            } catch (err) {
                console.log('fail to fetch data classes', err);
            }
        }
        const fetchSubject = async () => {
            try {
                const res = await subjectApi.getAll();
                setSubject(res);
            } catch (err) {
                console.log('fail to fetch data subject', err);
            } 
        }

        fetchClasses();
        fetchSubject();
    }, [])

    const generateQRCode = () => {
        try {
            setLoading(true);
            qrcodeApi.createOne(stringQRCode)
            .then((data) => {
                setLoading(false);
                setInfoQRCode(data._id);
                setSettingQRCode(true);
                qrcodeApi.updateById(data._id);
            })
        } catch (error) {
            setLoading(false);
            console.log('fail to post qrcode info', );
        }
    }

    return (
        <View style={{flex: 1}}>
            <View style={{justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                <MaterialCommunityIcons name="close" size={50} color="#000" onPress={() => handleOpenQRCode(false)} />
            </View>
            <SafeAreaView style={{flex:1, alignItems: "center"}}>
                <View>
                    <Text style={{marginBottom: 5, marginTop: 20, textAlign: 'center'}}>LỚP HỌC</Text>
                    <MultiSelect
                        items={classes}
                        uniqueKey="_id"
                        //ref={(component) => { multiSelect = component }}
                        onSelectedItemsChange={(item) => setSelectedClasses(item)}
                        selectedItems={selectedClasses}
                        selectText="Chọn lớp học"
                        searchInputPlaceholderText="Tìm lớp học..."
                        tagRemoveIconColor="#fff"
                        tagBorderColor="#2d88ff"
                        tagTextColor="#fff"
                        selectedItemTextColor="navy"
                        selectedItemIconColor="navy"
                        itemTextColor="#aaa"
                        displayKey="name"
                        searchInputStyle={{ color: '#CCC' }}
                        tagContainerStyle={{backgroundColor: "#2d88ff", width: fullWidth * 0.4}}
                        submitButtonColor="navy"
                        hideSubmitButton={true}
                        fixedHeight={true}
                    />
                    <Text style={{marginBottom: 5, marginTop: 20, textAlign: 'center'}}>MÔN HỌC</Text>
                    <MultiSelect
                        single={true}
                        items={subject}
                        uniqueKey="_id"
                        //ref={(component) => { multiSelect = component }}
                        onSelectedItemsChange={(item) => setSelectedSubject(item)}
                        selectedItems={selectedSubject}
                        selectText="Chọn môn học"
                        searchInputPlaceholderText="Tìm môn học..."
                        tagRemoveIconColor="#2d88ff"
                        tagBorderColor="#2d88ff"
                        tagTextColor="#2d88ff"
                        selectedItemTextColor="navy"
                        selectedItemIconColor="navy"
                        itemTextColor="#aaa"
                        displayKey="name"
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor="navy"
                        submitButtonText="Chọn"
                    />
                    <Text style={{marginBottom: 5, marginTop: 20, textAlign: 'center'}}>THỜI GIAN</Text>
                    <Picker
                        selectedValue={selectedTime}
                        style={{height: 50, width: fullWidth * 0.9}}
                        onValueChange={(itemValue, itemIndex) => setSelectedTime(itemValue)}>
                        <Picker.Item label="30 giây" value={30000} />
                        <Picker.Item label="1 phút" value={60000} />
                        <Picker.Item label="1 phút 30 giây" value={90000} />
                        <Picker.Item label="2 phút" value={120000} />
                        <Picker.Item label="3 phút" value={180000} />
                        <Picker.Item label="4 phút" value={240000} />
                        <Picker.Item label="5 phút" value={300000} />
                    </Picker>
                    
                    {
                        isLoading && 
                        <ActivityIndicator 
                            animating={true} 
                            color="#000" 
                        />
                    }

                    <Button 
                        mode="outlined" 
                        color="white" 
                        style={{width: fullWidth * .9,  backgroundColor: 'navy', padding: 10, marginTop: 30}}
                        onPress={verifyCreateQRCode}
                    > 
                        Tạo mã QR Code
                    </Button>
                </View>

                    {   
                    <Modal visible={hasSettingQRCode}
                    >
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
                            <QRCode
                                size={fullWidth * 0.9}
                                value={infoQRCode}
                            />
                        </View>
                        <Button onPress={() => setSettingQRCode(false)}>Close</Button>
                    </Modal>
                    }
            </SafeAreaView>
            
        </View>
    )
}

export default GenerateQRCode;