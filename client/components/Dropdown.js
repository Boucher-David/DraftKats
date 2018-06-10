import React from 'react';

class Dropdown_DK extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'selected': this.props.initialValue
    }
  }

  dropdownClick = (a) => {
    this.props.clickHandler(a.target.id);
    this.setState({
      selected: a.target.id
    })
  }

  render() {
    return (
      <div className="dropdown">
        <button className="dropbtn">{this.props.title}: {this.state.selected}</button>
        <div className="dropdown-content">
          {(this.props.options.length === 0) ? null : Object.keys(this.props.options).map((data, key) => <div id={this.props.options[key]} onClick={this.dropdownClick} key={key}>{this.props.options[key]}</div>)}
        </div>
    </div>
    )
  }
}

export default Dropdown_DK;