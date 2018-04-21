import React from 'react';
import { Link } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/draft">Draft</Link></li>
          <li><Link to="/history">History</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
        </nav>
    )
  }
}

module.exports = NavBar;
