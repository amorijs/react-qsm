import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem.jsx';

class MenuSection extends Component {
  static propTypes = {
    name: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    activeIndex: PropTypes.number
  };

  render() {
    const { items, activeIndex, label } = this.props;

    const menuItems = items.map((item, i) => (
      <MenuItem key={item.label} className={i === activeIndex ? 'active' : null} label={item.label}>
        {i === 0 && <h2 className="qsm-menu-section-label">{label}</h2>}
      </MenuItem>
    ));

    return (
      <div className="qsm-menu-section">
        <ul>{menuItems}</ul>
      </div>
    );
  }
}

export default MenuSection;
