import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MenuItem extends Component {
  static propTypes = { value: PropTypes.string.isRequired };

  render() {
    return <li>{this.props.value}</li>;
  }
}

export default MenuItem;
