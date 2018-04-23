import React from 'react';

class DraftDisplay extends React.Component {
  constructor(props) {
    super(props);
    console.log('props in draft: ', props);
  }

  render() {
    return (
      <div>
        <h2>This is from the Draft Component</h2>
      </div>
    )
  }
}

module.exports = DraftDisplay;
