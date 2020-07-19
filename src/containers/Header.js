import React from "react"
import {connect} from "react-redux"
import Header from "../components/Header/Header";

const HeaderContainer = props => <Header links={props.links}/>

const mapStateToProps = (state) => ({links: state.general.mainMenuLinks})

export default connect(mapStateToProps)(HeaderContainer)