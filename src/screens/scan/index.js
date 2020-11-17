import React, { useEffect, useState } from 'react';
import {Text, View, Dimensions, StyleSheet, StatusBar, Modal} from 'react-native';
import { Button } from 'react-native-paper';
// import QRCode from 'react-native-qrcode-svg';

import {Camera} from 'expo-camera';
import {BarCodeScanner} from 'expo-barcode-scanner';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const fullWidth = Dimensions.get('screen').width;
const statusBarHeight = StatusBar.currentHeight;

const ScanScreen = (props) => {
    const {navigation ,hasOpenCamera, handleCamera, hasScaned, handleScan} = props;
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(BarCodeScanner.Constants.Type.back);

    // QR-CODE AREA
    const [hasOpenQRCode, setOpenQRCode] = useState(false);

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

    const handleBarCodeScanned = ({ type, data }) => {
        handleScan(true);
        alert(`Ban da diem danh thanh cong! ${data}, ${type}`);
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
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text>THIS IS MODAL</Text>
                    <Button onPress={() => setOpenQRCode(!hasOpenQRCode)}>Close Modal</Button>
                </View>
            </Modal>
        </View>
    )
}

export default ScanScreen;