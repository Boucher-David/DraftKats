import React from 'react';
import Dropdown from 'react-dropdown';
import PositionList from './PositionList';

class HomeDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleSport = (e) => {
    this.props.toggleSport(e.value)
  };

  toggleNumberofTeams = (e) => {
    this.props.toggleNumberTeams(e.value)
  };

  toggleDraftPosition = (e) => {
    this.props.toggleDraftPosition(e.value)
  };

  getRandomDraftPosition = () => {
    this.props.toggleDraftPosition(Math.floor(Math.random() * (this.props.setup.numTeams)) + 1);
  };

  // To Do:

  // Need to connect the numberTeams action to the dropdown, and pass the selected number into state. Same way as the first one. Another for draft position (with the option to randomize).
  // Selecting a sport should render a bunch of dropdowns for each position in the sport. This should be dynamic.

  render() {
    return (
      <div className="component">
        <div className="setup-draft">
        <Dropdown 
          options={this.props.setup.sports} 
          onChange={this.toggleSport} 
          value={this.props.setup.selected} 
          placeholder="Select a Sport"
        />
        <Dropdown 
          options={[1,2,3,4,5,6,7,8,9,10]} 
          onChange={this.toggleNumberofTeams} 
          value={this.props.setup.numTeams} 
          placeholder="League Teams"
        />
        <Dropdown
          options={Array.apply(null, new Array((Number(this.props.setup.numTeams)))).map(function(_,i) { return i + 1; })} 
          onChange={this.toggleDraftPosition}
          value={this.props.setup.draftPosition} 
          placeholder="Draft Position"
         />
         {(this.props.setup.numTeams) ? <button onClick={this.toggleDraftPosition}>Randomize</button> : null}
        </div>
        <div className="setup-positions">
          <PositionList updatePosition={this.props.positionUpdate} positions={this.props.setup.positions}/>
        </div>
      </div>
    )
  }
}

module.exports = HomeDisplay;
