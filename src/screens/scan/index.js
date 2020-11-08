import React, { useEffect, useState } from 'react';
import {Text, View, Dimensions, StyleSheet, StatusBar} from 'react-native';
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
        alert(`Ban da diem danh thanh cong! ${data}`);
            };

            if (hasPermission === null) {
                return <Text>Requesting for camera permission</Text>;
            }
            if (hasPermission === false) {
                return <Text>No access to camera</Text>;
            }
        
        return (
            <View style={{ flex: 1}}>
                
                {/* <QRCode 
                    value="heheboiz"
                    size={fullWidth * 0.8}
                /> */}
                {/* test scanner */}
                
                {
                    hasOpenCamera ? 
                    <Camera
                        onBarCodeScanned={hasScaned ? undefined : handleBarCodeScanned}
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
                    :
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Button 
                            onPress={() => handleCamera(true)}
                            mode={"contained"}
                            style={{backgroundColor: 'navy', padding: 10}}
                        >
                            Touch to scan
                        </Button>
                    </View>
                }

                {
                    hasOpenCamera && 
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 + statusBarHeight, marginRight: 20}}>
                        <MaterialCommunityIcons name="close" size={80} color="#fff" onPress={() => handleCloseCamera()} />
                    </View> 
                }

                {
                    hasScaned && 
                    <View style={{flex:1, justifyContent: 'flex-end', alignItems: 'center'}}>
                        <MaterialCommunityIcons name="reload" size={80} color="#fff" onPress={() => handleScan(false)} />
                    </View>
                }
        </View>
    )
}

export default ScanScreen;