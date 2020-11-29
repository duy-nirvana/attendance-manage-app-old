import React, { useEffect, useState } from 'react';
import { View, Modal, StyleSheet, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Camera } from 'expo-camera';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BarCodeScanner } from 'expo-barcode-scanner';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import qrcodeApi from '../../../api/qrcodeApi';
import historyApi from '../../../api/historyApi';

const statusBarHeight = StatusBar.currentHeight;

const CameraArea = (props) => {
    const {handleOpenCamera} = props;
    const qrcodeInfo = useSelector(state => state.qrcode.qrcode);
    const profileUser = useSelector(state => state.profile.profile);
    const dispatch = useDispatch();

    const [type, setType] = useState(BarCodeScanner.Constants.Type.back);
    const [hasScanned, setScanned] = useState(false);
    const [historyInfo, setHistoryInfo] = useState({});

    const handleCloseCamera = () => {
        handleOpenCamera(false);
        setScanned(false);
    }

    const handleBarCodeScanned = ({ type, data }) => {
        const handleScan = async () => {
            try {
                await qrcodeApi.getById(data)
                .then(res => {
                    dispatch({type: 'UPDATE_QRCODE', payload: res })
                    return res;
                })
                
            } catch (error) {
                setScanned(true);
                alert('Ma QRCODE KHONG HOP LE', error)
            }
        }

        handleScan();
    };

    useEffect(() => {
        if (qrcodeInfo) {
            if (qrcodeInfo.isOutOfDate === false) {
                const checkScanQRCode = async () => {
                    await historyApi.createOne({
                        qrcode: qrcodeInfo._id,
                        user: profileUser._id,
                    })
                        .then(() => {
                            setScanned(true);
                            alert(`Bạn đã điểm danh thành công!`);
                            return;
                        })
                        .catch((error) => {
                            setScanned(true);
                            alert(`Bạn đã điểm danh môn học này!!!`);
                        })
                }
                
                checkScanQRCode();
            } else {
                setScanned(true);
                return alert(`Mã QR Code đã hết hạn! `);
            }
        } 
    }, [qrcodeInfo])
    
    return (  
        <View style={{flex: 1}}>
            <Camera
                onBarCodeScanned={hasScanned ? undefined : handleBarCodeScanned}
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
                hasScanned && 
                <View style={{flex:1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 25}}>
                    <MaterialCommunityIcons name="reload" size={80} color="#fff" onPress={() => setScanned(false)} />
                </View>
            }
        </View>
    )
}

export default CameraArea;