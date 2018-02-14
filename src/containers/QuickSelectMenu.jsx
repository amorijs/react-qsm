import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '../components/MenuItem.jsx';
import Fuse from 'fuse.js';
import MenuSection from '../components/MenuSection.jsx';

const KEYS = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  ENTER: 'Enter'
};

class QuickSelectMenu extends Component {
  static propTypes = {
    menuSections: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMenuItemSelect: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const { menuSections } = this.props;
    const filteredItemsList = this.getFilteredItemsList(menuSections);
    this.state = { filteredItemsList, filteredSections: menuSections, activeItemIndex: 0 };
  }

  getFilteredItemsList = sections =>
    sections.reduce((acc, { items }) => {
      acc.push(...items);
      return acc;
    }, []);

  handleInputChange = event => {
    const { value } = event.target;
    this.filterSections(value);
  };

  handleKeyDown = event => {
    const { key } = event;
    const { UP, DOWN, LEFT, RIGHT, ENTER } = KEYS;

    if (key === UP) this.moveUp();
    if (key === DOWN) this.moveDown();
    if (key === ENTER) this.selectItem(this.state.activeItemIndex);
  };

  setActiveItem = index => {
    const { filteredItemsList } = this.state;
    if (filteredItemsList.length === 0) return;

    if (index >= filteredItemsList.length) {
      throw new Error(`Cannot set active item of index: ${index}. Index is too large`);
    }

    return new Promise(resolve => this.setState({ activeItemIndex: index }, resolve));
  };

  selectItem = async index => {
    if (index !== this.state.activeItemIndex) await this.setActiveItem(index).catch(console.error);
    const { filteredItemsList, activeItemIndex } = this.state;
    this.props.onMenuItemSelect(filteredItemsList[activeItemIndex]);
  };

  removeFilters = () => {
    const { sections } = this.props;

    this.setState({
      filteredSections: sections,
      filteredItemsList: this.getFilteredItemsList(sections)
    });
  };

  filterSections = value => {
    if (typeof value !== 'string') {
      throw new TypeError('Argument value must be of type string.');
    }

    const { menuSections } = this.props;
    if (value.length === 0) return this.removeFilters();

    const options = {
      shouldSort: true,
      threshold: 0.4,
      keys: ['value']
    };

    const filteredSections = this.props.menuSections.reduce((acc, section) => {
      const fuse = new Fuse(section.items, options);
      return { ...section, items: fuse.search(value) };
    }, []);

    const filteredItemsList = this.getFilteredItemsList(filteredSections);
    this.setState({ filteredSections, filteredItemsList });
  };

  moveUp = () => {
    const { filteredItemsList, activeItemIndex } = this.state;
    const nextIndex = activeItemIndex === 0 ? filteredItemsList.length - 1 : activeItemIndex - 1;
    this.setActiveItem(nextIndex);
  };

  moveDown = () => {
    const { filteredItemsList, activeItemIndex } = this.state;
    const nextIndex = activeItemIndex === filteredItemsList.length - 1 ? 0 : activeItemIndex + 1;
    this.setActiveItem(nextIndex);
  };

  render() {
    // active === 1
    const { filteredSections, activeItemIndex } = this.state;
    const { onMenuItemSelect } = this.props;

    let itemsCounted = 0;
    let activeSectionIndex = 0;

    for (let i = 0; i < filteredSections.length; i += 1) {
      itemsCounted += filteredSections[i].items.length;
      if (itemsCounted > activeItemIndex) break;
      activeSectionIndex += 1;
    }

    const sections = filteredSections.map((section, i) => {
      const { label, items } = section;

      const activeIndex =
        activeSectionIndex === i ? activeItemIndex - (itemsCounted - items.length) : null;

      return (
        <MenuSection
          key={section.label}
          activeIndex={activeIndex}
          items={section.items}
          label={section.label}
        />
      );
    });

    return (
      <div onClick={this.click} className="react-qsm">
        <input
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          className="qsm-input"
        />
        <div className="qsm-menu-sections-wrapper">{sections}</div>
      </div>
    );
  }
}

export default QuickSelectMenu;
