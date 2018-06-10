import React from 'react';
import Dropdown from 'react-dropdown';
import Dropdown_DK from './Dropdown';

class PositionList extends React.Component {
  constructor(props) {
    super(props);
    
  }

  positionChanged(a, b) {
    this.props.updatePosition({'number': a, 'position': b});
  }

  render() {
    return (this.props.positions.length === 0) ? null : <div>
      {Object.keys(this.props.positions[0]).map((position, key) => 
      <Dropdown_DK 
        id={position}
        key={key}
        title={`${position}: ` }
        options={Array.apply(null, new Array((Number(this.props.positions[0][position][1])))).map(function(_,i) { return i + 1; })}
        clickHandler={(e) => this.positionChanged(e, position)}
        initialValue={this.props.positions[0][position][0]}
      />
      )
      }
    </div>
  }

}

module.exports = PositionList;