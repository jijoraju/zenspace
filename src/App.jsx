import React, {useEffect} from "react";
import { Provider} from "react-redux";

import Root from './pages/Root'
import store from "@Reducer/index";
import service from '$LIB/service';

// CSS
import '@Public/styles/main.scss'
import 'react-day-picker/dist/style.css';

// GA
import ReactGA from 'react-ga';
ReactGA.initialize('G-7DM34QP1HW');

window.GaTracePageHandler = (location) =>{
    ReactGA.set({ page: location }); // 設置當前頁面路徑
    ReactGA.pageview(location); // 追踪當前頁面
}

window.GaEvent = ({category,action}) =>{
  ReactGA.pageview(window.location.pathname + window.location.search);

  // 追踪自定義事件
  ReactGA.event({
    category: category,
    action: action,
  });
}

function App() {

  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export default App;
