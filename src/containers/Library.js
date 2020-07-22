import React, {useEffect} from "react"
import {connect} from "react-redux"
import {Redirect, useParams} from "react-router-dom"
import responder from "../utils/responder"
import Status from "../components/Status/Satatus"

import {
    updateRequest,
    updateSuccess,
    updateFailure,
    manualUpdate,
    resetErrors,
    sortDirectionChange,
    sortFieldChange
} from "../actions/LibraryActions";
import Library from "../components/Library/Library";
import Filter from "../components/Filter/Filter";

const LibraryContainer = props => {

    const {
        resetErrors,
        manualUpdate,
        updateRequest,
        updateSuccess,
        updateFailure,
        sortDirectionChange,
        sortFieldChange,
    } = props

    const {updatingProcess, updatingError, listNeedToUpdate} = props.flags

    const {error, description} = props.messages

    const {books, authors, members} = props

    const {page} = useParams()

    const pages = ['books', 'authors', 'members']
    const pageExist = pages.includes(page)

    const responderKeys = {}
    const listStatus = {}

    if(pageExist) {
        responderKeys.books = {
            type: 'book',
            key: 'books'
        }
        listStatus.books = books.list !== null

        if(page === 'authors' || page === 'books') {
            responderKeys.authors = {
                type: 'author',
                key: 'authors'
            }
            listStatus.authors = authors.list !== null
        }

        if(page === 'members') {
            responderKeys.members = {
                type: 'member',
                key: 'members'
            }
            listStatus.members = members.list !== null
        }
    }

    const isNull = !listStatus[page]
    const isEmpty = !isNull ? props[page].list.length === 0 : true


    async function libraryUpdate() {

        updateRequest()

        let listToLoad = {
            list: [],
            keys: []
        }
        for(let list in listStatus) {
            if(!listStatus[list] || listNeedToUpdate) {
                listToLoad.list.push(list)
                listToLoad.keys.push(responderKeys[list])
            }
        }

        const response = await responder(listToLoad.keys)

        if(!response.error) {
            updateSuccess(listToLoad.list, response.data)
        } else {
            updateFailure(listToLoad.list, response.error, response.description)
        }
    }

    function shouldLibraryUpdate() {
        if(pageExist) {
            if(listNeedToUpdate) {
                return true
            } else {
                if(!updatingProcess && !updatingError) {
                    for(let list in listStatus) {
                        if(!listStatus[list]) return true
                    }
                }
            }
        }
        return false
    }

    useEffect(()=>{
        if(shouldLibraryUpdate()) {
            libraryUpdate()
        }
    })


    useEffect(()=> {
        resetErrors()
    }, [page,  resetErrors])

    if(pageExist) {
        if(updatingProcess) {
            return <Status />
        }

        if(updatingError) {
            return <Status buttonHandler={manualUpdate} status="error" heading={error} description={description}/>
        }

        if(isEmpty) {
            return <Status status="empty" buttonHandler={manualUpdate}/>
        }

        const {activeSortDirection, activeSortField} = props[page].options
        const {sortFields} = props[page]

        return (
            <>
                <Filter
                    manualUpdate={manualUpdate}
                    sortDirectionChange={() => sortDirectionChange(page)}
                    sortFieldChange={(key) => sortFieldChange(page, key)}
                    activeSortDirection={activeSortDirection}
                    sortFields={sortFields}
                    activeSortField={activeSortField}
                />
                <Library page={page} books={books} authors={authors} members={members}/>
            </>
        )
    }

    return <Redirect to="/404"/>
}

const mapStateToProps = state => state.library

const mapDispatchToProps = dispatch => ({
    resetErrors: () => dispatch(resetErrors()),
    manualUpdate: () => dispatch(manualUpdate()),
    updateRequest: () => dispatch(updateRequest()),
    sortDirectionChange: (list) => dispatch(sortDirectionChange(list)),
    sortFieldChange: (list, key) => dispatch(sortFieldChange(list, key)),
    updateSuccess: (lists, data) => dispatch(updateSuccess(lists, data)),
    updateFailure: (page, error, description) => dispatch(updateFailure(page, error, description))
})

export default connect(mapStateToProps, mapDispatchToProps)(LibraryContainer)