import {
    UPDATE_REQUEST,
    UPDATE_SUCCESS,
    UPDATE_FAILURE,
    MANUAL_UPDATE,
    RESET_ERRORS,
    SORT_DIRECTION_CHANGE
} from "../actions/LibraryActions";

const initialState = {
    books: {
        list: null,
        idToIndex: {},
        options: {
            activeSortField: "id",
            activeSortDirection: "asc",
        }
    },
    authors: {
        list: null,
        idToIndex: {},
        options: {
            activeSortField: "id",
            activeSortDirection: "asc",
        }
    },
    members: {
        list: null,
        idToIndex: {},
        options: {
            activeSortField: "id",
            activeSortDirection: "asc",
        }
    },
    flags: {
        updatingProcess: false,
        updatingError: false,
        listNeedToUpdate: false,
    },
    messages: {
        error: null,
        description: null
    }
}

const getIdToIndex = (data) => {
    const idToIndex = {}
    for(let i = 0; i<data.length; i++) {
        idToIndex[data[i].id] = i
    }
    return idToIndex
}

const sorter = (arr, key) => {
    const result = arr.slice()
    if(key === 'id') {
        result.sort((a, b) => {
            return a.id - b.id;
        })
    } else {
        result.sort((a, b) => {
            const lcA=a[key].toLowerCase()
            const lcB=a[key].toLowerCase()
                if (lcA < lcB) return -1
                if (lcA > lcB) return 1
                return 0
            }
        )
    }
    return result
}

const reverser = (arr) => {
    return arr.slice().reverse()
}

const libraryReducer = (state = initialState, action) => {
    switch(action.type) {
        case UPDATE_REQUEST:
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
        case UPDATE_SUCCESS:
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

                const sorted = sorter(action.payload.data[key], 'id')

                success[key] = {
                    ...state[key],
                    list: sorted,
                    idToIndex: getIdToIndex(sorted),
                    options: {
                        activeSortField: "id",
                        activeSortDirection: "asc",
                    }
                }
            }

            return success
        case UPDATE_FAILURE:
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
                failure[key] = {
                    list: null,
                    idToIndex: {}
                }
            }
            return failure
        case MANUAL_UPDATE:
            return {
                ...state,
                flags: {
                    ...state.flags,
                    listNeedToUpdate: true
                }
            }
        case RESET_ERRORS:
            return {
                ...state,
                flags: {
                    ...state.flags,
                    updatingError: false
                },
                messages: {
                    error: null,
                    description: null
                }
            }
        case SORT_DIRECTION_CHANGE:

            const list = action.payload.list
            const newDirection = state[list].options.activeSortDirection === 'asc' ? 'desc' : 'asc'
            const reversed = reverser(state[list].list)

            return {
                ...state,
                [list]: {
                    ...state[list],
                    list: reversed,
                    idToIndex: getIdToIndex(reversed),
                    options: {
                        ...state[list].options,
                        activeSortDirection: newDirection
                    }
                }
            }
        default:
            return state
    }
}

export default libraryReducer