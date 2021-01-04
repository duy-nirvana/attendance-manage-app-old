import moment from 'moment-timezone';
import 'moment/locale/vi'; // without this line it didn't work
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Text, Dimensions, ScrollView, View, Modal } from 'react-native';
import { ActivityIndicator, Button, Chip, Divider, Subheading, TextInput, Title } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import slugify from 'slugify';
import qrcodeApi from '../../../api/qrcodeApi';
import QRCode from 'react-native-qrcode-svg';

const fullWidth = Dimensions.get("screen").width;

const HistoryGenerateArea = (props) => {
    const {handleOpenHistoryGenerate} = props;
    const profileUser = useSelector(state => state.profile.profile);
    const [historyInfo, setHistoryInfo] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [infoQRCode, setInfoQRCode] = useState("");
    const [isDetailQRCodeModal, setDetailQRCodeModal] = useState(false);

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            await qrcodeApi.getByUserId(profileUser._id)
            .then(res => {
                setHistoryInfo(res);
                setLoading(false);
            })
        }

        fetchHistory();
    }, [])

    const handleViewQrCodeInfo = (id) => {
        setInfoQRCode(id);
        setDetailQRCodeModal(true);
    }

    const filterSubjects = (histories) => {
        const removeMarkSearchString = slugify(searchInput, {
            replacement: ' ',  
            remove: undefined, 
            lower: true,      
            strict: false,     
            locale: 'vi'   
        })

        return histories && histories.filter((history) => {
            return slugify(history.subject[0].name, {
                replacement: ' ',  
                remove: undefined, 
                lower: true,      
                strict: false,     
                locale: 'vi'   
            }).includes(removeMarkSearchString)
        })
    }

    const renderHistory = filterSubjects(historyInfo);

    return (
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}} >
                <TextInput 
                    placeholder="Tìm lịch sử tạo mã QR" 
                    mode="outlined"
                    value={searchInput}
                    theme={{ colors: { primary: 'black', underlineColor:'transparent' }}}
                    style={{width: fullWidth * .9,  backgroundColor: 'white'}}
                    onChangeText={(value) => setSearchInput(value)} 
                />
                <MaterialCommunityIcons name="close" size={40} color="#000" onPress={() => handleOpenHistoryGenerate(false)} />
            </View>
            <ScrollView
                style={{marginBottom: 40}}
            >   
                    {isLoading &&
                        <ActivityIndicator 
                            animating={true} 
                            color="#000" 
                        />
                    } 
                    {   
                        renderHistory &&
                        renderHistory.map(history => (
                            <TouchableOpacity
                                key={history._id}
                                style={{ padding: 10}}
                                onPress={() => handleViewQrCodeInfo(history._id)}
                            >
                               {
                                    history.subject.map(subject => (
                                        <Title 
                                            key={subject._id} 
                                            style={{marginBottom: 5}}
                                        >
                                            {subject.name}
                                        </Title>
                                    ))
                                }
                                <View style={{flexWrap: 'wrap', flexDirection: "row", marginBottom: 5}}>
                                    {
                                        history.classes.map(classes => (
                                            <Chip 
                                                key={classes._id}
                                                style={{backgroundColor: '#235789', marginRight: 5, marginTop: 5}}
                                            >
                                                <Subheading style={{color: '#fff'}}>{classes.name}</Subheading>
                                            </Chip>
                                        ))
                                    }
                                </View>
                                <Subheading>Còn hiệu lực: 
                                    {history.isOutOfDate ? 
                                        <Text style={{color: 'red',fontWeight: 'bold'}}> Không</Text> 
                                        : 
                                        <Text style={{color: 'green', fontWeight: 'bold'}}> Còn</Text> 
                                    }
                                </Subheading>
                                <Subheading>Chú thích: {history.description ? history.description : ''}
                                </Subheading>
                                <Subheading>Ngày tạo mã: {moment(history.createdAt).tz('Asia/Ho_Chi_Minh').format('HH:mm:ss, dddd DD/MM/YYYY')}</Subheading>    
                                <Divider style={{marginTop: 15}}/>
                            </TouchableOpacity>
                            
                            
                        ))
                        
                    }                     
            </ScrollView>
            {   
                    <Modal visible={isDetailQRCodeModal}>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} >
                            <QRCode
                                size={fullWidth * 0.9}
                                value={infoQRCode}
                            />
                        </View>
                        <Button onPress={() => setDetailQRCodeModal(false)}>
                            <Text style={{color: '#000'}}>Thoát</Text>
                        </Button>
                    </Modal>
                    }
        </View>
    )
}

export default HistoryGenerateArea;