import moment from 'moment-timezone';
import 'moment/locale/vi'; // without this line it didn't work
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { ActivityIndicator, Chip, Divider, Subheading, TextInput, Title } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import slugify from 'slugify';
import historyApi from '../../../api/historyApi';

const fullWidth = Dimensions.get("screen").width;

const HistoryArea = (props) => {
    const {handleOpenHistory} = props;
    const profileUser = useSelector(state => state.profile.profile);
    const [historyInfo, setHistoryInfo] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            await historyApi.getUser(profileUser._id)
            .then(res => {
                setHistoryInfo(res);
                setLoading(false);
            })
        }

        fetchHistory();
    }, [])

    const filterSubjects = (histories) => {
        const removeMarkSearchString = slugify(searchInput, {
            replacement: ' ',  
            remove: undefined, 
            lower: true,      
            strict: false,     
            locale: 'vi'   
        })

        return histories && histories.filter((history) => {
            return slugify(history.qrcode.subject[0].name, {
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
                    placeholder="Tìm lịch sử điểm danh" 
                    mode="outlined"
                    value={searchInput}
                    onChangeText={(value) => setSearchInput(value)} 
                    style={{width: fullWidth * .9,  backgroundColor: 'white'}}
                />
                <MaterialCommunityIcons name="close" size={40} color="#000" onPress={() => handleOpenHistory(false)} />
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
                            <View
                                key={history._id}
                                style={{ padding: 10}}
                            >
                                {
                                    history.qrcode.subject.map(subject => (
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
                                        history.qrcode.classes.map(classes => (
                                            <Chip 
                                                key={classes._id}
                                                style={{backgroundColor: '#235789', marginRight: 5, marginTop: 5}}
                                            >
                                                <Subheading style={{color: '#fff'}}>{classes.name}</Subheading>
                                            </Chip>
                                        ))
                                    }
                                </View>
                                <Subheading>Ngày điểm danh: {moment(history.createdAt).tz('Asia/Ho_Chi_Minh').format('HH:mm:ss, dddd DD/MM/YYYY')}</Subheading>    
                                <Divider style={{marginTop: 15}}/>
                            </View>
                            
                        ))
                    } 
            </ScrollView>
        </View>
    )
}

export default HistoryArea;