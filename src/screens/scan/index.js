import React, { useEffect, useRef, useState } from 'react';
import {Text, View, Dimensions, StyleSheet, StatusBar, Modal, ScrollView, SafeAreaView, Alert} from 'react-native';
import { Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Camera} from 'expo-camera';
import {BarCodeScanner} from 'expo-barcode-scanner';

import { useDispatch, useSelector } from 'react-redux';
import userApi from '../../api/userApi';
import CameraArea from './components/CameraArea';
import GenerateQRCode from './components/GenerateQRCode';
import HistoryArea from './components/HistoryArea';
import HistoryGenerateArea from './components/HistoryGenerateArea';

const fullWidth = Dimensions.get('screen').width;

const ScanScreen = (props) => {
    // --- CAMERA AREA ---
    const [hasOpenCamera, setOpenCamera] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);

    const handleOpenCamera = (status) => {
        setOpenCamera(status);
    }

    // QR-CODE AREA
    const [hasOpenQRCode, setOpenQRCode] = useState(false);
    
    const handleOpenQRCode = (status) => {
        setOpenQRCode(status);
    }

    // History scan qrcode area
    const [hasOpenHistory, setOpenHistory] = useState(false);

    const handleOpenHistory = (status) => {
        setOpenHistory(status);
    }

    // History generate qrcode area
    const [hasOpenHistoryGenerate, setOpenHistoryGenerate] = useState(false);

    const handleOpenHistoryGenerate = (status) => {
        setOpenHistoryGenerate(status);
    }
    
    // get detail user
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

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
                    icon={({ size, color }) => (
                        <MaterialCommunityIcons name="qrcode-scan" size={25} color="#fff" />
                    )}
                    style={{width: fullWidth * 0.9, backgroundColor: '#235789', padding: 20, marginBottom: 20}}
                >
                    Điểm danh
                </Button>
                <Button 
                    onPress={() => setOpenQRCode(true)}
                    mode={"contained"}
                    icon={({ size, color }) => (
                        <MaterialCommunityIcons name="qrcode-edit" size={25} color="#fff" />
                    )}
                    style={{width: fullWidth * 0.9, backgroundColor: '#235789', padding: 20, marginBottom: 20}}
                >
                    Tạo mã QR
                </Button>
                <Button 
                    onPress={() => setOpenHistory(true)}
                    mode={"contained"}
                    icon={({ size, color }) => (
                        <MaterialCommunityIcons name="history" size={25} color="#fff" />
                    )}
                    style={{width: fullWidth * 0.9, backgroundColor: '#235789', padding: 20, marginBottom: 20}}
                >
                    Lịch sử điểm danh
                </Button>
                <Button 
                    onPress={() => setOpenHistoryGenerate(true)}
                    mode={"contained"}
                    icon={({ size, color }) => (
                        <MaterialCommunityIcons name="history" size={25} color="#fff" />
                    )}
                    style={{width: fullWidth * 0.9, backgroundColor: '#235789', padding: 20, marginBottom: 20}}
                >
                    Lịch sử tạo mã QR
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

            {/* QRCODE AREA*/}
            <Modal
                animationType="slide"
                visible={hasOpenQRCode}
            >   
                <GenerateQRCode 
                    handleOpenQRCode={handleOpenQRCode}
                />
            </Modal>

            {/* HISTORY AREA*/}
            <Modal
                animationType="slide"
                visible={hasOpenHistory}
            >   
                <HistoryArea
                    handleOpenHistory={handleOpenHistory}
                /> 
            </Modal>

             {/* HISTORY GENERATE AREA*/}
             <Modal
                animationType="slide"
                visible={hasOpenHistoryGenerate}
            >   
                <HistoryGenerateArea
                    handleOpenHistoryGenerate={handleOpenHistoryGenerate}
                /> 
            </Modal>
        </View>
    )
}

export default ScanScreen;