import React, { useEffect } from 'react';
import Main from './Main';
import { connect, Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
