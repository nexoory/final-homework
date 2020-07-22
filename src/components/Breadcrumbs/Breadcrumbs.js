import React from "react"
import "./Breadcrumbs.scss"
import {Link} from "react-router-dom";
import Container from "../Container/Container";

const Breadcrumbs = props => {
    return(
        <Container.Item>
            <div className='breadcrumbs'>
                <Link className='breadcrumbs__link' to={`/${props.page}`}>
                    {props.page} /
                </Link>
                <span className='breadcrumbs__title'> {props.title}</span>
            </div>
        </Container.Item>
    )
}

export default Breadcrumbs