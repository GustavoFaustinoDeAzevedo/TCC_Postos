import React, { useEffect } from 'react';
import Main from './Main';
import { connect, Provider } from 'react-redux';
import store from './store';
import ErrorBoundary from 'antd/lib/alert/ErrorBoundary';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      {localStorage.clear()}
      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
