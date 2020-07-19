import {createStore, combineReducers} from 'redux'

import generalReducer from '../reducers/general'
import libraryReducer from '../reducers/library'
import authorsReducer from '../reducers/authors'
import membersReducer from '../reducers/members'


const supremeReducer = combineReducers({
    general: generalReducer,
    library: libraryReducer,
    authors: authorsReducer,
    members: membersReducer
})

export default createStore(supremeReducer)