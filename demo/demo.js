import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import QuickSelectMenu from '../src/containers/QuickSelectMenu.jsx';
import '../src/react-qsm.css';

const sections = [
  {
    label: 'recently opened',
    items: [{ label: 'demo.js' }, { label: 'index.html' }]
  },
  {
    prefix: '>',
    label: 'recently used',
    items: [{ label: 'Preferences: Open User Settings' }, { label: 'Sync: Upload Settings' }]
  },
  {
    prefix: '>',
    label: 'other commands',
    items: [{ label: 'Add Cursor Above' }, { label: 'Add Cursor Below' }]
  },
  {
    prefix: '?',
    label: 'help',
    items: [{ label: '... Go to file' }, { label: '# Go to symbol in workspace' }]
  }
];

const onMenuItemSelect = item => console.log(item);

ReactDOM.render(
  <QuickSelectMenu
    defaultValue=">"
    onMenuItemSelect={onMenuItemSelect}
    menuSections={sections}
    maxItemsToDisplay={4}
  />,
  document.getElementById('root')
);
