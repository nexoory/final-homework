import React from "react";
import "./List.scss"

const List = props => {

    const Template = props.template
    const keyField = props.keyField
    const list = props.list

    const listClass = props.listClass ? props.listClass : ''
    const elemClass = props.elemClass ? `list__item ${props.elemClass}` : 'list__item'

    const elements = list.map(elem => {
        return (
            <Template key={elem[keyField]} customClass={elemClass} {...elem}/>
        )
    })

    return <div className={`list ${listClass}`}>{elements}</div>
}

export default List