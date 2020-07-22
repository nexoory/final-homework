import React from "react";

const ContaiterItem = props => {

    let classes = "container__item"
    classes += props.customClass ? ` ${props.customClass}` : ''
    classes += props.padding ? ` container__item_pad_${props.padding}` : ''
    const heading = props.heading ? <div className="container__heading">{props.heading}</div> : ''

    return (<div className={classes}>
        {heading}
        {props.children}
    </div>)
}

export default ContaiterItem