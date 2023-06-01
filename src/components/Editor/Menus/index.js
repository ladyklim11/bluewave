
// Libraries
import React from 'react';

// Assets
import columnPoints from '../../../assets/menuIcons/columnPoints.svg';
import squarePoints from '../../../assets/menuIcons/squarePoints.svg';
import doubleLines from '../../../assets/menuIcons/doubleLines.svg';
import tripleLines from '../../../assets/menuIcons/tripleLines.svg';


const MENUS = [
  {
    id: 'tripleLines',
    icon: tripleLines
  },
  {
    id: 'columnPoints',
    icon: columnPoints
  },
  {
    id: 'squarePoints',
    icon: squarePoints
  },
  {
    id: 'doubleLines',
    icon: doubleLines
  },
];

export const getMenu = id => MENUS.find(menu => menu.id === id);

export const getMenus = () => MENUS;