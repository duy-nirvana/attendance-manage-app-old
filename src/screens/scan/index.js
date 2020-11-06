import React, { useEffect, useState } from 'react';
import {Text, View, Dimensions, Button, StyleSheet} from 'react-native';
// import QRCode from 'react-native-qrcode-svg';

import {Camera} from 'expo-camera';
import { TouchableOpacity } from 'react-native-gesture-handler';

const fullWidth = Dimensions.get('screen').width;

const ScanScreen = (props) => {
    const {hasOpenCamera, handleCamera, hasScaned, handleScan} = props;
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(BarCodeScanner.Constants.Type.back);

    useEffect(() => {
        (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        })();
    }, []);

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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text>Scan QRCode here</Text>
                
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
                    />

                    // <BarCodeScanner
                        
                    //     style={{
                    //         width: Dimensions.get('screen').width,
                    //         height: Dimensions.get('screen').height,
                    //     }}
                    // >
                    //     <View
                    //         style={{
                    //             flex: 1,
                    //             backgroundColor: 'transparent',
                    //             flexDirection: 'row',
                    //         }}>
                    //         <TouchableOpacity
                    //             style={{
                    //                 flex: 1,
                    //                 alignItems: 'flex-end',
                    //             }}
                    //             onPress={() => {
                    //                 setType(
                    //                     type === BarCodeScanner.Constants.Type.back
                    //                         ? BarCodeScanner.Constants.Type.front
                    //                     : BarCodeScanner.Constants.Type.back

                    //                 );
                    //             }}>
                    //         </TouchableOpacity>
                    //     </View>
                        
                    // </BarCodeScanner>
                    :
                    <Button title={'Touch to scan'} onPress={() => handleCamera(true)} />
                }

                {hasScaned && 
                    <Button 
                        title={'Tap to Scan Again'} 
                        onPress={() => handleScan(false)} 
                    />
                }
        </View>
    )
}

export default ScanScreen;