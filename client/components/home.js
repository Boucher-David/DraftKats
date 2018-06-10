import React from 'react';
import Dropdown from 'react-dropdown';
import PositionList from './PositionList';
import Dropdown_DK from './Dropdown';

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

  test = (w) => {
    console.log('log from home', w);
  }

  render() {
    return (
      <div className="component">
        <div className="setup-draft">
        <Dropdown_DK 
          title="Testing title"
          options={[1,2,3]}
          clickHandler={this.test}
          initialValue={5}
        />

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
