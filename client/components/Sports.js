import React from 'react';
import createClass from 'create-react-class';
import PropTypes from 'prop-types';
import Select from 'react-select';

const SPORTS = require('../components/sports');

var SportsField = createClass({
  displayName: 'SportsField',
  PropTypes: {
    label: PropTypes.string,
    searchable: PropTypes.bool,
  },
  getDefaultProps () {
    return{
      label: 'Sports:',
      searchable: true,
    };
  },
  getInitialSport () {
    return {
      disabled: false,
      searchable: this.props.searchable,
      selectValue: 'Football',
      clearable: true,
    }
  }
})
