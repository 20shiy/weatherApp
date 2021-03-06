import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
const axios = require('axios')

export const initialState = {
    loading: false,
    weather: [],
    error: ''
}

const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST'
const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS'
const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE'

const URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_Key = '222ad8e5adb23655ecf262b5293f227c'

const fetchWeatherRequest = () => {
    return {
        type: FETCH_WEATHER_REQUEST
    }
}

const fetchWeatherSuccess = (data) => {
    return {
        type: FETCH_WEATHER_SUCCESS,
        payload: data
    }
}

const fetchWeatherFailure = (error) => {
    return {
        type: FETCH_WEATHER_FAILURE,
        payload: error
    }
}

function reducer(state=initialState, action) {
    switch(action.type) {
        case FETCH_WEATHER_REQUEST: 
            return {
                ...state,
                loading: true
            } 
        case FETCH_WEATHER_SUCCESS:
            return {
                loading: false,
                weather: action.payload,
                error: ''
            }
        case FETCH_WEATHER_FAILURE:
            return {
                loading: false,
                weather: [],
                error: action.payload
            }
            default: 
                return state
    }

}

const fetchWeather = () => {
    return function(dispatch) {
        dispatch(fetchWeatherRequest())
        axios.get(URL, {
            params: {
                q: query,
                units: 'metric',
                APPID: API_Key
            }
        }).then(response => {
            //response.data
            const data = response.data
            dispatch(fetchWeatherSuccess(data))
        })
        .catch(error => {
            //error.message
            dispatch(fetchWeatherFailure(error.message))
        })
    }
}

const store = createStore(reducer, applyMiddleware(thunk))
store.dispatch(fetchWeather)
