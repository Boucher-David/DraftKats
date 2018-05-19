import React from 'react';
import Dropdown from 'react-dropdown';

class HomeDisplay extends React.Component {
  constructor(props) {
    super(props);
  }


  toggleSport = (e) => {
    this.props.toggleSport(e.value)
  };

  // To Do:

  // Need to connect the numberTeams action to the dropdown, and pass the selected number into state. Same way as the first one. Another for draft position (with the option to randomize). 
  // Selecting a sport should render a bunch of dropdowns for each position in the sport. This should be dynamic. 

  render() {
    return (
      <div className="component">
        <h2>This is from the Home Component</h2>
        <Dropdown options={this.props.setup.sports} onChange={this.toggleSport} value={this.props.setup.selected} placeholder="Select a Sport"/>
        <Dropdown options={[1,2,3,4,5,6,7,8,9,10]} placeholder="League Teams"/> 
      </div>
    )
  }
}

module.exports = HomeDisplay;
