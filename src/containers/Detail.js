import React, {useEffect} from "react"
import {connect} from "react-redux"
import {Redirect, useParams} from "react-router-dom";
import Detail from "../components/Detail/Detail";

import {
    detailUpdateRequest,
    detailUpdateSuccess,
    detailUpdateFailure,
    detailManualUpdate
} from "../actions/DetailActions";
import Status from "../components/Status/Satatus";
import responder from "../utils/responder";

const DetailContainer = props => {

    const {id, page} = useParams()
    const {book, author, member} = props
    const {updatingProcess, updatingError, needToUpdate} = props.flags
    const {detailUpdateRequest, detailUpdateSuccess, detailUpdateFailure} = props
    const {error, description} = props.messages
    const idIsCorrect = !isNaN(parseInt(id))

    const pages = ['books', 'members']
    const pageExist = pages.includes(page)

    const responderKeys = {}
    const dataStatus = {}
    let entity = false

    if(pageExist) {
        if(page === 'books') {
            entity = 'book'
            responderKeys.book = {
                type: 'book',
                id: id
            }
            dataStatus.book = book !== null && book.id === parseInt(id)

            if(dataStatus.book) {
                responderKeys.author = {
                    type: 'author',
                    id: book.authorId
                }
                dataStatus.author = author !== null && author.id === book.authorId

                if(book.userId !== null) {
                    responderKeys.member = {
                        type: 'member',
                        id: book.userId
                    }

                    dataStatus.member = member !== null && member.id === book.userId
                }
            }
        }
    }


    async function detailUpdate() {
        detailUpdateRequest()

        let listToLoad = {
            list: [],
            keys: []
        }
        let listToStored = {
            list: [],
            data: {}
        }
        for(let data in dataStatus) {
            let toLoad = false
            if(!needToUpdate) {
                if(!dataStatus[data]) {
                    const store = props[data+'s']
                    if(store.list !== null) {
                        try {
                            const id = responderKeys[data].id
                            const storeData = store.list[store.idToIndex[id]]
                            listToStored.data[data] = storeData
                            listToStored.list.push(data)
                        } catch (e) {
                            toLoad = true
                        }
                    } else {
                        toLoad = true
                    }
                }
            } else {
                toLoad = true
            }

            if(toLoad) {
                listToLoad.keys.push(responderKeys[data])
                listToLoad.list.push(data)
            }
        }

        if(listToStored.list.length !== 0) {
            detailUpdateSuccess(listToStored.list, listToStored.data)
        }

        if(listToLoad.list.length !== 0) {
            const response = await responder(listToLoad.keys)
            if(!response.error) {
                detailUpdateSuccess(listToLoad.list, response.data)
            } else {
                detailUpdateFailure(listToLoad.list, response.error, response.description)
            }
        }
    }

    function shouldBookUpdate() {
        if(idIsCorrect) {
            if(needToUpdate) {
                return true
            } else {
                if(!updatingProcess && !updatingError) {
                    for(let data in dataStatus) {
                        if(!dataStatus[data]) return true
                    }
                }
            }
        }
        return false
    }

    useEffect(()=>{
        if(shouldBookUpdate()) {
            detailUpdate()
        }
    })

    if(idIsCorrect && pageExist) {
        if(updatingProcess) {
            return <Status />
        }

        if(updatingError) {
            return <Status status="error" heading={error} description={description}/>
        }

        if(!dataStatus[entity]) {
            return <Status status='empty'/>
        }

        return (
            <Detail
                page={page}
                entity={entity}
                book={book}
                author={author}
                member={member}
            />
        )
    }

    return <Redirect to="/404"/>
}

const mapStateToProps = state => ({
    ...state.detail,
    books: {
        list: state.library.books.list,
        idToIndex: state.library.books.idToIndex
    },
    authors: {
        list: state.library.authors.list,
        idToIndex: state.library.authors.idToIndex
    },
    members: {
        list: state.library.members.list,
        idToIndex: state.library.members.idToIndex
    }
})

const mapDispatchToProps = dispatch => ({
    detailManualUpdate: () => dispatch(detailManualUpdate()),
    detailUpdateRequest: () => dispatch(detailUpdateRequest()),
    detailUpdateSuccess: (lists, data) => dispatch(detailUpdateSuccess(lists, data)),
    detailUpdateFailure: (lists, error, description) => dispatch(detailUpdateFailure(lists, error, description))
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailContainer)