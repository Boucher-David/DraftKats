import React from 'react';
import ReactDom from 'react-dom';
import DraftDisplay from './components/categories/draft';
import HomeDisplay from './components/categories/home';
import HistoryDisplay from './components/categories/history';
import ProfileDisplay from './components/categories/profile';
import NavBar from './components/categories/navbar';
import './styles/main.scss';

import { BrowserRouter, Route } from 'react-router-dom';


class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
          <div>
            <NavBar />
            <Route path="/home" component={HomeDisplay} />
            <Route path="/draft" component={DraftDisplay} />
            <Route path="/history" component={HistoryDisplay} />
            <Route path="/profile" component={ProfileDisplay} />
          </div>
        )
    }
}
ReactDom.render((
    <BrowserRouter>
        <Route path="/" component={App}>
        </Route>
    </BrowserRouter>
), document.getElementById('app'));
