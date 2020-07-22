import React from "react";
import "./List.scss"
import ListItem from "./__item/__item";
import {Link} from "react-router-dom";

const List = props => {

    const {list} = props

    const items = list.map(item => {
        const classes = 'list__item list-item'
        const link = item.link
        if(link) {
            return <Link key={item.key} className={classes+' list__item_link'} to={link}><ListItem {...item}/></Link>
        } else {
            return <div key={item.key} className={classes}><ListItem {...item}/></div>
        }
    })

    return <div className={`list`}>{items}</div>
}

export default List