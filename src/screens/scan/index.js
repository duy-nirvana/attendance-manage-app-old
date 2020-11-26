import React, { useEffect, useRef, useState } from 'react';
import {Text, View, Dimensions, StyleSheet, StatusBar, Modal, ScrollView, SafeAreaView, Alert} from 'react-native';
import { Button } from 'react-native-paper';
import QRCode from 'react-native-qrcode-svg';

import {Camera} from 'expo-camera';
import {BarCodeScanner} from 'expo-barcode-scanner';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// DropDown
import MultiSelect from 'react-native-multiple-select';
import classApi from '../../api/classApi';
import subjectApi from '../../api/subjectApi';
import {Picker} from '@react-native-picker/picker';
import qrcodeApi from '../../api/qrcodeApi';
import { useDispatch, useSelector } from 'react-redux';
import userApi from '../../api/userApi';
import historyApi from '../../api/historyApi';
import CameraArea from './components/CameraArea';

const fullWidth = Dimensions.get('screen').width;
const statusBarHeight = StatusBar.currentHeight;

const ScanScreen = (props) => {
    // const {navigation ,hasOpenCamera, handleCamera, hasScaned, handleScan} = props;
    // --- CAMERA AREA ---
    const [hasOpenCamera, setOpenCamera] = useState(false);

    const handleOpenCamera = (status) => {
        setOpenCamera(status);
    }


    // -----------
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(BarCodeScanner.Constants.Type.back);

    // QR-CODE AREA
    const [hasOpenQRCode, setOpenQRCode] = useState(false);
    const [hasSettingQRCode, setSettingQRCode] = useState(false);
    const [infoQRCode, setInfoQRCode] = useState("");
    
   

    // DROPDOWN GENERATE QRCODE
    const profileUser = useSelector(state => state.profile.profile);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const [classes, setClasses] = useState([]);
    const [subject, setSubject] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState([]);
    const [selectedTime, setSelectedTime] = useState(30000);

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
            qrcodeApi.createOne(stringQRCode)
            .then((data) => {
                setInfoQRCode(data._id);
                setSettingQRCode(true);
                qrcodeApi.updateById(data._id);
            })
        } catch (error) {
            console.log('fail to post qrcode info', );
        }
    }

    // get detail user
    useEffect(() => {
        const userProfile = async () => {
            try {
                const user = await userApi.getDetail(auth.userToken);

                dispatch({type: 'GET_PROFILE', payload: user});
            } catch (error) {
                console.log('Fail to get detail user', error);
            }
        }
        userProfile();
    }, [])


    // ---------------------------------------------------------
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    // useEffect(() => {
    //     const unsubscribe = navigation.addListener('tabPress', () => {
    //         handleCamera(false);
    //         handleScan(false);
    //     });

    //     return unsubscribe;
    // }, [navigation]);

    const handleCloseQRCode = () => {
        setOpenQRCode(false);
        setSettingQRCode(false);
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
        
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Button 
                    onPress={() => setOpenCamera(true)}
                    mode={"contained"}
                    style={{width: fullWidth * 0.9, backgroundColor: '#2d88ff', padding: 10, marginBottom: 20}}
                >
                    Touch to scan
                </Button>
                <Button 
                    onPress={() => setOpenQRCode(true)}
                    mode={"contained"}
                    style={{width: fullWidth * 0.9, backgroundColor: '#2d88ff', padding: 10}}
                >
                    Generate QRCode
                </Button>
            </View>

            {/* CAMERA AREA */}
            <Modal
                animationType="fade"
                visible={hasOpenCamera}
            > 
                <CameraArea 
                    handleOpenCamera={handleOpenCamera}
                />
            </Modal>

            {/* QRCODE area scan modal*/}
            <Modal
                animationType="slide"
                visible={hasOpenQRCode}
            >   
                <View style={{flex: 1}}>
                    <View style={{justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                        <MaterialCommunityIcons name="close" size={50} color="#000" onPress={handleCloseQRCode} />
                    </View>
                    <SafeAreaView style={{flex:1, alignItems: "center"}}>
                        <View>
                            <Text style={{marginBottom: 5, marginTop: 20, textAlign: 'center'}}>LỚP HỌC</Text>
                            <MultiSelect
                                items={classes}
                                uniqueKey="_id"
                                ref={(component) => { multiSelect = component }}
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
                                ref={(component) => { multiSelect = component }}
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
            </Modal>
        </View>
    )
}

export default ScanScreen;