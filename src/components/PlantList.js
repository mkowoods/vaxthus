import React, {Component} from 'react';
import {ScrollView, View} from 'react-native'
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import {SearchBar} from 'react-native-elements'
import {fetchPlants} from '../actions'
import PlantListDetail from './PlantListDetail'


class PlantList extends Component{

    constructor(props){
        super(props)
        this.onSearchChangeText = this.onSearchChangeText.bind(this);
        this.state = {
            query: ""
        }

        this.onSearchClear = this.onSearchClear.bind(this);
        this.onSearchChangeText = this.onSearchChangeText.bind(this);
    }

    static navigationOptions = ({ navigation }) =>  {
        return {
            title: 'Feed(Logo)',
        }
    };

    componentDidMount(){
        this.props.fetchPlants()
    }


    onSearchChangeText(text){
        this.setState({query: text})
    }

    onSearchClear(){
        this.setState({query: ""})
    }

    renderFeed(){
        const feed = this.props.feed.filter(item => item.title.indexOf(this.state.query) > -1)
        return feed.map((item) => {
            //console.log(item)
                return (
                    <PlantListDetail 
                        navigate={this.props.navigation.navigate}
                        key={item.uid} 
                        plant={item} 
                    />
                )
            }
        )
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <SearchBar 
                    lightTheme
                    clearIcon
                    onChangeText={this.onSearchChangeText}
                    onClearText={this.onSearchClear}
                    value={this.state.query}
                    placeholder='Type Here...'
                />
                <ScrollView style={{flex: 1}}>
                    {this.renderFeed()}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = ({plants}) => {
    const feed = Object.values(plants.data)
    return {
        feed
    }
}

export default connect(mapStateToProps, {fetchPlants})(PlantList);