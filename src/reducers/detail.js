import {
    DETAIL_UPDATE_REQUEST,
    DETAIL_UPDATE_SUCCESS,
    DETAIL_UPDATE_FAILURE,
    DETAIL_MANUAL_UPDATE,
} from "../actions/DetailActions";

const initialState = {
    book: null,
    author: null,
    member: null,
    flags: {
        updatingProcess: false,
        updatingError: false,
        needToUpdate: false,
    },
    messages: {
        error: null,
        description: null
    }
}

const detailReducer = (state = initialState, action) => {
    switch (action.type) {
        case DETAIL_UPDATE_REQUEST:
            return {
                ...state,
                flags: {
                    ...state.flags,
                    updatingProcess: true,
                    updatingError: false,
                    needToUpdate: false,
                },
                messages: {
                    ...state.messages,
                    error: null,
                    description: null
                }
            }
        case DETAIL_UPDATE_SUCCESS:
            const success = {
                ...state,
                flags: {
                    updatingProcess: false,
                    updatingError: false,
                    listNeedToUpdate: false
                },
                messages: {
                    error: null,
                    errorDescription: null
                }
            }

            for(let key of action.payload.lists) {
                success[key] = action.payload.data[key]
            }

            return success
        case DETAIL_UPDATE_FAILURE:
            const failure = {
                ...state,
                flags: {
                    updatingProcess: false,
                    updatingError: true,
                    listNeedToUpdate: false
                },
                messages: {
                    error: action.payload.error,
                    description: action.payload.description
                }
            }

            for(let key of action.payload.lists) {
                failure[key] = null
            }
            return failure
        case DETAIL_MANUAL_UPDATE:
            return {
                ...state,
                flags: {
                    ...state.flags,
                    needToUpdate: true,
                },
            }
        default:
            return state
    }
}

export default detailReducer