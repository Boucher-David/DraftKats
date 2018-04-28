import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './components/App.js';

import reducer from './reducers/index.js';

import './styles/main.scss';

const store = createStore(reducer);

class Main extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        )
    }
}

ReactDom.render((
<Main />
), document.getElementById('app'));
