import React from "react"
import "./MemberInline.scss"

const MemberInline = props => {

    const classes = "member-inline "+(props.customClass ? props.customClass : "")
    const {firstName, lastName, phone, email, bookTitles} = props

    return (
        <div className={classes}>
            <h3 className="member-inline__name">{firstName} {lastName}</h3>
            <div className="member-inline__contacts">{email} | {phone}</div>
            <div className="member-inline__books">Books: {bookTitles.length ? bookTitles.join(' | ') : "none"}</div>
        </div>
    )
}

export default MemberInline