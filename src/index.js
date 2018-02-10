import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import QuickSelectMenu from './containers/QuickSelectMenu.jsx';

const options = [{ value: 'Hello!' }, { value: '123' }];

ReactDOM.render(<QuickSelectMenu menuItems={options} />, document.getElementById('root'));
