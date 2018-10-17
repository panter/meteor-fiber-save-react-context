// see https://github.com/facebook/react/issues/13854

import { Meteor } from 'meteor/meteor';
import React from 'react';

const createReactContextOrginal = React.createContext;

React.createContext = defaultValue => {
  const context = createReactContextOrginal(defaultValue);

  const getCurrentFiberContextValues = () => {
    const Fibers = require('fibers');

    if (!Fibers.current) {
      throw new Error('no fiber');
    }
    if (!Fibers.current.__reactContextValues) {
      Fibers.current.__reactContextValues = new WeakMap();
    }
    return Fibers.current.__reactContextValues;
  };

  Object.defineProperty(context, '_currentValue', {
    get() {
      return getCurrentFiberContextValues().get(context);
    },
    set(value) {
      getCurrentFiberContextValues().set(context, value);
    },
  });

  return context;
};
