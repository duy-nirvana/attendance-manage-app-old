import React, { useEffect, useState } from 'react';
import { View, Modal, StyleSheet, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';

import { Camera } from 'expo-camera';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BarCodeScanner } from 'expo-barcode-scanner';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import qrcodeApi from '../../../api/qrcodeApi';
import historyApi from '../../../api/historyApi';

const statusBarHeight = StatusBar.currentHeight;

const CameraArea = (props) => {
    const {handleOpenCamera} = props;
    const profileUser = useSelector(state => state.profile.profile);
    const [type, setType] = useState(BarCodeScanner.Constants.Type.back);
    const [hasScanned, setScanned] = useState(false);
    const [qrcodeID, setQRCodeID] = useState("");
    const [historyInfo, setHistoryInfo] = useState({});

    useEffect(() => {
        setHistoryInfo((prevState) => ({
            ...prevState,
            qrcode: qrcodeID,
            user: profileUser._id,
        }))
    }, [qrcodeID, profileUser])

    console.log('history info', historyInfo)

    const handleCloseCamera = () => {
        handleOpenCamera(false);
        setScanned(false);
    }

    const handleBarCodeScanned = async ({ type, data }) => {
        try {
            await qrcodeApi.getById(data).then(res => {
                const handleScanQRCode = async () => {
                    try {
                        setQRCodeID(res._id);
                        if (!res.isOutOfDate) {
                            try {
                                await historyApi.createOne(historyInfo)
                                .then(() => {
                                    setScanned(true);
                                    return alert(`Bạn đã điểm danh thành công!`);
                                })
                                .catch((error) => {
                                    setScanned(true);
                                    return alert(`Bạn đã điểm danh môn học này!!! ${error}`);
                                })
                            } catch (error) {
                            }
                        } else {
                            setScanned(true);
                            return alert(`Mã QR Code đã hết hạn! `);
                        }
                    } catch (error) {
                        setScanned(true);
                        return alert(`LỖI SCAN`);
                    }
                }

                handleScanQRCode()
            });
        } catch (error) {
            setScanned(true);
            alert('Mã QR Code không hợp lệ!');
        }
    };
    
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