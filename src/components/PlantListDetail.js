import React, {Component} from 'react'
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native'
import {Card, CardSection} from './common'

class PlantListDetail extends Component{

    constructor(props){
        super(props)
        this.state = {
            showFullText: false
        }
        this.toggleFullText = this.toggleFullText.bind(this);
        this.onImageTouch = this.onImageTouch.bind(this);
    }

    renderDetailText(){
        const {description} = this.props.plant;
        const descriptionLength = description.length;
        if(descriptionLength > 50 && !this.state.showFullText){
            return (
                <Text>{description.slice(0, 50)}<Text style={{color: 'grey'}}>...more</Text></Text>
            )
        }
        return description;
    }

    toggleFullText(){
        const showFullText = !this.state.showFullText;
        this.setState({showFullText})
    }

    onImageTouch(){
        this.props.navigate('Detail', {uid: this.props.plant.uid})
    }
    
    getImage(){
        if(this.props.plant.image){
           return {uri: this.props.plant.image}
        } else {
            return require('../assets/leaf.png')
        }
    }

    render(){
        return (
            <View style={{flex: 1}}>
                <Card>
                    <CardSection>
                        <TouchableOpacity onPress={this.onImageTouch} style={{flex: 1}}>
                            <View style={{padding: 10}}>
                                <Image 
                                    style={styles.imageStyle}
                                    source={this.getImage()}
                                />
                            </View>
                        </TouchableOpacity>
                    </CardSection>
                    <CardSection>
                        <View style={styles.headerContentStyle}>
                            <Text style={styles.headerTextStyle}>{this.props.plant.title}</Text>
                            <Text onPress={this.toggleFullText}>{this.renderDetailText()}</Text>
                        </View>
                    </CardSection>
                    <CardSection>
                    </CardSection>
                </Card>
            </View>

        )    
    }
}

const styles = StyleSheet.create({
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 18,
        marginBottom: 5
    },
    thumbnailStyle: {
        height: 50,
        width: 50,
        backgroundColor: '#ddd'
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    imageStyle: {
        height: 300,
        flex: 1,
        width: null,
        backgroundColor: '#ddd'
    }
});

export default PlantListDetail;