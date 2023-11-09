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
ReactGA.initialize([
  {
    trackingId: "G-7DM34QP1HW",
    // gaOptions: {...}, // optional
    // gtagOptions: {...}, // optional
  },
  {
    trackingId: "G-7DM34QP1HW'",
  },
]);

window.GaTracePageHandler = (location,title) =>{
  console.log('location',location)
  ReactGA.send({ hitType: "pageview", page: location, title: title});
}

window.GaEvent = ({category,action,label}) =>{
  // 追踪自定義事件
  ReactGA.event({
    category: category,
    action: action,
    label: label,
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
