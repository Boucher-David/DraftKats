import React from 'react';
import Dropdown from 'react-dropdown';

class HomeDisplay extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }


  toggleSport = (e) => {this.props.toggleSport(e.value)};


  render() {
    return (
      <div className="component">
        <h2>This is from the Home Component</h2>
        <Dropdown options={this.props.sportPD} onChange={this.toggleSport} />
      </div>
    )
  }
}

module.exports = HomeDisplay;
