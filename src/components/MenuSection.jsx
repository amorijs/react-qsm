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
    const { items, activeIndex, label, handleItemClick } = this.props;

    const menuItems = items.map((item, i) => (
      <MenuItem
        onClick={() => handleItemClick(item)}
        key={item.label}
        className={i === activeIndex ? 'active' : null}
        label={item.label}
      />
    ));

    return (
      <div className="qsm-menu-section">
        <h2 className="qsm-menu-section-label">{label}</h2>
        <ul>{menuItems}</ul>
      </div>
    );
  }
}

export default MenuSection;
