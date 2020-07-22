export const DETAIL_UPDATE_REQUEST = 'DETAIL_UPDATE_REQUEST'
export const DETAIL_UPDATE_SUCCESS = 'DETAIL_UPDATE_SUCCESS'
export const DETAIL_UPDATE_FAILURE = 'DETAIL_UPDATE_FAILURE'

export const DETAIL_MANUAL_UPDATE = 'DETAIL_MANUAL_UPDATE'

export const detailUpdateRequest = () => ({
    type: DETAIL_UPDATE_REQUEST
})

export const detailUpdateSuccess = (lists, data) => ({
    type: DETAIL_UPDATE_SUCCESS,
    payload: {
        lists: lists,
        data: data
    }
})

export const detailUpdateFailure = (lists, error, description) => ({
    type: DETAIL_UPDATE_FAILURE,
    payload: {
        lists: lists,
        error: error,
        description: description
    }
})

export const detailManualUpdate = () => ({
    type: DETAIL_MANUAL_UPDATE
})