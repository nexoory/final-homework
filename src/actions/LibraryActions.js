export const UPDATE_LIBRARY_REQUEST = 'UPDATE_LIBRARY_REQUEST'
export const UPDATE_LIBRARY_SUCCESS = 'UPDATE_LIBRARY_SUCCESS'
export const UPDATE_LIBRARY_FAILURE = 'UPDATE_LIBRARY_FAILURE'

export const MANUAL_UPDATE = 'MANUAL_UPDATE'

export const updateLibraryRequest = () => {
    return {
        type: UPDATE_LIBRARY_REQUEST
    }
}

export const updateLibrarySuccess = (books) => {
    return {
        type: UPDATE_LIBRARY_SUCCESS,
        payload: {
            books: books
        }
    }
}

export const updateLibraryFailure = (error, description) => {
    return {
        type: UPDATE_LIBRARY_FAILURE,
        payload: {
            error: error,
            description: description
        }
    }
}

export const manualUpdate = () => {
    return {
        type: MANUAL_UPDATE
    }
}