import React, { useEffect, useState } from 'react';
import {View, Text} from 'react-native';
import { Button, ActivityIndicator, Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import historyApi from '../../../api/historyApi';

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

        fetchHistory();
    }, [])

    // console.log('profile: ', profileUser);

    return (
        <View style={{flex: 1}}>
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
                                style={{marginBottom: 15, padding: 10}}
                            >
                                {
                                    history.qrcode.subject.map(subject => (
                                        <Text>{subject.name}</Text>
                                    ))
                                }
                                {
                                    history.qrcode.classes.map(classes => (
                                        <Text>{classes.name}</Text>
                                    ))
                                }
                                <Text>{history.createdAt}</Text>    
                                <Divider />
                            </View>
                            
                        ))
                    } 
            </View>
        </View>
    )
}

export default HistoryArea;