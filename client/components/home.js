import React from 'react';
import PositionList from './PositionList';
import Dropdown_DK from './Dropdown';

class HomeDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleSport = (e) => {
    this.props.toggleSport(e)
  };

  toggleNumberofTeams = (e) => {
    this.props.toggleNumberTeams(e)
    this.props.toggleDraftPosition(e);
  };

  toggleDraftPosition = (e) => {
    this.props.toggleDraftPosition(e)
  };

  getRandomDraftPosition = () => {
    this.props.toggleDraftPosition(Math.floor(Math.random() * (this.props.setup.numTeams)) + 1);
  };

  render() {
    return (
      <div className="component">
        <div className="setup-draft">
        <Dropdown_DK 
          title="Sport:"
          options={this.props.setup.sports}
          clickHandler={this.toggleSport}
          initialValue={this.props.setup.selected}
        />

        <Dropdown_DK 
          title="# of Teams:"
          options={[1,2,3,4,5,6,7,8,9,10]}
          clickHandler={this.toggleNumberofTeams}
          initialValue={this.props.setup.numTeams}
        />

        <Dropdown_DK 
          title="Draft Position:"
          options={Array.apply(null, new Array((Number(this.props.setup.numTeams)))).map(function(_,i) { return i + 1; })}
          clickHandler={this.toggleDraftPosition}
          initialValue={this.props.setup.draftPosition}
        />

         {(this.props.setup.numTeams) ? <button onClick={this.getRandomDraftPosition}>Randomize</button> : null}
        </div>
        <div className="setup-positions">
          <PositionList updatePosition={this.props.positionUpdate} positions={this.props.setup.positions}/>
        </div>
      </div>
    )
  }
}

module.exports = HomeDisplay;
