import {
    UPDATE_LIBRARY_REQUEST,
    UPDATE_LIBRARY_SUCCESS,
    UPDATE_LIBRARY_FAILURE,
    MANUAL_UPDATE
} from "../actions/LibraryActions";

const initialState = {
    books: null,
    idToIndex: {},
    flags: {
        updatingProcess: true,
        updatingError: false,
        listNeedToUpdate: false,
    },
    messages: {
        error: null,
        description: null
    }
}

const libraryReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_LIBRARY_REQUEST:
            return {
                ...state,
                flags: {
                    updatingProcess: true,
                    updatingError: false,
                    listNeedToUpdate: false
                },
                messages: {
                    error: null,
                    description: null
                }
            }
        case UPDATE_LIBRARY_SUCCESS:
            const books = action.payload.books
            const idToIndex = {}
            for(let i = 0; i<books.length; i++) {
                idToIndex[books[i].id] = i
            }
            return {
                ...state,
                books: books,
                idToIndex: idToIndex,
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
        case UPDATE_LIBRARY_FAILURE:
            return {
                ...state,
                books: null,
                idToIndex: {},
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
        case MANUAL_UPDATE:
            return {
                ...state,
                flags: {
                    ...state.flags,
                    listNeedToUpdate: true
                }
            }
        default:
            return state
    }
}

export default libraryReducer