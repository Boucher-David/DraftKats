import React from 'react';

class HomeDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="component">
        <h2>This is from the Home Component</h2>
      </div>
    )
  }
}

module.exports = HomeDisplay;
