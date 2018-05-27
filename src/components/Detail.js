import React, {Component} from 'react'
import {ScrollView, View, Text } from 'react-native';
import {Card, CardSection, Button} from './common'
import ReminderConfig from './DetailComponents/ReminderConfig'
import WeatherChart from './DetailComponents/WeatherChart'
import {connect} from 'react-redux'
import Gallery from 'react-native-image-gallery';
import styles from '../styles'


const fill = 'rgb(134, 65, 244)'
const data   = [ 50, 10, 40, 95, -4, -24, null, 85, undefined, 0, 35, 53, -53, 24, 50, -20, -80 ]


class Detail extends Component {

    constructor(props){
        super(props)
        this.state = { 
            chosenDate: new Date(),
            selectedReminder: null,
            showReminderOptions: false,
            showForecast: false
        };
        this.setDate = this.setDate.bind(this);
        this.dateOnPress = this.dateOnPress.bind(this);
        this.onReminderDropdownPress = this.onReminderDropdownPress.bind(this);
        this.onShowForecastPress = this.onShowForecastPress.bind(this);
    }

    static navigationOptions = ({ navigation }) =>  {
        return {
            title: `UID: ${navigation.getParam('uid')}`,
        }
    };

    setDate(newDate) {
        this.setState({chosenDate: newDate})
    }

    dateOnPress(type){
        if(type === this.state.selectedReminder){
            this.setState({selectedReminder: null})
        }else {
            this.setState({selectedReminder: type})
        }
    }

    onReminderDropdownPress(){
        this.setState({showReminderOptions: !this.state.showReminderOptions})
        // this.refs._scrollView.scrollTo({x: 0, y: 200})
    }


    onShowForecastPress(){
        this.setState({showForecast: !this.state.showForecast})
    }

    render(){
        const {title, description, image} = (this.props.selectedPlant || {})
        return (
            <ScrollView ref='_scrollView'>
                <Card>
                    <CardSection>
                        <Text style={styles.headerTextStyle}>{title}</Text>
                    </CardSection>
                    <CardSection>
                        <Text>{description}</Text>
                    </CardSection>
                </Card>
                <Card>
                    <CardSection>
                        <Text>Add Environment Notes</Text>
                    </CardSection>
                    <CardSection>
                        <View style={{flex:1}}>
                            <Text>Add Data On Current Weather
                            https://openweathermap.org/forecast5
                            </Text>
                            <Button 
                                onPress={this.onShowForecastPress} 
                                isSelected={this.state.showForecast}
                            >See Forecast</Button>
                            {this.state.showForecast ? (
                                <WeatherChart 
                                    data={data}
                                    fill={fill}
                                />
                            ) : null}
                        </View>
                    </CardSection>
                </Card>
                <Card>
                    <CardSection>
                        <View style={{flex: 1}}>
                            <Button 
                                onPress={this.onReminderDropdownPress} 
                                isSelected={this.state.showReminderOptions}
                            >Set Reminder</Button>
                            {/* <Text style={[styles.headerTextStyle, {textAlign: 'center'}]}>Set Reminder</Text> */}
                            {this.state.showReminderOptions ? (
                                <ReminderConfig 
                                    selectedReminder={this.state.selectedReminder}
                                    dateOnPress={this.dateOnPress}
                                    chosenDate={this.state.chosenDate}
                                    onDateChange={this.setDate}
                                />) : null}
                        </View>                            
                    </CardSection>
                </Card>
                <Card>
                    <CardSection>

                    <Gallery
                        style={{ flex: 1, backgroundColor: 'black', height: 400}}
                        images={[
                        { source: { uri: image } },
                        { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
                        { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
                        { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
                        ]}
                    />
                    </CardSection>

                </Card>
            </ScrollView>

        )
    }
}

const mapStateToProps = ({plants}, ownProps) => {
    const selected = ownProps.navigation.getParam('uid') || "1"
    return {
        selectedPlant: plants.data[selected]
    }
}


export default connect(mapStateToProps)(Detail);