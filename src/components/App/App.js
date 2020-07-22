import React, {Suspense} from 'react'
import { Route, Switch, Redirect } from "react-router-dom"

import "./App.scss"
import Container from "../Container/Container";
import Status from "../Status/Satatus";

import Header from "../../containers/Header";
import Library from "../../containers/Library"
import Detail from "../../containers/Detail";

const App = () => (
    <div className="app">
        <div className="app__frame">
            <Container>
                <Header/>
            </Container>
            <Container>
                <Suspense fallback={<Status/>}>
                    <Switch>
                        <Route exact path="/404">
                            <Status status="notFound"/>
                        </Route>
                        <Route exact path="/:page">
                            <Library />
                        </Route>
                        <Route exact path="/:page/:id">
                            <Detail />
                        </Route>
                        <Redirect exact from='/' to='/books'/>
                        <Redirect to='/404'/>
                    </Switch>
                </Suspense>
            </Container>
        </div>
    </div>
)

export default App
