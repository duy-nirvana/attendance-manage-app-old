import React, { useEffect, useState } from 'react';
import {Text, View, Dimensions, Button, StyleSheet} from 'react-native';
// import QRCode from 'react-native-qrcode-svg';

import { BarCodeScanner } from 'expo-barcode-scanner';

const fullWidth = Dimensions.get('screen').width;

const ScanScreen = (props) => {
    const {hasOpenCamera, handleCamera} = props;
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
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
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{
                        width: Dimensions.get('screen').width,
                        height: Dimensions.get('screen').height,
                    }}
                />
                :
                <Button title={'Touch to scan'} onPress={() => handleCamera(true)} />
            }
              
                
            {scanned && 
                <Button 
                    title={'Tap to Scan Again'} 
                    onPress={() => setScanned(false)} 
                    style={{marginTop: 100}}
                />
            }

        </View>
    )
}

export default ScanScreen;