import React, {useEffect} from "react";
import { Provider} from "react-redux";

import Root from './pages/Root'
import store from "@Reducer/index";
import service from '$LIB/service';

function App() {

  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export default App;
