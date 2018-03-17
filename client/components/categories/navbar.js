import React from 'react';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav>
        <input type="checkbox" />
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Draft</a>
            <ul>
              <li><a href="#">Baseball</a></li>
              <li><a href="#">Football</a></li>
              <li><a href="#">Proper Football</a></li>
            </ul>
          </li>
          <li><a href="#">History</a>
            <ul>
              <li><a href="#">Baseball</a></li>
              <li><a href="#">Football</a></li>
              <li><a href="#">Proper Football</a></li>
            </ul>
          </li>
          <li><a href="#">Profile</a></li>
        </ul>
        </nav>
      </div>
    )
  }
}

module.exports = NavBar;
