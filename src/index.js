import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import QuickSelectMenu from './containers/QuickSelectMenu.jsx';
import './react-qsm.scss';

const sections = [
  {
    label: 'recently used',
    items: [{ label: 'Preferences: Open User Settings' }, { label: 'Sync: Upload Settings' }]
  },
  {
    label: 'other commands',
    items: [{ label: 'Add Cursor Above' }, { label: 'Add Cursor Below' }]
  },
  {
    items: [{ label: 'Item in an unnamed section' }]
  }
];

const onMenuItemSelect = item => alert(item.label);

ReactDOM.render(
  <QuickSelectMenu onMenuItemSelect={onMenuItemSelect} menuSections={sections} />,
  document.getElementById('root')
);
