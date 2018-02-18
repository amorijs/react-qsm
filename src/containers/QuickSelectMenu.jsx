import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';

import MenuSection from '../components/MenuSection.jsx';
import MenuItem from '../components/MenuItem.jsx';

const KEYS = {
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  ENTER: 'Enter'
};

class QuickSelectMenu extends Component {
  static propTypes = {
    menuSections: PropTypes.arrayOf(PropTypes.object).isRequired,
    onMenuItemSelect: PropTypes.func.isRequired,
    defaultValue: PropTypes.string
  };

  static defaultProps = {
    defaultValue: ''
  };

  constructor(props) {
    super(props);
    const { menuSections } = this.props;

    const filteredItemsList = this.createFilteredItemsList(menuSections);
    const sectionsByPrefix = this.createSectionsByPrefix(menuSections);
    const filteredSections = sectionsByPrefix[''] ? sectionsByPrefix[''] : menuSections;

    this.state = {
      filteredSections,
      filteredItemsList,
      sectionsByPrefix,
      activeItemIndex: 0
    };
  }

  componentDidMount() {
    this.filterSections(this.props.defaultValue);
  }

  createFilteredItemsList = sections =>
    sections.reduce((acc, { items }) => {
      acc.push(...items);
      return acc;
    }, []);

  createSectionsByPrefix = sections =>
    sections.reduce((acc, section) => {
      const { prefix = '' } = section;
      if (acc[prefix]) acc[prefix].push(section);
      else acc[prefix] = [section];
      return acc;
    }, {});

  handleInputChange = event => {
    const { value } = event.target;
    this.filterSections(value);
  };

  handleKeyDown = event => {
    const { key } = event;
    const { UP, DOWN, ENTER } = KEYS;

    if (key !== UP && key !== DOWN && key !== ENTER) return;

    event.preventDefault();
    if (key === UP) this.moveUp(event);
    if (key === DOWN) this.moveDown(event);
    if (key === ENTER) this.selectItemByIndex(this.state.activeItemIndex);
  };

  getItemIndex = item => {
    const { filteredItemsList } = this.state;
    const indexOfItem = filteredItemsList.indexOf(item);

    if (indexOfItem === -1) {
      throw new Error('Cannot set active item. Item does not exist in state.filteredItemsList');
    }

    return indexOfItem;
  };

  setFilteredSections = sections => {
    if (!Array.isArray(sections)) {
      throw new TypeError(`Invalid argument 'sections'. Must be of type array`);
    }

    this.setState({
      filteredSections: sections,
      filteredItemsList: this.createFilteredItemsList(sections),
      activeItemIndex: 0
    });
  };

  setActiveItem = item => this.setActiveItemByIndex(this.getItemIndex(item));
  selectItem = item => this.selectItemByIndex(this.getItemIndex(item));

  setActiveItemByIndex = index => {
    const { filteredItemsList } = this.state;

    if (index >= filteredItemsList.length) {
      throw new Error(`Cannot set active item of index: ${index}. Index is too large`);
    }

    return new Promise(resolve => this.setState({ activeItemIndex: index }, resolve));
  };

  selectItemByIndex = async index => {
    const { filteredItemsList, activeItemIndex } = this.state;

    if (index >= filteredItemsList.length) {
      throw new Error(`Cannot set active item of index: ${index}. Index is too large`);
    }

    if (index !== activeItemIndex) {
      await this.setActiveItemByIndex(index).catch(console.error);
    }

    this.props.onMenuItemSelect(filteredItemsList[activeItemIndex]);
  };

  filterSections = value => {
    if (typeof value !== 'string') {
      throw new TypeError(`Invalid argument 'value'. Must be of type string.`);
    }

    const { menuSections } = this.props;
    const { sectionsByPrefix } = this.state;

    if (value === '') {
      const filteredSections = sectionsByPrefix[''] ? sectionsByPrefix[''] : menuSections;
      return this.setFilteredSections(filteredSections);
    }

    const prefix = Object.keys(sectionsByPrefix).find(
      prefix => prefix !== '' && prefix === value.slice(0, prefix.length)
    );

    const prefixFilteredMenuSections = prefix ? sectionsByPrefix[prefix] : sectionsByPrefix[''];

    const options = {
      shouldSort: true,
      threshold: 0.4,
      keys: ['label']
    };

    const filteredSections = prefixFilteredMenuSections.reduce((acc, section) => {
      const prefixTrimmedValue = prefix ? value.slice(prefix.length) : value;

      let items = section.items;

      if (prefixTrimmedValue.length > 0) {
        const fuse = new Fuse(section.items, options);
        items = fuse.search(prefixTrimmedValue);
      }

      acc.push({ ...section, items });
      return acc;
    }, []);

    this.setFilteredSections(filteredSections);
  };

  removeFilters = () => {
    const { menuSections } = this.props;

    this.setState({
      filteredSections: menuSections,
      filteredItemsList: this.createFilteredItemsList(menuSections)
    });
  };

  moveUp = () => {
    const { filteredItemsList, activeItemIndex } = this.state;
    const nextIndex = activeItemIndex === 0 ? filteredItemsList.length - 1 : activeItemIndex - 1;
    this.setActiveItemByIndex(nextIndex);
  };

  moveDown = () => {
    const { filteredItemsList, activeItemIndex } = this.state;
    const nextIndex = activeItemIndex === filteredItemsList.length - 1 ? 0 : activeItemIndex + 1;
    this.setActiveItemByIndex(nextIndex);
  };

  render() {
    const { filteredSections, activeItemIndex } = this.state;
    const { onMenuItemSelect, defaultValue } = this.props;

    let itemsCounted = 0;
    let activeSectionIndex = 0;

    for (let i = 0; i < filteredSections.length; i += 1) {
      itemsCounted += filteredSections[i].items.length;
      if (itemsCounted > activeItemIndex) break;
      activeSectionIndex += 1;
    }

    const sections = filteredSections.map((section, i) => {
      const { label, items } = section;
      if (items.length === 0) return;

      const activeIndex =
        activeSectionIndex === i ? activeItemIndex - (itemsCounted - items.length) : null;

      return (
        <MenuSection
          key={section.label || i}
          activeIndex={activeIndex}
          items={section.items}
          label={section.label}
          handleItemClick={this.selectItem}
        />
      );
    });

    return (
      <div className="react-qsm">
        <input
          defaultValue={defaultValue}
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
