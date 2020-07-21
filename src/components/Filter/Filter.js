import React from "react";
import Container from "../Container/Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Filter.scss"

const Filter = props => {

    const {manualUpdate, sortDirectionChange} = props
    const {activeSortDirection} = props

    return(
        <Container.Item>
            <div className="filter">
                <div className="filter__options">Filters</div>
                <div className="filter__tools">
                    <div onClick={sortDirectionChange} className="filter__tool">
                        <FontAwesomeIcon icon={activeSortDirection === 'asc' ? "sort-alpha-down" : "sort-alpha-down-alt"}/>
                    </div>
                    <div onClick={manualUpdate} className="filter__tool">
                        <FontAwesomeIcon icon="sync-alt"/>
                    </div>
                </div>
            </div>
        </Container.Item>
    )
}

export default Filter