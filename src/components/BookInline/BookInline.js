import React from "react"
import "./BookInline.scss"

const BookInline = props => {

    const classes = "book-inline "+(props.customClass ? props.customClass : "")
    const {title, info, author, userId} = props

    return (
        <div className={classes}>
            <h3 className="book-inline__title">{title}</h3>
            <div className="book-inline__author">{author}</div>
            <div className="book-inline__info">{info}</div>
            <div className="book-inline__status">{userId === null ? "Available" : "Not available"}</div>
        </div>
    )
}

export default BookInline