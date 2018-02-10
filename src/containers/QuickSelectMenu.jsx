import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '../components/MenuItem';

class QuickSelectMenu extends Component {
  static propTypes = {
    menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMenuItemSelect: PropTypes.func.isRequired
  };

  render() {
    const { menuItems, onMenuItemSelect } = this.props;

    const items = menuItems.map(item => (
      <MenuItem value={item.value} onSelect={onMenuItemSelect} />
    ));

    return <ul>{items}</ul>;
  }
}

export default QuickSelectMenu;
