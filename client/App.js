import React from 'react';
import ReactDom from 'react-dom';
import DraftDisplay from './components/categories/draft';
import HomeDisplay from './components/categories/home';
import HistoryDisplay from './components/categories/history';
import ProfileDisplay from './components/categories/profile';
import './styles/main.scss';

class App extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
          <div>
            <DraftDisplay />
            <HomeDisplay />
            <HistoryDisplay />
            <ProfileDisplay />
          </div>
        )
    }
}
ReactDom.render(<App />, document.getElementById('app'));
