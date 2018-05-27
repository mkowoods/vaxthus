///will make an api call here to grab the data from the server

import NavigationService from '../NavigationService'

import data from '../data.json';

export const FETCH_PLANTS_SUCCESS = 'FETCH_PLANTS_SUCCESS'
export const PLANT_SELECTED = 'PLANT_SELECTED'
export const FORM_UPDATE = 'FORM_UPDATE'
export const FORM_RESET = 'FORM_RESET'

export const fetchPlants= () => {
    const payload = {};
    data.forEach(r => {
        payload[r.uid] = r;
    });

    return {
        type: FETCH_PLANTS_SUCCESS,
        payload
    }
}

export const updateForm = ({prop, value}) => {
    return {
        type: FORM_UPDATE,
        payload: {prop, value}
    }
}

export const submitForm = () => {
    return (dispatch, getState) => {
        const {plantForm} = getState();
        console.log("Form Submitted", plantForm)
        dispatch({type: FORM_RESET})
        NavigationService.navigate('Home')

    }
}