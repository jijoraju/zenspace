import React, {useEffect} from "react";
import { Provider} from "react-redux";

import Root from './pages/Root'
import store from "@Reducer/index";
import service from '$LIB/service';

// CSS
import '@Public/styles/main.scss'
import 'react-day-picker/dist/style.css';

// GA
import ReactGA from "react-ga4";


function App() {

  ReactGA.initialize([
    {
      trackingId: GA_KEY,
    },
  ]);

  window.GaTracePageHandler = (location,title) =>{
    ReactGA.send({ hitType: "pageview", page: location, title: title});
  }

  window.GaEvent = (category,action,label) =>{
    // 追踪自定義事件
    ReactGA.event({
      category: category,
      action: action,
      label: label,
    });
  }

  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export default App;
