import {createStore, combineReducers} from 'redux'

import generalReducer from '../reducers/general'
import libraryReducer from '../reducers/library'
import detailReducer from "../reducers/detail"


const supremeReducer = combineReducers({
    general: generalReducer,
    library: libraryReducer,
    detail: detailReducer
})

export default createStore(supremeReducer)