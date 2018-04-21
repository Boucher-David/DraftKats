import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
      <div>
        <nav>
        <input type="checkbox" />
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/draft">Draft</Link>
                <ul>
                  <li>Baseball</li>
                  <li>Football</li>
                  <li>Proper Football</li>
                </ul>
          </li>
          <li>
            <Link to="/history">History</Link>
              <ul>
                <li>Baseball</li>
                <li>Football</li>
                <li>Proper Football</li>
              </ul>
            </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>

          <Route exact path="/" component={Home} />
          <Route path="/draft" component={DraftDisplay} />
          <Route path="/history" component={HistoryDisplay} />
          <Route path="/profile" component={ProfileDisplay} />
        </nav>
      </div>
      </Router>
    )
  }
}

module.exports = NavBar;
