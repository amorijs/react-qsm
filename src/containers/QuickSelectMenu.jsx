import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '../components/MenuItem';

const KEYS = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  ENTER: 'Enter'
};

class QuickSelectMenu extends Component {
  static propTypes = {
    menuItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMenuItemSelect: PropTypes.func.isRequired
  };

  state = {
    filteredItems: this.props.menuItems.slice(0),
    activeItemIndex: 0
  };

  setActiveItem = index => {
    const { filteredItems } = this.state;

    if (index >= filteredItems.length) {
      throw new Error(`Cannot set active item of index: ${index}. Index is too large`);
    }

    return new Promise(resolve => this.setState({ activeItemIndex: index }, resolve));
  };

  selectItem = async index => {
    if (index !== this.state.activeItemIndex) await this.setActiveItem(index).catch(console.error);
    const { filteredItems, activeItemIndex } = this.state;
    this.props.onMenuItemSelect(filteredItems[activeItemIndex]);
  };

  handleKeyDown = event => {
    event.preventDefault();
    event.stopPropagation();

    const { key } = event;
    const { UP, DOWN, LEFT, RIGHT, ENTER } = KEYS;

    if (key === UP) this.moveUp();
    if (key === DOWN) this.moveDown();
    if (key === ENTER) this.selectItem(this.state.activeItemIndex);
  };

  moveUp = () => {
    const { filteredItems, activeItemIndex } = this.state;
    const nextIndex = activeItemIndex === 0 ? filteredItems.length - 1 : activeItemIndex - 1;
    this.setActiveItem(nextIndex);
  };

  moveDown = () => {
    const { filteredItems, activeItemIndex } = this.state;
    const nextIndex = activeItemIndex === filteredItems.length - 1 ? 0 : activeItemIndex + 1;
    this.setActiveItem(nextIndex);
  };

  render() {
    const { filteredItems, activeItemIndex } = this.state;
    const { menuItems, onMenuItemSelect } = this.props;

    const items = filteredItems.map((item, i) => {
      const className = i === activeItemIndex ? 'active' : '';
      const { value } = item;

      return (
        <MenuItem key={value} className={className} value={value} onSelect={onMenuItemSelect} />
      );
    });

    return (
      <div onClick={this.click} className="react-qsm">
        <input onKeyDown={this.handleKeyDown} className="qsm-input" />
        <ul className="qsm-menu-item-list">{items}</ul>
      </div>
    );
  }
}

export default QuickSelectMenu;
