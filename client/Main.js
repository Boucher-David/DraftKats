import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';

import App from './components/App.js';
import DraftDisplay from './components/draft';
import HistoryDisplay from './components/history';
import ProfileDisplay from './components/profile';

import reducer from './reducers/index.js';

import './styles/main.scss';

const store = createStore(reducer);

class Main extends React.Component {
    constructor(props) {
        super(props);
        console.log('props: ', props);
    }

    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Route path='/' component={App} >
                        <Route path='/draft' component={DraftDisplay} />
                    </Route>
                </BrowserRouter >
            </Provider>
        )
    }
}

ReactDom.render((
<Main />
), document.getElementById('app'));
