import {createStore, combineReducers} from 'redux'

import generalReducer from '../reducers/general'
import libraryReducer from '../reducers/library'


const supremeReducer = combineReducers({
    general: generalReducer,
    library: libraryReducer
})

export default createStore(supremeReducer)