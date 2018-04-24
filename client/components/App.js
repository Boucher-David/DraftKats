import React from 'react';
import ReactDom from 'react-dom';
import {connect} from 'react-redux';

import DraftDisplay from './draft';
import HistoryDisplay from './history';
import ProfileDisplay from './profile';
import HomeDisplay from './home.js';
import NavBar from './navbar';

import {toggle} from '../actions/toggle';

class App extends React.Component {
  constructor(props) {
      super(props);
  }
  render() {
      return (
          <div>
            <NavBar toggle={this.props.toggleDisplay}/>  
            {(this.props.state.display.home) ? <HomeDisplay /> : null}
            {(this.props.state.display.profile) ? <ProfileDisplay /> : null}
            {(this.props.state.display.history) ? <HistoryDisplay /> : null}
            {(this.props.state.display.draft) ? <DraftDisplay /> : null}
          </div>
      )
  }
}

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch, getState) => ({
  toggleDisplay: (component) => dispatch(toggle(component))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
