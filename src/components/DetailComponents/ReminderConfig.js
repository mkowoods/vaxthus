import React from 'react';
import {View, DatePickerIOS, } from 'react-native';
import {Button} from '../common'

export default (props) => {
    return (
        <View style={{marginTop: 20}}>
            <View style={{flex : 1, flexDirection: 'row'}}>
                <Button 
                    onPress={() => {props.dateOnPress('daily')}}
                    isSelected={props.selectedReminder === 'daily'}
                >Daily</Button>
                <Button 
                    onPress={() => {props.dateOnPress('weekly')}}
                    isSelected={props.selectedReminder === 'weekly'}
                >Weekly</Button>
            </View>
            <DatePickerIOS
                mode={'time'}
                date={props.chosenDate}
                onDateChange={props.onDateChange}
                minuteInterval={10}
            />
        </View>

    )
}