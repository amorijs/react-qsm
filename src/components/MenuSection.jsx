import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem.jsx';

class MenuSection extends Component {
  static propTypes = {
    name: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.object),
    activeIndex: PropTypes.number,
    menuSectionClassName: PropTypes.string,
    menuSectionLabelClassName: PropTypes.string,
    menuItemClassName: PropTypes.string
  };

  render() {
    const {
      items,
      activeIndex,
      label,
      handleItemClick,
      menuSectionClassName,
      menuSectionLabelClassName,
      menuItemClassName
    } = this.props;

    const menuItems = items.map((item, i) => (
      <MenuItem
        onClick={() => handleItemClick(item)}
        key={item.label}
        className={menuItemClassName + (i === activeIndex ? ' active' : '')}
        label={item.label}
      />
    ));

    return (
      <div className={menuSectionClassName}>
        <h2 className={menuSectionLabelClassName}>{label}</h2>
        <ul>{menuItems}</ul>
      </div>
    );
  }
}

export default MenuSection;
