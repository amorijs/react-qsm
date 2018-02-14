import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import QuickSelectMenu from './containers/QuickSelectMenu.jsx';
import './react-qsm.scss';

const sections = [
  {
    label: 'ello govana',
    items: [{ label: 'Hello!' }, { label: '123' }]
  },
  {
    label: 'goodebye mayor',
    items: [{ label: 'an item in other section' }, { label: 'anotha 1' }]
  }
];

const onMenuItemSelect = item => alert(item.label);

ReactDOM.render(
  <QuickSelectMenu onMenuItemSelect={onMenuItemSelect} menuSections={sections} />,
  document.getElementById('root')
);
