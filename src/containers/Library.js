import React from "react"
import {connect} from "react-redux"
import Library from "../components/Library/Library"
import Status from "../components/Status/Satatus"
import responder from "../utils/responder";

import {
    updateLibraryRequest,
    updateLibrarySuccess,
    updateLibraryFailure,
    manualUpdate
} from "../actions/LibraryActions";

class LibraryContainer extends React.Component{

    componentDidMount(){
        if(this.props.books === null) {
            this.libraryUpdate()
        }
    }

    componentDidUpdate() {
        if(this.props.flags.listNeedToUpdate){
            this.libraryUpdate()
        }
    }

    async libraryUpdate() {
        this.props.updateLibraryRequest()

        const response = await responder('library')

        if(!response.error) {
            this.props.updateLibrarySuccess(response.data)
        } else {
            this.props.updateLibraryFailure(response.error, response.description)
        }
    }

    getRender(){
        const {updatingProcess, updatingError} = this.props.flags
        const {error, description} = this.props.messages
        const books = this.props.books
        const isNull = books === null
        const isEmpty = !isNull ? books.length === 0 : true
        const update = this.props.manualUpdate

        if(updatingProcess) {return <Status />}
        if(updatingError) {
            return <Status status="error" buttonHandler={update} heading={error} description={description}/>
        }
        if(isEmpty) {
            return <Status status="empty" buttonHandler={update}/>
        }

        return <Library books={books} manualUpdate={update}/>
    }

    render() {
        return this.getRender()
    }
}

const mapStateToProps = state => state.library

const mapDispatchToProps = dispatch => ({
    manualUpdate: () => dispatch(manualUpdate()),
    updateLibraryRequest: () => dispatch(updateLibraryRequest()),
    updateLibrarySuccess: books => dispatch(updateLibrarySuccess(books)),
    updateLibraryFailure: (error, description) => dispatch(updateLibraryFailure(error, description))
})

export default connect(mapStateToProps, mapDispatchToProps)(LibraryContainer)