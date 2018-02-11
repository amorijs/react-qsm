import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MenuItem extends Component {
  static propTypes = { value: PropTypes.string.isRequired };

  render() {
    const { className, value } = this.props;
    return <li className={`qsm-menu-item ${className}`}>{value}</li>;
  }
}

export default MenuItem;
