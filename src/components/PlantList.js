import React, {Component} from 'react';
import {
    FlatList, 
    View, 
    Text, 
    AlertIOS,
    RefreshControl
} from 'react-native'
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
            query: "",
            refreshing: false
        }

        this.onSearchClear = this.onSearchClear.bind(this);
        this.onSearchChangeText = this.onSearchChangeText.bind(this);
        this._renderItem = this._renderItem.bind(this);
        this.feed = this.feed.bind(this);
        this._onRefresh = this._onRefresh.bind(this);

    }

    static navigationOptions = ({ navigation }) =>  {
        return {
            title: 'Feed(Logo)',
        }
    };

    componentDidMount(){
        console.log("Plant List Mounted")
        this.props.fetchPlants()
    }


    onSearchChangeText(text){
        this.setState({query: text})
    }

    onSearchClear(){
        this.setState({query: ""})
    }


    _renderItem({item}){
        return (
            <PlantListDetail 
                navigate={this.props.navigation.navigate}
                key={item.uid} 
                plant={item} 
            />
        )
    }

    _onRefresh() {
        this.props.fetchPlants()
    }
    

    feed(){
        const feed = this.props.feed.filter(item => item.title.indexOf(this.state.query) > -1)
        //console.log(feed)
        // return [];
        return feed
    }

    render() {
        const feed = this.feed()
        console.log(this.props.loading)
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
                <FlatList 
                    style={{flex: 1}} 
                    data={this.feed()}
                    renderItem={this._renderItem}
                    refreshControl = {
                        <RefreshControl
                            refreshing={this.props.loading}
                            onRefresh={this._onRefresh}
                        />
                    }
                />
            </View>
        )}
    }

const mapStateToProps = ({plants}) => {
    const feed = Object.values(plants.data)
    const loading = plants.loading
    return {
        feed,
        loading
    }
}

export default connect(mapStateToProps, {fetchPlants})(PlantList);