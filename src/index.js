import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import QuickSelectMenu from './containers/QuickSelectMenu.jsx';
import './react-qsm.scss';

const options = [{ value: 'Hello!' }, { value: '123' }];

const onMenuItemSelect = item => alert(item.value);

ReactDOM.render(
  <QuickSelectMenu onMenuItemSelect={onMenuItemSelect} menuItems={options} />,
  document.getElementById('root')
);
