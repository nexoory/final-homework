export const UPDATE_REQUEST = 'UPDATE_REQUEST'
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS'
export const UPDATE_FAILURE = 'UPDATE_FAILURE'
export const MANUAL_UPDATE = 'MANUAL_UPDATE'
export const RESET_ERRORS = 'RESET_ERRORS'

export const SORT_DIRECTION_CHANGE = 'SORT_DIRECTION_CHANGE'
export const SORT_FIELD_CHANGE = 'SORT_FIELD_CHANGE'

export const updateRequest = () => ({
    type: UPDATE_REQUEST,
})

export const updateSuccess = (lists, data) => ({
    type: UPDATE_SUCCESS,
    payload: {
        lists: lists,
        data: data
    }
})

export const updateFailure = (lists, error, description) => ({
    type: UPDATE_FAILURE,
    payload: {
        lists: lists,
        error: error,
        description: description
    }
})

export const manualUpdate = () => ({
    type: MANUAL_UPDATE,
})

export const resetErrors = () => ({
    type: RESET_ERRORS
})

export const sortDirectionChange = (list) => ({
    type: SORT_DIRECTION_CHANGE,
    payload: {
        list:list
    }
})

export const sortFieldChange = (list, key) => ({
    type: SORT_FIELD_CHANGE,
    payload: {
        list:list,
        key: key
    }
})