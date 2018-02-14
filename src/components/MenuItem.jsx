import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MenuItem extends Component {
  static propTypes = { label: PropTypes.string.isRequired, className: PropTypes.string };

  render() {
    const { className, label, children } = this.props;
    return (
      <li className={`qsm-menu-item ${className}`}>
        {label}
        {children}
      </li>
    );
  }
}

export default MenuItem;
