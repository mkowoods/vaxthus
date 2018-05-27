import React from 'react'
import {Text, TouchableOpacity} from 'react-native'

const Button = (props) => {
    return (
        <TouchableOpacity
            style={props.isSelected ? styles.buttonSelectedStyle : styles.buttonStyle}
            onPress={props.onPress} 
        >
            <Text style={props.isSelected ? styles.textSelectedStyle : styles.textStyle}>{props.children}</Text>
        </TouchableOpacity>
    )
}

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: '#007aff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5
    },
    textSelectedStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonSelectedStyle: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#007aff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007aff',
        marginLeft: 5,
        marginRight: 5
    }
}

export { Button };
