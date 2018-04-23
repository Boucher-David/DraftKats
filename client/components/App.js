import React from 'react';
import ReactDom from 'react-dom';
import {connect} from 'react-redux';
import { BrowserRouter, Route , withRouter} from 'react-router-dom';


import NavBar from './navbar';

class App extends React.Component {
  constructor(props) {
      super(props);
      console.log('props: ', props);
  }
  render() {
      return (
          <div>
            <NavBar />
          </div>
      )
  }
}

const mapStateToProps = (state) => ({
  state
});

const mapDispatchToProps = (dispatch, getState) => ({
  pasteActionsHere: () => {}
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
