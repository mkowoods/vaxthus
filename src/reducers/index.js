import {combineReducers} from 'redux';
import {
    FETCH_PLANTS_PENDING,
    FETCH_PLANTS_SUCCESS, 
    FORM_RESET,
    FORM_UPDATE,
    FORM_SUBMITTED
} from '../actions'


import {
    FETCH_WEATHER_REQUEST,
    FETCH_WEATHER_SUCCESS,
    FETCH_WEATHER_ERROR
} from '../actions/forecast'


const PLANTS_INITIAL_STATE = {
    last_update_date: 0,
    loading: false,
    data: {},
    selected: null
}
function plants(state = PLANTS_INITIAL_STATE, action){
    switch(action.type){
        case FETCH_PLANTS_PENDING:
            return {...state, loading: true}
        case FETCH_PLANTS_SUCCESS:
            return {...state, last_update_date: Date.now(), data: action.payload, loading: false}
        default:
            return state
    }
}

const PLANT_FORM_INIT_STATE = {
    title: '',
    description: '',
    sun: null,
    water: null,
    loading: false
}

function plantForm(state = PLANT_FORM_INIT_STATE, action){
    switch(action.type){
        case FORM_UPDATE: 
            return {...state, [action.payload.prop]: action.payload.value}
        case FORM_RESET:
            return {...PLANT_FORM_INIT_STATE}
        case FORM_SUBMITTED:
            return {...state, loading: true}
        default:
            return state
    }
}

function forecast(state = {}, action){
    console.log('Action:', action)
    switch(action.type){
        case FETCH_WEATHER_SUCCESS:
            console.log(action.payload)
            return action.payload[0]
    }
    return state;
}

export default combineReducers({
    plants,
    plantForm,
    forecast
})
