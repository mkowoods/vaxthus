import React from 'react'
import {StyleSheet} from 'react-native';

export const COLORS = {
    successGreen: "#89c24a",
    white: "white"
}

export default StyleSheet.create({
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
        backgroundColor: '#ddd',
    }
});