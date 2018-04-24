import React from 'react';


class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleComponent = (e) => {
    this.props.toggle(e.target.id);
  }


  render() {
    return (
        <nav>
        <ul onClick={this.toggleComponent}>
          <li id="home">Home</li>
          <li id="draft">Draft</li>
          <li id="profile">Profile</li>
          <li id="history">History</li>
        </ul>
        </nav>
    )
  }
}

module.exports = NavBar;
