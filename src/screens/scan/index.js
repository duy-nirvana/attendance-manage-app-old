import React, { useEffect, useRef, useState } from 'react';
import {Text, View, Dimensions, StyleSheet, StatusBar, Modal, ScrollView, SafeAreaView} from 'react-native';
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

const fullWidth = Dimensions.get('screen').width;
const statusBarHeight = StatusBar.currentHeight;

const ScanScreen = (props) => {
    const {navigation ,hasOpenCamera, handleCamera, hasScaned, handleScan} = props;
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(BarCodeScanner.Constants.Type.back);

    // QR-CODE AREA
    const [hasOpenQRCode, setOpenQRCode] = useState(false);
    const [hasSettingQRCode, setSettingQRCode] = useState(false);
    const [infoQRCode, setInfoQRCode] = useState("");
    
   

    // DROPDOWN
    const [classes, setClasses] = useState([]);
    const [subject, setSubject] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState([]);
    const [selectedTime, setSelectedTime] = useState(30);

    const stringQRCode = {
        classes: selectedClasses,
        subject: selectedSubject,
        time: selectedTime
    }
    
    console.log('qrcode info', stringQRCode);

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
        setInfoQRCode(JSON.stringify(stringQRCode));
        setSettingQRCode(true);
    }


    // ---------------------------------------------------------
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('tabPress', () => {
            handleCamera(false);
            handleScan(false);
        });

        return unsubscribe;
    }, [navigation]);

    const handleCloseCamera = () => {
        handleCamera(false);
        handleScan(false);
    }

    const handleCloseQRCode = () => {
        setOpenQRCode(false);
        setSettingQRCode(false);
    }

    const handleBarCodeScanned = ({ type, data }) => {
        handleScan(true);
        alert(`Ban da diem danh thanh cong! ${data}, type: ${type}`);
    };

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
                    onPress={() => handleCamera(true)}
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
                <View style={{flex: 1}}>
                    <Camera
                        onBarCodeScanned={hasScaned ? undefined : handleBarCodeScanned}
                        flashMode={Camera.Constants.FlashMode.on}
                        barCodeScannerSettings={{
                            barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                        }}
                        style={[StyleSheet.absoluteFill]}
                    >
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignItems: 'flex-end',
                                }}
                                onPress={() => {
                                    setType(
                                        type === BarCodeScanner.Constants.Type.back
                                            ? BarCodeScanner.Constants.Type.front
                                        : BarCodeScanner.Constants.Type.back
                                    );
                                }}>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-end', marginTop: 10 + statusBarHeight, marginLeft: 25, marginRight: 25}}>
                        <MaterialCommunityIcons name="close" size={50} color="#fff" onPress={() => handleCloseCamera()} />
                    </View>
                    {
                        hasScaned && 
                        <View style={{flex:1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 25}}>
                            <MaterialCommunityIcons name="reload" size={80} color="#fff" onPress={() => handleScan(false)} />
                        </View>
                    }
                </View>
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
                                <Picker.Item label="30 giây" value={30} />
                                <Picker.Item label="1 phút" value={60} />
                                <Picker.Item label="1 phút 30 giây" value={90} />
                                <Picker.Item label="2 phút" value={120} />
                                <Picker.Item label="3 phút" value={180} />
                                <Picker.Item label="4 phút" value={240} />
                                <Picker.Item label="5 phút" value={300} />
                            </Picker>
                            
                            <Button 
                                mode="outlined" 
                                color="white" 
                                style={{width: fullWidth * .9,  backgroundColor: 'navy', padding: 10, marginTop: 30}}
                                onPress={generateQRCode}
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
                                        // value={infoQRCode}
                                        value="5fb7acc40b20dc3d794a1b68"
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