import {combineReducers} from 'redux';
import {
    FETCH_PLANTS_SUCCESS, 
    PLANT_SELECTED,
    FORM_RESET,
    FORM_UPDATE
} from '../actions'

const PLANTS_INITIAL_STATE = {
    last_update_date: 0,
    data: {},
    selected: null
}
function plants(state = PLANTS_INITIAL_STATE, action){
    switch(action.type){
        case FETCH_PLANTS_SUCCESS:
            return {...state, last_update_date: Date.now(), data: action.payload}
        case PLANT_SELECTED: 
            return {...state, selected: action.payload}
        default:
            return state
    }
}

const PLANT_FORM_INIT_STATE = {
    title: '',
    description: '',
    sun: null,
    water: null
}

function plantForm(state = PLANT_FORM_INIT_STATE, action){
    switch(action.type){
        case FORM_UPDATE: 
            // console.log(state)
            return {...state, [action.payload.prop]: action.payload.value}
        case FORM_RESET:
            return {...PLANT_FORM_INIT_STATE}
        default:
            return state
    }
}


export default combineReducers({
    plants: plants,
    plantForm: plantForm
})
