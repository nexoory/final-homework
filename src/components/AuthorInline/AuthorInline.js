import React from "react"
import "./AuthorInline.scss"

const AuthorInline = props => {

    const classes = "author-inline "+(props.customClass ? props.customClass : "")
    const {firstName, lastName, info, bookTitles, birthday} = props
    const birthdayDate = new Date(birthday)

    return (
        <div className={classes}>
            <h3 className="author-inline__name">{firstName} {lastName}</h3>
            <div className="author-inline__birthday">{birthdayDate.toLocaleDateString()}</div>
            <div className="author-inline__info">{info}</div>
            <div className="author-inline__books">Books: {bookTitles.join(' | ')}</div>
        </div>
    )
}

export default AuthorInline