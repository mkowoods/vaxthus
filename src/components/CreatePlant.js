import React, {Component} from 'react'
import{View, Text, Picker} from 'react-native';
import {
    FormLabel, 
    FormInput, 
    FormValidationMessage, 
    ButtonGroup,
    Button
} from 'react-native-elements'
import {connect} from 'react-redux';
// import { Camera, Permissions } from 'expo';

import {updateForm, submitForm} from '../actions'
import style, {COLORS} from '../styles'

class CreatePlant extends Component {

    constructor(props){
        super(props)
        this.state = {
            hasTitleError: false,
        }
        this.validateBeforSubmit = this.validateBeforSubmit.bind(this);
        this.updateForm = this.updateForm.bind(this)
    }


    updateForm({prop, value}){
        this.setState({hasTitleError: false})
        this.props.updateForm({prop, value})
    }

    validateBeforSubmit(){
        if(!this.props.plantForm.title){
            this.setState({hasTitleError: true})
            return;
        }
        this.props.submitForm()
    }


    render() {
        const buttons = ['Low', 'Moderate', 'High']
        const { selectedIndex } = 0
      return (
        <View style={{ flex: 1, marginTop: 30, justifyContent: "space-between"}}>
            <View>
                <FormLabel>Plant</FormLabel>
                <FormInput 
                    onChangeText={(value) => this.updateForm({prop: 'title', value})}
                    placeholder="Enter Plant Name..."
                    inputStyle={{width: "90%"}}
                    value={this.props.plantForm.title}
                />
                {this.state.hasTitleError ? (
                        <FormValidationMessage>Title is Empty</FormValidationMessage>
                ) : null}
                <FormLabel>Description</FormLabel>
                <FormInput 
                    multiline
                    onChangeText={(value) => this.updateForm({prop: 'description', value})}
                    placeholder="Enter Description"
                    inputStyle={{width: "90%"}}
                    value={this.props.plantForm.description}
                />
                <FormLabel>Sun</FormLabel>
                <ButtonGroup
                    onPress={(value) => {this.updateForm({prop: 'sun', value})}}
                    selectedIndex={this.props.plantForm.sun}
                    buttons={buttons}
                    containerStyle={{height: 40}}
                    selectedButtonStyle={{backgroundColor: COLORS.successGreen}}
                    selectedTextStyle={{color: COLORS.white}}
                />
                <FormLabel>Water</FormLabel>
                <ButtonGroup
                    onPress={(value) => {this.updateForm({prop: 'water', value})}}
                    selectedIndex={this.props.plantForm.water}
                    buttons={buttons}
                    containerStyle={{height: 40}}
                    selectedButtonStyle={{backgroundColor: COLORS.successGreen}}
                    selectedTextStyle={{color: COLORS.white}}
                />
            </View>
            <Button 
                title="Submit" 
                loading={this.props.plantForm.loading}
                onPress={this.validateBeforSubmit}
                backgroundColor={COLORS.successGreen}
                containerViewStyle={{marginBottom: 20}}
            />
            {/* <FormValidationMessage>Error message</FormValidationMessage> */}
        </View>
      );
    }
  }

function mapStateToProps({plantForm}){
    return {plantForm}
}
  
export default connect(mapStateToProps, {updateForm, submitForm})(CreatePlant);