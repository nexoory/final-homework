import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import { BrowserRouter as Router} from "react-router-dom"

import store from './store/store'

import App from './components/App/App'
import './utils/iconsLibrary'
import './index.scss'

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);


