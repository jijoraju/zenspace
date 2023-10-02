import React from "react";
import { Provider } from "react-redux";

import Root from './pages/Root'
import store from "@Reducer/index";
import service from '$LIB/service';

function App() {

  console.log('')
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export default App;
