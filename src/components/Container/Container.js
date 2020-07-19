import React from "react";

import "./Container.scss"

const Container = props => {

    let classes = "container"
    classes += props.customClass ? ` ${props.customClass}` : ''

    if(props.main) {
        return <main className={classes}>{props.children}</main>
    } else {
        return <div className={classes}>{props.children}</div>
    }
}

Container.Item = props => {

    let classes = "container__item"
    classes += props.customClass ? ` ${props.customClass}` : ''
    classes += props.padding ? ` container__item_pad_${props.padding}` : ''

    return <div className={classes}>{props.children}</div>
}

export default Container