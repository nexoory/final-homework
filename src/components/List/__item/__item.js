import React from "react"
import "./__item.scss"

const ListItem = props => {

    const {title, subTitle, info, subInfo, status} = props

    return (
        <>
            <h3 className="list-item__title">{title}</h3>
            <div className="list-item__sub-title">{subTitle}</div>
            <div className="list-item__info">{info}</div>
            <div className="list-item__sub-info">{subInfo}</div>
            <div className="list-item__status">{status}</div>
        </>
    )
}

export default ListItem