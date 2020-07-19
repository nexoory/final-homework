import React, {lazy, Suspense} from 'react'
import { Route, Switch, Redirect } from "react-router-dom"

import "./App.scss"
import Container from "../Container/Container";
import Header from "../../containers/Header";
import Status from "../Status/Satatus";

const Library = lazy(() => import("../../containers/Library"))

const App = () => (
    <div className="app">
        <div className="app__frame">
            <Container>
                <Header/>
            </Container>
            <Container main={true}>
                <Suspense fallback={<Status/>}>
                    <Switch>
                        <Route exact path="/library" component={Library}/>
                        <Redirect exact from='/' to='/library'/>
                        <Route>
                            <Status status="notFound"/>
                        </Route>
                    </Switch>
                </Suspense>
            </Container>
        </div>
    </div>
)

export default App
