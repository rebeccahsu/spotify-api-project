'use client';

import React from 'react';
import Header from '../Header';
import { Provider } from 'react-redux';
import { store } from '@/stores';

export default function Layout({ children }) {

  return (
    <Provider store={store}>
      <Header />
      {children}
    </Provider>
  );
}
