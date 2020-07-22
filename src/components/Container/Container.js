import React from "react";
import ContaiterItem from "./__item/__item";
import "./Container.scss"


const Container = props => {

    let classes = "container"
    classes += props.customClass ? ` ${props.customClass}` : ''

    return <div className={classes}>{props.children}</div>
}

Container.Item = ContaiterItem

export default Container