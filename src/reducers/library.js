import {
    UPDATE_REQUEST,
    UPDATE_SUCCESS,
    UPDATE_FAILURE,
    MANUAL_UPDATE,
    RESET_ERRORS,
    SORT_DIRECTION_CHANGE,
    SORT_FIELD_CHANGE
} from "../actions/LibraryActions";

import {getIdToIndex, reverser, sorter} from "../utils/helpers";

const initialState = {
    books: {
        list: null,
        idToIndex: {},
        sortFields: {
            id: {
                title: "Default",
                type: "int"
            },
            title: {
                title: "Title",
                type: "string"
            }
        },
        options: {
            activeSortField: "id",
            activeSortDirection: "asc",
        }
    },
    authors: {
        list: null,
        idToIndex: {},
        sortFields: {
            id: {
                title: "Default",
                type: "int"
            },
            firstName: {
                title: "First Name",
                type: "string"
            },
            lastName: {
                title: "Last Name",
                type: "string"
            },
            birthday: {
                title: "Birthday",
                type: "date"
            }
        },
        options: {
            activeSortField: "id",
            activeSortDirection: "asc",
        }
    },
    members: {
        list: null,
        idToIndex: {},
        sortFields: {
            id: {
                title: "Default",
                type: "int"
            },
            firstName: {
                title: "First Name",
                type: "string"
            },
            lastName: {
                title: "Last Name",
                type: "string"
            }
        },
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

                const sorted = sorter(action.payload.data[key], 'id', 'int')

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

            const dcList = action.payload.list
            const newDirection = state[dcList].options.activeSortDirection === 'asc' ? 'desc' : 'asc'
            const dcReversed = reverser(state[dcList].list)

            return {
                ...state,
                [dcList]: {
                    ...state[dcList],
                    list: dcReversed,
                    idToIndex: getIdToIndex(dcReversed),
                    options: {
                        ...state[dcList].options,
                        activeSortDirection: newDirection
                    }
                }
            }
        case SORT_FIELD_CHANGE:
            const dfList = action.payload.list
            const newField = action.payload.key
            const fieldType = state[dfList].sortFields[newField].type
            const dfSorted = sorter(state[dfList].list, newField, fieldType)

            return {
                ...state,
                [dfList]: {
                    ...state[dfList],
                    list: dfSorted,
                    idToIndex: getIdToIndex(dfSorted),
                    options: {
                        ...state[dfList].options,
                        activeSortField: newField,
                        activeSortDirection: 'asc'
                    }
                }
            }
        default:
            return state
    }
}

export default libraryReducer