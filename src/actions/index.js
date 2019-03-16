///will make an api call here to grab the data from the server

import NavigationService from '../NavigationService'
import data from '../data.json';
import firebase from 'firebase';

import {TEST_USER_ID} from '../secret-config';

export const FETCH_PLANTS_PENDING = 'FETCH_PLANTS_PENDING'
export const FETCH_PLANTS_SUCCESS = 'FETCH_PLANTS_SUCCESS'
export const FORM_UPDATE = 'FORM_UPDATE'
export const FORM_RESET = 'FORM_RESET'
export const FORM_SUBMITTED = 'FORM_SUBMITTED'



export const fetchPlants = () => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch({type: FETCH_PLANTS_PENDING})
        console.log(firebase.auth())
        
        const db = firebase.firestore();
        const docRef = db.collection(`/savedplants/${TEST_USER_ID}/plants`) //.doc("3wZt85w30bh409sKHNNr")
        docRef.get()
            .then(function(querySnaphot){
                console.log("Snapshot update", querySnaphot)
                const payload = {};
                querySnaphot.forEach(((doc) => {
                    //Add uid to data object and change data structure to hash table keyed on id
                    const data = doc.data()
                    data.uid = doc.id;
                    payload[doc.id] = data;
                }))
                console.log(payload)
                return dispatch({
                    type: FETCH_PLANTS_SUCCESS,
                    payload
                })
        })
    }
}


export const submitForm = () => {
    return (dispatch, getState) => {
        dispatch({type: FORM_SUBMITTED})
        const {plantForm} = getState();
        const db = firebase.firestore();
        db.collection(`/savedplants/${TEST_USER_ID}/plants`)
            .add({...plantForm, createDate: Date.now()})
            .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                dispatch({type: FORM_RESET})
                NavigationService.navigate('Home')
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
            
    }
}

export const updateForm = ({prop, value}) => {
    return {
        type: FORM_UPDATE,
        payload: {prop, value}
    }
}


export const pictureTaken = ({base64}) => {
    return (dispatch, getState) => {
        const db = firebase.firestore();
        
    }
}