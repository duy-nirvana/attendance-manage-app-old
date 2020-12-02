import React, { useEffect, useState } from 'react';
import {View, Text, Dimensions} from 'react-native';
import { Button, ActivityIndicator, Divider, Title, Chip, Subheading } from 'react-native-paper';
import { useSelector } from 'react-redux';
import historyApi from '../../../api/historyApi';
import moment from 'moment-timezone';
import 'moment/locale/vi'  // without this line it didn't work

const fullWidth = Dimensions.get("screen").width;

var time = moment('2020-12-01T16:20:43.010Z');

const HistoryArea = (props) => {
    const {handleOpenHistory} = props;
    const profileUser = useSelector(state => state.profile.profile);
    const [historyInfo, setHistoryInfo] = useState({});
    const [isLoading, setLoading] = useState(false);
    const userHistory = historyInfo.user;

    useEffect(() => {
        const fetchHistory = async () => {
            setLoading(true);
            await historyApi.getUser(profileUser._id)
            .then(res => {
                setHistoryInfo(res);
                setLoading(false);
            })
        }

        console.log('moment: ', moment('2020-12-01T16:20:43.010Z').tz('Asia/Ho_Chi_Minh').format('HH:mm:ss | dddd DD/MM/YYYY') )
        fetchHistory();
    }, [])

    // console.log('profile: ', profileUser);

    return (
        <View>
            <Button
                onPress={() => handleOpenHistory(false)}
            >
                CLOSE
            </Button>
            <View
            >   
                    {isLoading &&
                    <ActivityIndicator 
                        animating={true} 
                        color="#000" 
                    />} 
                    {   
                        userHistory &&
                        userHistory.map(history => (
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
                                <View style={{flexDirection: "row", marginBottom: 5}}>
                                    {
                                        history.qrcode.classes.map(classes => (
                                            <Chip 
                                                key={classes._id}
                                                style={{backgroundColor: '#2d88ff', marginRight: 5}}
                                            >
                                                <Subheading>{classes.name}</Subheading>
                                            </Chip>
                                        ))
                                    }
                                </View>
                                <Subheading>Ngày điểm danh: {moment(history.createdAt).tz('Asia/Ho_Chi_Minh').format('HH:mm:ss, dddd DD/MM/YYYY')}</Subheading>    
                                <Divider style={{marginTop: 15}}/>
                            </View>
                            
                        ))
                    } 
            </View>
        </View>
    )
}

export default HistoryArea;