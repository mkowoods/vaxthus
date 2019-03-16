import {OWM_API_KEY} from '../secret-config'

const ROOT_URL = `https://api.openweathermap.org/data/2.5/forecast?appid=${OWM_API_KEY}`;

export const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_ERROR = 'FETCH_WEATHER_ERROR';


export function fetchWeatherRequest(){
    return {
        type: FETCH_WEATHER_REQUEST
    }
}

export function fetchWeatherSuccess(payload){
    console.log('fetchWeatherSuccess', payload);
    return {
        type: FETCH_WEATHER_SUCCESS,
        payload
    }
}


export function fetchWeatherError(err){
    console.error("ERROR: actions/fetchWeatherError", err);
    return {
        type: FETCH_WEATHER_ERROR
    }
}

export function fetchWeather(city, country_code){
    const url = `${ROOT_URL}&q=${city},${country_code}`;
    console.log(url)
    return dispatch => {
        dispatch(fetchWeatherRequest())
        const request = fetch(url);
        request.then(resp =>
            resp.json().then(json => {
                if(resp.ok){
                    dispatch(fetchWeatherSuccess(json))
                } else {
                    dispatch(fetchWeatherError(json))
                }
            })
        )
    }
}
