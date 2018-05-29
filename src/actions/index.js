///will make an api call here to grab the data from the server

import NavigationService from '../NavigationService'
import data from '../data.json';
import firebase from 'firebase';

import {TEST_USER_ID} from '../secret-config';

export const FETCH_PLANTS_PENDING = 'FETCH_PLANTS_PENDING'
export const FETCH_PLANTS_SUCCESS = 'FETCH_PLANTS_SUCCESS'
export const FORM_UPDATE = 'FORM_UPDATE'
export const FORM_RESET = 'FORM_RESET'

// firebase.auth().onAuthStateChanged(user => {
//     console.log("Current USer", user)
// })




export const fetchPlants = () => {

    
    return (dispatch, getState) => {


        const state = getState();

        if(state.plants.loading || ((Date.now() - state.plants.last_update_date) < (60 * 60 * 1000))){
            console.log('Do Nothing Called')
            return {type: 'DONOTHING'}
        }
            
        dispatch({type: FETCH_PLANTS_PENDING})

        const db = firebase.firestore();
        db.collection(`/savedplants/${TEST_USER_ID}/plants`)
            .orderBy("title")
            .onSnapshot(function(querySnaphot){
                console.log("Snapshot update")
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
        console.log("Form Submitted")
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

// export const submitForm = () => {
//     return (dispatch, getState) => {
//         const {plantForm} = getState();
//         console.log("Form Submitted", plantForm)
//         dispatch({type: FORM_RESET})
//         NavigationService.navigate('Home')

//     }
// }